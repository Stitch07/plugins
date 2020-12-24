import { LoggerStyle, LoggerStyleResolvable } from './LoggerStyle';
import { LoggerTimestamp, LoggerTimestampOptions } from './LoggerTimestamp';
/**
 * Logger utility that stores and applies a full style into the message.
 * @since 1.0.0
 */
export declare class LoggerLevel {
    /**
     * The timestamp formatter.
     * @since 1.0.0
     */
    timestamp: LoggerTimestamp | null;
    /**
     * The infix, added between the timestamp and the message.
     * @since 1.0.0
     */
    infix: string;
    /**
     * The style formatter for the message.
     * @since 1.0.0
     */
    message: LoggerStyle | null;
    constructor(options?: LoggerLevelOptions);
    run(content: string): string;
}
/**
 * The options for [[LoggerLevel]].
 * @since 1.0.0
 */
export interface LoggerLevelOptions {
    /**
     * The timestamp options. Set to `null` to disable timestamp parsing.
     * @since 1.0.0
     * @default {}
     */
    timestamp?: LoggerTimestampOptions | null;
    /**
     * The infix to be included between the timestamp and the message.
     * @since 1.0.0
     * @default ''
     */
    infix?: string;
    /**
     * The style options for the message.
     * @since 1.0.0
     * @default colorette.clear
     */
    message?: LoggerStyleResolvable | null;
}
//# sourceMappingURL=LoggerLevel.d.ts.map