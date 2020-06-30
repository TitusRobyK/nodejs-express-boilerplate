const fs = require('fs');
var path = require('path')
var PROJECT_ROOT = path.join(__dirname, '..')
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
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    trace: 6
  },
  format: format.combine(
    format.prettyPrint(),
    format.timestamp({
      format: 'DD-MM-YYYY hh:mm:ss A'
    }),
    format.printf(nfo => {
      if (nfo.stack){
        return `${nfo.timestamp} - ${nfo.level}: ${nfo.message} - ${nfo.stack}`
      }
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

logger.stream = {
  write: function (message) {
    logger.info(message)
  }
}

// A custom logger interface that wraps winston, making it easy to instrument
// code and still possible to replace winston in the future.

module.exports.debug = module.exports.log = function () {
  logger.debug.apply(logger, formatLogArguments(arguments))
}

module.exports.info = function () {
  logger.info.apply(logger, formatLogArguments(arguments))
}

module.exports.warn = function () {
  logger.warn.apply(logger, formatLogArguments(arguments))
}

module.exports.error = function () {
  logger.error.apply(logger, formatLogArguments(arguments))
}

module.exports.stream = logger.stream

/**
 * Attempts to add file and line number info to the given log arguments.
 */
function formatLogArguments (args) {
  args = Array.prototype.slice.call(args)

  var stackInfo = getStackInfo(1)

  if (stackInfo) {
    var calleeStr = '(' + stackInfo.relativePath + ':' + stackInfo.line + ')'

    if (typeof (args[0]) === 'string') {
      args[0] = calleeStr + ' ' + args[0]
    } else {
      args.unshift(calleeStr)
    }
  }

  return args
}

function getStackInfo (stackIndex) {
  var stacklist = (new Error()).stack.split('\n').slice(3)
  var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi
  var stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi

  var s = stacklist[stackIndex] || stacklist[0]
  var sp = stackReg.exec(s) || stackReg2.exec(s)

  if (sp && sp.length === 5) {
    return {
      method: sp[1],
      relativePath: path.relative(PROJECT_ROOT, sp[2]),
      line: sp[3],
      pos: sp[4],
      file: path.basename(sp[2]),
      stack: stacklist.join('\n')
    }
  }
}