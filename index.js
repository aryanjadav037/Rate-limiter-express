import express from 'express';
import rateLimitPlugin from './middleware/rateLimiterAuth.js';
import rateLimitwithoutPlugin from './middleware/withoutPluginAuth.js';

const app = express();
const PORT = 3000;

app.get('/home',rateLimitPlugin,(req,res) => {
    res.send('welcome to home');
});

app.get('/profile',rateLimitwithoutPlugin,(req,res) => {
    res.send('welcome to profile');
});

app.listen(PORT,() =>{
    console.log(`Server listening on PORT :${PORT}`)
});
