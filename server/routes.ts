import { Application } from 'express';
import appRouter from './api/controllers/app/router';
import l from './common/logger';

export default function routes(app: Application): void {
  app.use('/api/v1', appRouter);
};