import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Query from '../models/Query';
import { querySchema } from '../schemas';

export const getQueries = asyncHandler(async (_req: Request, res: Response) => {
  const queries = await Query.find({}).sort({ createdAt: -1 });
  res.json(queries);
});

export const createQuery = asyncHandler(async (req: Request, res: Response) => {
  const queryData = querySchema.parse(req.body);
  const query = await Query.create(queryData);
  res.status(201).json(query);
});

export const updateQueryStatus = asyncHandler(async (req: Request, res: Response) => {
  const query = await Query.findByIdAndUpdate(
    req.params.id,
    { status: 'responded' },
    { new: true }
  );

  if (query) {
    res.json(query);
  } else {
    res.status(404).json({ message: 'Query not found' });
  }
});