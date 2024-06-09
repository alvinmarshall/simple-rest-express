import path from 'path';
import {fileURLToPath} from 'url';
import express, {json, urlencoded} from 'express';
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import userRouter from "./user/user-router.js";
import exceptionMiddleware from './error/exception-middleware.js'

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const app = express();
app.use(json())
app.use(logger('dev'));
app.use(cookieParser());
app.use(urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRouter)
app.use(exceptionMiddleware)

export default app;