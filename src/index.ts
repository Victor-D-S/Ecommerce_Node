import express, {Express, Request, Response} from 'express';
import { PORT } from './secrets';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';

const app:Express = express();

// app.get('/', (req:Request, res:Response) => {
//   res.send('Hello World');
// });

app.use(express.json());

app.use('/api', rootRouter);

export const prismaClient = new PrismaClient();

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});