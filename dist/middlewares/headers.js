"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginMiddleware = void 0;
const http_1 = require("http");
const Middleware_1 = require("../lib/structures/Middleware");
class PluginMiddleware extends Middleware_1.Middleware {
    constructor(context) {
        var _a;
        super(context, { position: 10 });
        Object.defineProperty(this, "origin", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "methods", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: http_1.METHODS.join(', ')
        });
        this.origin = (_a = this.context.server.options.origin) !== null && _a !== void 0 ? _a : '*';
    }
    run(request, response, route) {
        response.setHeader('Date', new Date().toUTCString());
        response.setHeader('Access-Control-Allow-Credentials', 'true');
        response.setHeader('Access-Control-Allow-Origin', this.origin);
        response.setHeader('Access-Control-Allow-Headers', 'Authorization, User-Agent, Content-Type');
        response.setHeader('Access-Control-Allow-Methods', this.methods);
        // RFC 7231 4.3.7.
        // > This method allows a client to determine the options and/or requirements associated with a
        // > resource, or the capabilities of a server, without implying a resource action.
        //
        // Due to this method's nature, it is recommended to end the request after setting pre-flight CORS headers.
        if (request.method === 'OPTIONS')
            response.end();
        // If there is no route, there is no reason to continue matching other middlewares.
        else if (route === null)
            response.end();
    }
}
exports.PluginMiddleware = PluginMiddleware;
//# sourceMappingURL=headers.js.map