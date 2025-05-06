// routes/lienAssignment.ts

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import LienAssignment from '../models/lienAssignmentModel';

const router = express.Router();

router.post('/:caseId/:providerId', async (req: Request, res: Response) => {
    const { caseId, providerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(caseId) || !mongoose.Types.ObjectId.isValid(providerId)) {
        res.status(400).json({ error: 'Invalid caseId or providerId' });
        return;
    }

    try {
        const newLienAssignment = new LienAssignment({
            caseId: new mongoose.Types.ObjectId(caseId),
            providerIds: [new mongoose.Types.ObjectId(providerId)],
        });

        await newLienAssignment.save();

        res.status(201).json({
            message: 'Lien assignment created successfully',
            data: newLienAssignment,
        });
    } catch (error) {
        console.error('Error creating lien assignment:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid LienAssignment ID' });
      return;
  }

  try {
      const updated = await LienAssignment.findByIdAndUpdate(
          id,
          { $set: req.body }, // Only updates fields provided
          { new: true, runValidators: true }
      );

      if (!updated) {
          res.status(404).json({ error: 'LienAssignment not found' });
          return;
      }

      res.json({ message: 'LienAssignment updated successfully', data: updated });
  } catch (error) {
      console.error('Error updating lien assignment:', error);
      res.status(500).json({ error: 'Server error' });
  }
});

export default router;
