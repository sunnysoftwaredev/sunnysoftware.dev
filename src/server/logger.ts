import { LogLevel, setLogLevel } from 'eleventh';

setLogLevel(LogLevel.debug);

export { setLogLevel as default, LogLevel };
