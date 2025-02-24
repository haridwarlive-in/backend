import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Temple from '../models/Temple';
import { templeSchema } from '../schemas';

export const getTemples = asyncHandler(async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || null;
  if(limit){
    const temples = await Temple.find({}).limit(limit);
    res.json(temples);
  } else {
    const temples = await Temple.find({});
    res.json(temples);
  }
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
  const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${templeData.key}`

  const temple = await Temple.create({...templeData, image: url});
  res.status(201).json(temple);
});

export const updateTemple = asyncHandler(async (req: Request, res: Response) => {
  const templeData = templeSchema.parse(req.body);
  const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${templeData.key}`

  const temple = await Temple.findByIdAndUpdate(req.params.id, {...templeData, image: url}, {
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