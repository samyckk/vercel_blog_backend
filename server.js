import express from 'express';
import Connection from './databse/db.js';
import Router from './routes/route.js';

import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('products api running new deploy');
});




const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{console.log(`server listening on port ${PORT}`)});

Connection();
