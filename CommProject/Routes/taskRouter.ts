import { Router } from 'express';
import { taskControl, updateTask } from '../Controllers/taskController';
import { deleteTask } from '../Controllers/taskController';

const taskRouter = Router();

taskRouter.post('/', taskControl)
taskRouter.delete('/:id', deleteTask)
taskRouter.patch('/:id', updateTask)

export { taskRouter }
