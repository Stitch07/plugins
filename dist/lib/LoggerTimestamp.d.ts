import { Timestamp } from '@sapphire/time-utilities';
import { LoggerStyle, LoggerStyleResolvable } from './LoggerStyle';
/**
 * Logger utility that formats a timestamp.
 * @since 1.0.0
 */
export declare class LoggerTimestamp {
    /**
     * The timestamp used to format the current date.
     * @since 1.0.0
     */
    timestamp: Timestamp;
    /**
     * Whether or not the logger will show a timestamp in UTC.
     * @since 1.0.0
     */
    utc: boolean;
    /**
     * The logger style to apply the color to the timestamp.
     * @since 1.0.0
     */
    color: LoggerStyle | null;
    /**
     * The final formatter.
     * @since 1.0.0
     */
    formatter: LoggerTimestampFormatter;
    constructor(options?: LoggerTimestampOptions);
    /**
     * Formats the current time.
     * @since 1.0.0
     */
    run(): string;
}
/**
 * The options for [[LoggerTimestamp]].
 * @since 1.0.0
 */
export interface LoggerTimestampOptions {
    /**
     * The [[Timestamp]] pattern.
     * @since 1.0.0
     * @default 'YYYY-MM-DD HH:mm:ss'
     * @example
     * ```typescript
     * 'YYYY-MM-DD HH:mm:ss'
     * // 2020-12-23 22:01:10
     * ```
     */
    pattern?: string;
    /**
     * Whether or not the date should be UTC.
     * @since 1.0.0
     * @default false
     */
    utc?: boolean;
    /**
     * The color to use.
     * @since 1.0.0
     * @default colorette.reset
     */
    color?: LoggerStyleResolvable | null;
    /**
     * The formatter. See [[LoggerTimestampFormatter]] for more information.
     * @since 1.0.0
     * @default (value) => `${value} - `
     */
    formatter?: LoggerTimestampFormatter;
}
/**
 * The formatter used for [[LoggerTimestampOptions]]. This will be run **after** applying the color to the formatter.
 * @since 1.0.0
 */
export interface LoggerTimestampFormatter {
    /**
     * @param timestamp The output of [[LoggerStyle.run]] on [[Timestamp.display]]/[[Timestamp.displayUTC]].
     * @since 1.0.0
     */
    (timestamp: string): string;
}
//# sourceMappingURL=LoggerTimestamp.d.ts.map