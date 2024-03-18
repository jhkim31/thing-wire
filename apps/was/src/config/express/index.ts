import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import staticPath from 'shared/lib/staticPath';

const app = express();

app.use(express.static(staticPath("./public")));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

export default app;