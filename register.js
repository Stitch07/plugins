"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerPlugin = void 0;
const framework_1 = require("@sapphire/framework");
const Logger_1 = require("./lib/Logger");
/**
 * @since 1.0.0
 */
class LoggerPlugin extends framework_1.Plugin {
    /**
     * @since 1.0.0
     */
    static [framework_1.preGenericsInitialization](options) {
        var _a;
        (_a = options.logger) !== null && _a !== void 0 ? _a : (options.logger = {});
        options.logger.instance = new Logger_1.Logger(options.logger);
    }
}
exports.LoggerPlugin = LoggerPlugin;
framework_1.SapphireClient.plugins.registerPreGenericsInitializationHook(LoggerPlugin[framework_1.preGenericsInitialization], 'Logger-PreGenericsInitialization');
//# sourceMappingURL=register.js.map