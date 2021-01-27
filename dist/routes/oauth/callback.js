"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginRoute = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const querystring_1 = require("querystring");
require("../../lib/structures/http/HttpCodes");
const HttpMethods_1 = require("../../lib/structures/http/HttpMethods");
const Route_1 = require("../../lib/structures/Route");
class PluginRoute extends Route_1.Route {
    constructor(context) {
        var _a, _b, _c;
        super(context, { route: 'oauth/callback' });
        Object.defineProperty(this, "scopes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "scopeString", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "redirectUri", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { server } = this.context;
        this.enabled = server.auth !== null;
        this.scopes = (_b = (_a = server.auth) === null || _a === void 0 ? void 0 : _a.scopes) !== null && _b !== void 0 ? _b : ['identify'];
        this.scopeString = this.scopes.join(' ');
        this.redirectUri = (_c = server.auth) === null || _c === void 0 ? void 0 : _c.redirect;
    }
    async [HttpMethods_1.methods.POST](request, response) {
        const body = request.body;
        if (typeof (body === null || body === void 0 ? void 0 : body.code) !== 'string') {
            return response.badRequest();
        }
        const value = await this.fetchAuth(body);
        if (value === null) {
            return response.status(500 /* InternalServerError */).json({ error: 'Failed to fetch the token.' });
        }
        const now = Date.now();
        const auth = this.context.server.auth;
        const data = await auth.fetchData(value.access_token);
        if (!data.user) {
            return response.status(500 /* InternalServerError */).json({ error: 'Failed to fetch the user.' });
        }
        const token = auth.encrypt({
            id: data.user.id,
            expires: now + value.expires_in,
            refresh: value.refresh_token,
            token: value.access_token
        });
        response.cookies.add(auth.cookie, token, { maxAge: value.expires_in });
        return response.json(data);
    }
    async fetchAuth(body) {
        var _a;
        const { id, secret } = this.context.server.auth;
        const data = {
            /* eslint-disable @typescript-eslint/naming-convention */
            client_id: id,
            client_secret: secret,
            code: body.code,
            grant_type: 'authorization_code',
            scope: this.scopeString,
            redirect_uri: (_a = this.redirectUri) !== null && _a !== void 0 ? _a : body.redirectUri
            /* eslint-enable @typescript-eslint/naming-convention */
        };
        const result = await node_fetch_1.default('https://discord.com/api/v8/oauth2/token', {
            method: 'POST',
            body: querystring_1.stringify(data),
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        });
        const json = await result.json();
        if (result.ok)
            return json;
        this.context.client.logger.error(json);
        return null;
    }
}
exports.PluginRoute = PluginRoute;
//# sourceMappingURL=callback.js.map