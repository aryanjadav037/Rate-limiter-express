const WINDOW_SIZE_IN_SECONDS = 60;  // 1-minute window
const MAX_REQUESTS = 5;  // Max requests per window

const requestCounter = {}; // Stores request counts per IP

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
        // Reset count after window expires
        requestCounter[ip] = { count: 1, startTime: currentTime };
    }

    console.log(requestCounter);
    next();
}

// ✅ Cleanup function to remove inactive IPs and prevent memory leaks
setInterval(() => {
    const now = Date.now();
    for (const ip in requestCounter) {
        if (now - requestCounter[ip].startTime > WINDOW_SIZE_IN_SECONDS * 1000) {
            delete requestCounter[ip];
        }
    }
}, WINDOW_SIZE_IN_SECONDS * 1000); // Runs every window size interval

export default rateLimitWithoutPlugin;
