"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = exports.ServerEvents = void 0;
const pieces_1 = require("@sapphire/pieces");
const events_1 = require("events");
const http_1 = require("http");
const ApiRequest_1 = require("../api/ApiRequest");
const ApiResponse_1 = require("../api/ApiResponse");
const MediaParserStore_1 = require("../MediaParserStore");
const MiddlewareStore_1 = require("../MiddlewareStore");
const RouteStore_1 = require("../RouteStore");
const Auth_1 = require("./Auth");
var ServerEvents;
(function (ServerEvents) {
    ServerEvents["Error"] = "error";
    ServerEvents["Request"] = "request";
    ServerEvents["Match"] = "match";
    ServerEvents["NoMatch"] = "noMatch";
    ServerEvents["RouteError"] = "routeError";
    ServerEvents["MiddlewareFailure"] = "middlewareFailure";
    ServerEvents["MiddlewareError"] = "middlewareError";
    ServerEvents["MiddlewareSuccess"] = "middlewareSuccess";
})(ServerEvents = exports.ServerEvents || (exports.ServerEvents = {}));
/**
 * @since 1.0.0
 */
class Server extends events_1.EventEmitter {
    /**
     * @since 1.0.0
     * @param options The options for this server
     */
    constructor({ auth, ...options } = {}) {
        var _a;
        super();
        /**
         * The routes this server holds.
         * @since 1.0.0
         */
        Object.defineProperty(this, "routes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The middlewares this server holds.
         * @since 1.0.0
         */
        Object.defineProperty(this, "middlewares", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The media parsers this server holds.
         * @since 1.3.0
         */
        Object.defineProperty(this, "mediaParsers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The authentication system.
         * @since 1.0.0
         */
        Object.defineProperty(this, "auth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The http.Server instance that manages the recieved HTTP requests.
         * @since 1.0.0
         */
        Object.defineProperty(this, "server", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The options for this server.
         * @since 1.0.0
         */
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        pieces_1.Store.injectedContext.server = this;
        this.options = options;
        this.server = http_1.createServer({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            IncomingMessage: ApiRequest_1.ApiRequest,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ServerResponse: ApiResponse_1.ApiResponse,
            ...((_a = options.server) !== null && _a !== void 0 ? _a : {})
        });
        this.routes = new RouteStore_1.RouteStore();
        this.middlewares = new MiddlewareStore_1.MiddlewareStore();
        this.mediaParsers = new MediaParserStore_1.MediaParserStore();
        this.auth = Auth_1.Auth.create(auth);
        this.server.on('error', this.emit.bind(this, "error" /* Error */));
        this.server.on('request', this.emit.bind(this, "request" /* Request */));
    }
    connect() {
        var _a;
        const { server } = this;
        server.listen({
            port: 4000,
            ...((_a = this.options.listenOptions) !== null && _a !== void 0 ? _a : {})
        });
        return new Promise((resolve, reject) => {
            function listening() {
                cleanup();
                resolve();
            }
            function error(error) {
                cleanup();
                reject(error);
            }
            function close() {
                cleanup();
                reject(new Error('Closed unexpectedly.'));
            }
            function cleanup() {
                server.off('listening', listening);
                server.off('error', error);
                server.off('close', close);
            }
            server.on('listening', listening);
            server.on('error', error);
            server.on('close', close);
        });
    }
    disconnect() {
        return new Promise((resolve, reject) => {
            this.server.close((error) => (error ? resolve() : reject(error)));
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map