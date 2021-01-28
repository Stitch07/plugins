import { Awaited } from '@sapphire/utilities';
import type { RESTGetAPICurrentUserConnectionsResult, RESTGetAPICurrentUserGuildsResult, RESTGetAPICurrentUserResult, Snowflake } from 'discord-api-types/v8';
export declare class Auth {
    #private;
    /**
     * The client's application id, this can be retrieved in Discord Developer Portal at https://discord.com/developers/applications.
     * @since 1.0.0
     */
    id: Snowflake;
    /**
     * The name for the cookie, this will be used to identify a Secure HttpOnly cookie.
     * @since 1.0.0
     */
    cookie: string;
    /**
     * The scopes defined at https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes.
     * @since 1.0.0
     */
    scopes: readonly string[];
    /**
     * The redirect uri.
     * @since 1.0.0
     */
    redirect: string | undefined;
    /**
     * The transformers used for [[Auth.fetchData]].
     * @since 1.4.0
     */
    transformers: LoginDataTransformer[];
    private constructor();
    /**
     * The client secret, this can be retrieved in Discord Developer Portal at https://discord.com/developers/applications.
     * @since 1.0.0
     */
    get secret(): string;
    /**
     * Encrypts an object with aes-256-cbc to use as a token.
     * @since 1.0.0
     * @param data An object to encrypt
     * @param secret The secret to encrypt the data with
     */
    encrypt(data: AuthData): string;
    /**
     * Decrypts an object with aes-256-cbc to use as a token.
     * @since 1.0.0
     * @param token An data to decrypt
     * @param secret The secret to decrypt the data with
     */
    decrypt(token: string): AuthData | null;
    /**
     * Retrieves the data for a specific user.
     * @since 1.4.0
     * @param token The access token from the user.
     */
    fetchData(token: string): Promise<LoginData>;
    private fetchInformation;
    static create(options?: ServerOptionsAuth): Auth | null;
}
/**
 * Defines the authentication data, this is to be encrypted and decrypted by the server.
 * @since 1.0.0
 */
export interface AuthData {
    /**
     * The user ID.
     * @since 1.0.0
     */
    id: string;
    /**
     * The timestamp at which the token expires.
     * @since 1.0.0
     */
    expires: number;
    /**
     * The refresh token.
     * @since 1.0.0
     */
    refresh: string;
    /**
     * The access token.
     * @since 1.0.0
     */
    token: string;
}
/**
 * Defines the authentication options.
 * @since 1.0.0
 */
export interface ServerOptionsAuth {
    /**
     * The client's application id, this can be retrieved in Discord Developer Portal at https://discord.com/developers/applications.
     * @since 1.0.0
     */
    id: string;
    /**
     * The name for the cookie, this will be used to identify a Secure HttpOnly cookie.
     * @since 1.0.0
     * @default 'SAPPHIRE_AUTH'
     */
    cookie?: string;
    /**
     * The client secret, this can be retrieved in Discord Developer Portal at https://discord.com/developers/applications.
     * @since 1.0.0
     */
    secret: string;
    /**
     * The scopes defined at https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes.
     * @since 1.0.0
     * @default ['identify']
     */
    scopes?: string[];
    /**
     * The redirect uri. This will default to [[OAuth2BodyData.redirectUri]] if missing.
     * @since 1.0.0
     */
    redirect?: string;
    /**
     * The login data transformers used for [[Auth.fetchData]].
     * @since 1.4.0
     * @default []
     */
    transformers?: LoginDataTransformer[];
}
/**
 * The login data sent when fetching data from a user.
 * @since 1.4.0
 */
export interface LoginData {
    /**
     * The user data, defined when the `'identify'` scope is defined.
     * @since 1.4.0
     */
    user?: RESTGetAPICurrentUserResult | null;
    /**
     * The guilds data, defined when the `'guilds'` scope is defined.
     * @since 1.4.0
     */
    guilds?: RESTGetAPICurrentUserGuildsResult | null;
    /**
     * The connections data, defined when the `'connections'` scope is defined.
     * @since 1.4.0
     */
    connections?: RESTGetAPICurrentUserConnectionsResult | null;
}
/**
 * A login data transformer.
 * @since 1.4.0
 */
export interface LoginDataTransformer<T extends LoginData = LoginData> {
    /**
     * Transforms the object by mutating its properties or adding new ones.
     * @since 1.4.0
     */
    (data: LoginData): Awaited<T>;
}
//# sourceMappingURL=Auth.d.ts.map