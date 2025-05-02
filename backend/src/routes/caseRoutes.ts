import { Router, Request, Response } from 'express';
import Case from '../models/caseModel';
import { ICase, ITask } from '../interfaces/case.interface';
import mongoose from 'mongoose';

const router = Router();

// Typed body for creating a case
interface CreateCaseRequest extends Request {
  body: Pick<ICase, 'name' | 'email' | 'phone' | 'gender' | 'dob' | 'streetAddress'>;
}

// POST: Create a new case
router.post('/createCase', async (req: CreateCaseRequest, res: Response) => {
  try {
    const { name, email, phone, gender, dob, streetAddress } = req.body;
    const newCase = await Case.create({ name, email, phone, gender, dob, streetAddress });

    res.status(201).json({
      message: "Case created successfully",
      case: {
        _id: newCase._id,
        name: newCase.name,
        email: newCase.email,
        phone: newCase.phone,
      },
    });
  } catch (error) {
    console.error("Error creating case:", error);
    res.status(500).json({ message: "Could not create the case" });
  }
});

// GET: Retrieve all cases
router.get('/getCase', async (req: Request, res: Response) => {
  try {
    const cases = await Case.find();
    res.status(200).json({ cases });
  } catch (error) {
    console.error("Error fetching cases:", error);
    res.status(500).json({ message: "Could not fetch the cases" });
  }
});

router.patch('/updateCase/:caseId', async (req: Request, res: Response) => {
  try {
    const { caseId } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(caseId)) {
      res.status(400).json({ message: "Invalid case ID format" });
      return;
    }

    const updatedCase = await Case.findByIdAndUpdate(caseId, updateData, { new: true });

    if (!updatedCase) {
      res.status(404).json({ message: "Case not found" });
      return;
    }

    res.status(200).json({
      message: "Case updated successfully",
      case: updatedCase,
    });
  } catch (error) {
    console.error("Error updating case:", error);
    res.status(500).json({ message: "Could not update the case" });
  }
});

router.delete('/deleteCase/:caseId', async (req: Request, res: Response) => {
  try {
    const { caseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(caseId)) {
      res.status(400).json({ message: "Invalid case ID format" });
      return;
    }

    const deletedCase = await Case.findByIdAndDelete(caseId);

    if (!deletedCase) {
      res.status(404).json({ message: "Case not found" });
      return;
    }

    res.status(200).json({ message: "Case deleted successfully" });
  } catch (error) {
    console.error("Error deleting case:", error);
    res.status(500).json({ message: "Could not delete the case" });
  }
});


// Typed body for creating a task
interface CreateTaskRequest extends Request {
  params: { caseId: string };
  body: {
    taskTitle: string;
    status?: "pending" | "in-progress" | "completed";
    description?: string;
    docs?: string[];
  }
}

// POST: Create a new task for a specific case
router.post('/createTask/:caseId', async (req: Request, res: Response) => {
  try {
    const { caseId } = req.params;

    // Validate the ObjectId format
    if (!mongoose.Types.ObjectId.isValid(caseId)) {
      res.status(400).json({ message: "Invalid case ID format" });
      return;
    }
    const { taskTitle, status = "in-progress", description = '', docs=[] } = req.body;
    
    // Ensure that at least one of description or docs is provided
    if (!description && !docs) {
      res.status(400).json({ message: "Either description or docs must be provided" });
      return;
    }
    
    const foundCase = await Case.findById(caseId);
    
    if (!foundCase) {
      res.status(404).json({ message: "Case not found" });
      return;
    }
    
    // Create task object with optional fields
    const newTask = { taskTitle, status, description, docs };
    
    foundCase.tasks.push(newTask);
    console.log('1')
    await foundCase.save();
    
    res.status(201).json({ message: "Task added successfully"});
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Could not create task" });
  }
});

// GET: Retrieve all tasks for a case
router.get('/getTasks/:caseId', async (req: Request<{ caseId: string }>, res: Response) => {
  try {
    const { caseId } = req.params;
    const foundCase = await Case.findById(caseId);

    if (!foundCase) {
      res.status(404).json({ message: "Case not found" });
      return;
    }

    res.status(200).json({ tasks: foundCase.tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Could not fetch tasks" });
  }
});

router.patch('/updateTasks/:caseId/:taskId', async (req: Request, res: Response) => {
  try {
    const { caseId, taskId } = req.params;
    const { taskTitle, status, description, docs } = req.body;

    // Validate the caseId and taskId format
    if (!mongoose.Types.ObjectId.isValid(caseId) || !mongoose.Types.ObjectId.isValid(taskId)) {
      res.status(400).json({ message: "Invalid case ID or task ID format" });
      return;
    }

    // Fetch the case document
    const foundCase = await Case.findById(caseId);

    if (!foundCase) {
      res.status(404).json({ message: "Case not found" });
      return;
    }

    // Find the task by taskId within the tasks array
    const taskIndex = foundCase.tasks.findIndex(task => task._id!.toString() === taskId);
    console.log(taskIndex)
    if (taskIndex === -1) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    // Update task properties
    const taskToUpdate = foundCase.tasks[taskIndex];

    if (taskTitle) taskToUpdate.taskTitle = taskTitle;
    if (status) taskToUpdate.status = status;
    if (description !== undefined) taskToUpdate.description = description; // Allow `undefined` to remove
    if (docs !== undefined) {
      if (!taskToUpdate.docs) {
        taskToUpdate.docs = [...docs];
      } else {
        taskToUpdate.docs.push(...docs);
      }
    } 

    // Save the updated case document
    await foundCase.save();

    res.status(200).json({ message: "Task updated successfully", task: taskToUpdate });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Could not update task" });
  }
});

router.delete('/deleteTask/:caseId/:taskId', async (req: Request, res: Response) => {
  try {
    const { caseId, taskId } = req.params;

    // Validate the ObjectId format for caseId and taskId
    if (!mongoose.Types.ObjectId.isValid(caseId) || !mongoose.Types.ObjectId.isValid(taskId)) {
      res.status(400).json({ message: "Invalid case ID or task ID format" });
      return;
    }

    // Find the case by caseId
    const foundCase = await Case.findById(caseId);

    if (!foundCase) {
      res.status(404).json({ message: "Case not found" });
      return;
    }

    // Find the task by taskId within the case's tasks array
    const taskIndex = foundCase.tasks.findIndex(task => task._id!.toString() === taskId);

    if (taskIndex === -1) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    // Remove the task from the tasks array
    foundCase.tasks.splice(taskIndex, 1);
    
    // Save the updated case
    await foundCase.save();

    res.status(200).json({ message: "Task deleted successfully", tasks: foundCase.tasks });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Could not delete task" });
  }
});


export default router;
