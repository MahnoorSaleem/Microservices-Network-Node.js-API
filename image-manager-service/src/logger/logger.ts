import pino from "pino";

export const logger = pino({
    level: process.env.NODE_ENV === 'production' ? "info": "debug",
    timestamp: ()=>`,"timestamp":${new Date(Date.now()).toISOString()}"`,
    formatters: {
        bindings: (bindings) => {
            return {
                pid: bindings.pid,
                host:bindings.hostname
            }
        },
        level: (label) => {
            return {
                level: label.toUpperCase();
            }
        }
    }
})