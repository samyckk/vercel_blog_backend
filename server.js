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
app.use('/', Router);

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}


// app.get('/', (req, res) => {
//     res.send('products api running new deploy');
// });

const PORT = 8000;

app.listen(PORT, ()=>{console.log(`server listening on port ${PORT}`)});

Connection();
