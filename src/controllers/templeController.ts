import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Temple from '../models/Temple';
import { templeSchema } from '../schemas';

export const getTemples = asyncHandler(async (_req: Request, res: Response) => {
  const temples = await Temple.find({});
  res.json(temples);
});

export const getTempleById = asyncHandler(async (req: Request, res: Response) => {
  const temple = await Temple.findById(req.params.id);
  if (temple) {
    res.json(temple);
  } else {
    res.status(404).json({ message: 'Temple not found' });
  }
});

export const createTemple = asyncHandler(async (req: Request, res: Response) => {
  const templeData = templeSchema.parse(req.body);
  const temple = await Temple.create(templeData);
  res.status(201).json(temple);
});

export const updateTemple = asyncHandler(async (req: Request, res: Response) => {
  const templeData = templeSchema.parse(req.body);
  const temple = await Temple.findByIdAndUpdate(req.params.id, templeData, {
    new: true,
    runValidators: true
  });

  if (temple) {
    res.json(temple);
  } else {
    res.status(404).json({ message: 'Temple not found' });
  }
});

export const deleteTemple = asyncHandler(async (req: Request, res: Response) => {
  const temple = await Temple.findByIdAndDelete(req.params.id);
  if (temple) {
    res.json({ message: 'Temple removed' });
  } else {
    res.status(404).json({ message: 'Temple not found' });
  }
});