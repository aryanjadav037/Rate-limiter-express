import rateLimit from 'express-rate-limit';
const rateLimitPlugin = rateLimit({
    windowMs:1*60*1000,
    max : 5,
    headers: true,
    handler : (req,res) =>{
        res.status(429).json({error:'too many requests ,please try again later'});
        }
});

export default rateLimitPlugin;