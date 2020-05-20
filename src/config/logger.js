const fs = require('fs');
const {
  createLogger,
  transports,
  format
} = require('winston');

const env = process.env.NODE_ENV;
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const now = new Date();
const logLevel = 'info'

var logger = createLogger({
  level: logLevel,
  levels: {
    fatal: 0,
    crit: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5
  },
  format: format.combine(
    format.prettyPrint(),
    format.timestamp({
      format: 'DD-MM-YYYY hh:mm:ss A'
    }),
    format.printf(nfo => {
      return `${nfo.timestamp} - ${nfo.level}: ${nfo.message}`
    })
  ),
  transports: [
    new transports.Console(),
    new (require('winston-daily-rotate-file'))({
      filename: `${logDir}/app.log`,
    })
  ],
  exitOnError: false
})

// Extend logger object to properly log 'Error' types
var origLog = logger.log

logger.log = function (level, msg) {
  if (msg instanceof Error) {
    var args = Array.prototype.slice.call(arguments)
    args[1] = msg.stack
    origLog.apply(logger, args)
  } else {
    origLog.apply(logger, arguments)
  }
}

module.exports = logger;

module.exports.stream = {
  write: function (message) {
    logger.info(message);
    console.log('message = ', message);
  },
};