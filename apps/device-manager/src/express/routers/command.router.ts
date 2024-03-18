import { Router } from 'express';
import CommandController from '@controllers/command';

const CommandRouter = Router({mergeParams: true});

CommandRouter.get('/', CommandController.getCommands);
CommandRouter.post('/', CommandController.postCommands);
CommandRouter.post('/results', CommandController.postCommandResults);
CommandRouter.get('/:result_id', CommandController.getCommandResults);

export default CommandRouter;
