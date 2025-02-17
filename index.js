const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3000;

const limiter = rateLimit({
    windowMs:1*60*1000,
    max : 5,
    handler : (req,res) =>{
        res.status(429).json({error:'too many requests ,please try again later'});
        }
});

app.use(limiter);

app.get('/',(req,res) => {
    res.send('welcome home');
});

app.listen(PORT,() =>{
    console.log(`Server listening on PORT :${PORT}`)
});
