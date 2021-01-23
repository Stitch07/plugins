import type { Snowflake } from 'discord-api-types/v8';
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
    static create(options?: ServerOptionsAuth): Auth | null;
}
export interface AuthData {
    id: string;
    expires: number;
    refresh: string;
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
}
//# sourceMappingURL=Auth.d.ts.map