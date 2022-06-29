import winston, { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import chalk from 'chalk';

export function awesomeLogger(
  labelName: string,
  levelGlobal: string = 'silly',
  isMsgColor: boolean = true,
  folderLog: string = 'logs/',
  nameFileLog: string = `my-app`,
  levelFile: string = 'silly',
  isEnableFileRejection: boolean = false,
  isEnableFileException: boolean = false,
  isFile: boolean = false,
  isDailyFileRotate: boolean = false,
) {
  const { combine, timestamp, label, printf } = format;
  const consoleFormat = printf(({ level, message, label, timestamp }) => {
    const levelUpper = level.toUpperCase();
    switch (levelUpper) {
      case 'INFO':
        message = isMsgColor === true ? chalk.hex('#00cf67')(message) : message;
        level = chalk.white.bgHex('#00cf67').bold(` ${level.toUpperCase()} `);
        break;

      case 'WARN':
        message = isMsgColor === true ? chalk.hex('#fcf803')(message) : message;
        level = chalk.black.bgHex('#fcf803').bold(` ${level.toUpperCase()} `);
        break;

      case 'ERROR':
        message = isMsgColor === true ? chalk.red(message) : message;
        level = chalk.white.bgRed.bold(` ${level.toUpperCase()} `);
        break;

      case 'HTTP':
        message = isMsgColor === true ? chalk.blue(message) : message;
        level = chalk.white.bgBlue.bold(` ${level.toUpperCase()} `);
        break;

      case 'VERBOSE':
        message = isMsgColor === true ? chalk.hex('0097cf')(message) : message;
        level = chalk.white.bgHex('#0097cf').bold(` ${level.toUpperCase()} `);
        break;

      case 'DEBUG':
        message = isMsgColor === true ? chalk.hex('#fc8403')(message) : message;
        level = chalk.white.bgHex('#fc8403').bold(` ${level.toUpperCase()} `);
        break;

      case 'SILLY':
        message = isMsgColor === true ? chalk.hex('#da21ff')(message) : message;
        level = chalk.white.bgHex('#da21ff').bold(` ${level.toUpperCase()} `);
        break;

      default:
        break;
    }
    return `${chalk.white.bgHex('#d1047f').bold(` ${label} `)}${chalk.white.bold.bgHex('#666666')(
      ` ${timestamp} `,
    )}${level}: ${message}`;
  });

  const fileFormat = printf(({ level, message, label, timestamp }) => {
    return `[${label}] [${timestamp}] [${level}]: ${message}`;
  });

  const transportsDefault: (
    | DailyRotateFile
    | winston.transports.ConsoleTransportInstance
    | winston.transports.FileTransportInstance
  )[] = [
    new winston.transports.Console({
      format: combine(label({ label: labelName }), timestamp(), format.splat(), consoleFormat),
    }),
  ];

  if (isFile) {
    transportsDefault.push(
      new winston.transports.File({
        level: levelFile,
        filename: `${folderLog}${nameFileLog}.log`,
        format: combine(label({ label: labelName }), timestamp(), format.splat(), fileFormat),
      }),
    );
  }

  if (isDailyFileRotate) {
    transportsDefault.push(
      new DailyRotateFile({
        level: levelFile,
        filename: `${folderLog}${nameFileLog}-%DATE%.log`,
        format: combine(label({ label: labelName }), timestamp(), format.splat(), fileFormat),
        zippedArchive: true,
        maxSize: '1m', // 1MB
        maxFiles: '14d', // 14 Hari akan di simpan
      }),
    );
  }

  if (isEnableFileException || isEnableFileRejection) {
    transportsDefault.push(
      new winston.transports.File({
        level: levelFile,
        handleExceptions: isEnableFileException,
        handleRejections: isEnableFileRejection,
        filename: `${folderLog}${nameFileLog}-exception.log`,
      }),
    );
  }

  return winston.createLogger({
    level: levelGlobal,
    transports: transportsDefault,
  });
}
