const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_REQUESTS = 5;  

const requestCounter = {}; 

function rateLimitWithoutPlugin(req, res, next) {
    const ip = req.ip;
    const currentTime = Date.now();

    if (!requestCounter[ip]) {
        requestCounter[ip] = { count: 1, startTime: currentTime };
        console.log(requestCounter);
        return next();
    }

    const elapsedTime = currentTime - requestCounter[ip].startTime;

    if (elapsedTime < WINDOW_SIZE_IN_SECONDS * 1000) {
        if (requestCounter[ip].count >= MAX_REQUESTS) {
            return res.status(429).json({ error: "Too many requests, please try again later." });
        }
        requestCounter[ip].count++;
    } else {
        
        requestCounter[ip] = { count: 1, startTime: currentTime };
    }

    console.log(requestCounter);
    next();
}

setInterval(() => {
    const now = Date.now();
    for (const ip in requestCounter) {
        if (now - requestCounter[ip].startTime > WINDOW_SIZE_IN_SECONDS * 1000) {
            delete requestCounter[ip];
        }
    }
}, WINDOW_SIZE_IN_SECONDS * 1000);

export default rateLimitWithoutPlugin;
