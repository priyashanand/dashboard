import {Router, Request, Response} from 'express'
import Provider from '../models/providerModel'
import {ILocation, IProvider} from '../interfaces/provider.interface'
import mongoose from 'mongoose'

const router = Router();

// create provider
router.post('/provider', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, speciality, address } = req.body;

    const newProvider = await Provider.create({ name, email, phone, speciality, address });

    res.status(201).json({ message: "Provider created successfully", provider: newProvider });
  } catch (error) {
    console.error("Error creating provider:", error);
    res.status(500).json({ message: "Could not create provider" });
  }
});


// update provider 
router.patch("/provider/:providerId", async (req: Request, res: Response) => {
  try {
    const { providerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(providerId)) {
      res.status(400).json({ message: "Invalid provider ID" });
      return;
    }

    const updates = req.body;

    const updatedProvider = await Provider.findByIdAndUpdate(
      providerId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedProvider) {
      res.status(404).json({ message: "Provider not found" });
      return;
    }

    res.status(200).json({ message: "Provider updated", provider: updatedProvider });
  } catch (error) {
    console.error("Error updating provider:", error);
    res.status(500).json({ message: "Could not update provider" });
  }
});

// get provider
router.get('/provider/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const provider = await Provider.findById(id);

    if (!provider) {
      res.status(404).json({ message: "Provider not found" });
      return;
    }

    res.status(200).json({ provider });
  } catch (error) {
    console.error("Error fetching provider:", error);
    res.status(500).json({ message: "Could not fetch provider" });
  }
});

router.get('/provider', async (_req: Request, res: Response) => {
  try {
    const providers = await Provider.find();
    res.status(200).json({ providers });
  } catch (error) {
    console.error("Error fetching providers:", error);
    res.status(500).json({ message: "Could not fetch providers" });
  }
});


// delete provider
router.delete('/provider/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedProvider = await Provider.findByIdAndDelete(id);

    if (!deletedProvider){ 
      res.status(404).json({ message: "Provider not found" });
      return;
    }

    res.status(200).json({ message: "Provider deleted successfully" });
  } catch (error) {
    console.error("Error deleting provider:", error);
    res.status(500).json({ message: "Could not delete provider" });
  }
});

export default router;
