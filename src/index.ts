import express, {Express, Request, Response} from 'express';
import { PORT } from './secrets';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/errors';
import { SignUpSchema } from './schema/users';

const app:Express = express();

// app.get('/', (req:Request, res:Response) => {
//   res.send('Hello World');
// });

app.use(express.json());

app.use('/api', rootRouter);

export const prismaClient = new PrismaClient();

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});