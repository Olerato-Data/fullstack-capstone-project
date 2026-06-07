/* written by Brian McCarthy */
import pino from 'pino';

const logger = pino({
    level: 'info',
    base: { pid: false },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
});

export default logger;
