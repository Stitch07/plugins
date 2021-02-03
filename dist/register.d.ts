import './index';
import { Plugin, postInitialization, preLogin, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
/**
 * @since 1.0.0
 */
export declare class Api extends Plugin {
    /**
     * @since 1.0.0
     */
    static [postInitialization](this: SapphireClient, options: ClientOptions): void;
    /**
     * @since 1.0.0
     */
    static [preLogin](this: SapphireClient): Promise<void>;
}
//# sourceMappingURL=register.d.ts.map