
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

module.exports = createLogger({
  level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info',
  defaultMeta: { service: 'user-service' },
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.File({ level: 'debug', filename: '.provider.log' }),
    new transports.Console(),
  ],
});

