"use strict";
var _secret;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const tslib_1 = require("tslib");
const utilities_1 = require("@sapphire/utilities");
const crypto_1 = require("crypto");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
class Auth {
    constructor(options) {
        var _a, _b, _c;
        /**
         * The client's application id, this can be retrieved in Discord Developer Portal at https://discord.com/developers/applications.
         * @since 1.0.0
         */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The name for the cookie, this will be used to identify a Secure HttpOnly cookie.
         * @since 1.0.0
         */
        Object.defineProperty(this, "cookie", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The scopes defined at https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes.
         * @since 1.0.0
         */
        Object.defineProperty(this, "scopes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The redirect uri.
         * @since 1.0.0
         */
        Object.defineProperty(this, "redirect", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The transformers used for [[Auth.fetchData]].
         * @since 1.4.0
         */
        Object.defineProperty(this, "transformers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
        _secret.set(this, void 0);
        this.id = options.id;
        this.cookie = (_a = options.cookie) !== null && _a !== void 0 ? _a : 'SAPPHIRE_AUTH';
        this.scopes = (_b = options.scopes) !== null && _b !== void 0 ? _b : ['identify'];
        this.redirect = options.redirect;
        tslib_1.__classPrivateFieldSet(this, _secret, options.secret);
        this.transformers = (_c = options.transformers) !== null && _c !== void 0 ? _c : [];
    }
    /**
     * The client secret, this can be retrieved in Discord Developer Portal at https://discord.com/developers/applications.
     * @since 1.0.0
     */
    get secret() {
        return tslib_1.__classPrivateFieldGet(this, _secret);
    }
    /**
     * Encrypts an object with aes-256-cbc to use as a token.
     * @since 1.0.0
     * @param data An object to encrypt
     * @param secret The secret to encrypt the data with
     */
    encrypt(data) {
        const iv = crypto_1.randomBytes(16);
        const cipher = crypto_1.createCipheriv('aes-256-cbc', tslib_1.__classPrivateFieldGet(this, _secret), iv);
        return `${cipher.update(JSON.stringify(data), 'utf8', 'base64') + cipher.final('base64')}.${iv.toString('base64')}`;
    }
    /**
     * Decrypts an object with aes-256-cbc to use as a token.
     * @since 1.0.0
     * @param token An data to decrypt
     * @param secret The secret to decrypt the data with
     */
    decrypt(token) {
        const [data, iv] = token.split('.');
        const decipher = crypto_1.createDecipheriv('aes-256-cbc', tslib_1.__classPrivateFieldGet(this, _secret), Buffer.from(iv, 'base64'));
        try {
            const parsed = JSON.parse(decipher.update(data, 'base64', 'utf8') + decipher.final('utf8'));
            // If the token expired, return null:
            return parsed.expires >= Date.now() ? parsed : null;
        }
        catch {
            return null;
        }
    }
    /**
     * Retrieves the data for a specific user.
     * @since 1.4.0
     * @param token The access token from the user.
     */
    async fetchData(token) {
        // Fetch the information:
        const [user, guilds, connections] = await Promise.all([
            this.fetchInformation('identify', token, 'https://discord.com/api/v8/users/@me'),
            this.fetchInformation('guilds', token, 'https://discord.com/api/v8/users/@me/guilds'),
            this.fetchInformation('connections', token, 'https://discord.com/api/v8/users/@me/connections')
        ]);
        // Transform the information:
        let data = { user, guilds, connections };
        for (const transformer of this.transformers) {
            const result = transformer(data);
            if (utilities_1.isThenable(result))
                data = await result;
            else
                data = result;
        }
        return data;
    }
    async fetchInformation(scope, token, url) {
        if (!this.scopes.includes(scope))
            return undefined;
        const result = await node_fetch_1.default(url, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        return result.ok ? (await result.json()) : null;
    }
    static create(options) {
        if (!(options === null || options === void 0 ? void 0 : options.secret) || !options.id)
            return null;
        return new Auth(options);
    }
}
exports.Auth = Auth;
_secret = new WeakMap();
//# sourceMappingURL=Auth.js.map