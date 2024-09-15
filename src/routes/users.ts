import { Router } from 'express';
import { userController } from '../controllers/usersController';

export const userRouter = Router();

userRouter.get('/', async (req, res) => {
  const result = await userController.getAllUsers();
  res.json(result);
});

userRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const result = await userController.createUser(name, email, password);
  res.json(result);
});

userRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await userController.getUserById(parseInt(id));
  if (!result) {
    res.status(404).json({ message: 'Usuário não encontrado' });
  } else {
    res.json(result);
  }
});

userRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const result = await userController.updateUser(parseInt(id), name, email);
  if (!result) {
    res.status(404).json({ message: 'Usuário não encontrado' });
  } else {
    res.json(result);
  }
});

userRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await userController.deleteUser(parseInt(id));
  if (!result) {
    res.status(404).json({ message: 'Usuário não encontrado' });
  } else {
    res.json({ message: 'Usuário deletado com sucesso' });
  }
});