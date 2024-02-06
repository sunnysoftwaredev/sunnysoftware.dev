import logger from 'eleventh';

// Assuming LogLevel.debug is a constant and not a TypeScript enum after compilation,
// we can import the specific value directly for potential tree-shaking benefits.
const LogLevelDebug = "debug";

logger.setLogLevel(LogLevelDebug);

export default logger;
