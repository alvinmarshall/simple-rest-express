import express from 'express';
import {UserDao} from './user-dao.js'
import {UserService} from './user-service.js'

const router = express.Router();

const userDao = new UserDao();
const userService = new UserService(userDao);

router.get('/users', (req, res, next) => {
    var users = userService.users();
    res.send(users);
});

router.get('/users/:id', (req, res, next) => {
    var user = userService.user(req.params.id);
    res.status(200).send(user);
});

router.post('/users', (req, res, next) => {
    const id = userService.create(req.body);
    res.status(201).json({user: id});
});

export default router;

