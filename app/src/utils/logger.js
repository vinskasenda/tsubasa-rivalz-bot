import { createLogger, format, transports } from 'winston';
import a5_0x4c70f2 from 'fs';
const {
  combine,
  timestamp,
  printf,
  colorize
} = format;
const customFormat = printf(({
  level: _0x214f50,
  message: _0x2a2710,
  timestamp: _0x3d1496
}) => {
  return _0x3d1496 + " [" + _0x214f50 + "]: " + _0x2a2710;
});
class Logger {
  constructor() {
    this.logger = createLogger({
      'level': "debug",
      'format': combine(timestamp({
        'format': "YYYY-MM-DD HH:mm:ss"
      }), colorize(), customFormat),
      'transports': [new transports.File({
        'filename': "log/app.log"
      })],
      'exceptionHandlers': [new transports.File({
        'filename': "log/app.log"
      })],
      'rejectionHandlers': [new transports.File({
        'filename': "log/app.log"
      })]
    });
  }
  ['info'](_0x3e345e) {
    this.logger.info(_0x3e345e);
  }
  ['warn'](_0x20d426) {
    this.logger.warn(_0x20d426);
  }
  ["error"](_0x15805c) {
    this.logger.error(_0x15805c);
  }
  ["debug"](_0x170655) {
    this.logger.debug(_0x170655);
  }
  ['setLevel'](_0x565dde) {
    this.logger.level = _0x565dde;
  }
  ['clear']() {
    a5_0x4c70f2.truncate("log/app.log", 0x0, _0x2bc5e9 => {
      if (_0x2bc5e9) {
        this.logger.error("Failed to clear the log file: " + _0x2bc5e9.message);
      } else {
        this.logger.info("Log file cleared");
      }
    });
  }
}
export default new Logger();