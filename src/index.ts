import express from 'express';
import { config } from 'dotenv';
config();
import { todoRouter, userRouter, usersAuthRouter } from './routes';
const app = express();
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/auth', usersAuthRouter);
app.use('/api/todo', todoRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});