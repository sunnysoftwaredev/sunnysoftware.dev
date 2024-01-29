import logger, { Logger, LogLevel } from 'eleventh';

logger.setLogLevel(LogLevel.debug);

const typedLogger: Logger = logger;

export default typedLogger;
