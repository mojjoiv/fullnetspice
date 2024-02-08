import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';
import mongoose from "mongoose";


mongoose.connect('mongodb+srv://daltonongeche:lingo98@cluster1.cvii2uq.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000 // Increase the timeout to 30 seconds
});

const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack


const port = 4001;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});


/** api routes */
app.use('/api', router)

/** start server only when we have valid connection */
app.listen(port, ()=> {
    console.log(`Server is running on ${port}`);
})


