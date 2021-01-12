import { Awaited } from '@sapphire/utilities';
import { StringMap, TFunction, TOptions } from 'i18next';
import { i18nextFsBackend } from 'i18next-fs-backend';
import type { I18nOptions } from './types/options';
/**
 * A generalised class for handling `i18next` JSON files and their discovery.
 * @since 1.0.0
 */
export declare class I18nextHandler {
    /**
     * Describes whether `I18nextHandler#init` has been run and languages are loaded in `I18nextHandler.languages`.
     * @since 1.0.0
     */
    languagesLoaded: boolean;
    /**
     * A `Set` of initially loaded namespaces.
     * @since 1.2.0
     */
    namespaces: Set<string>;
    /**
     * A `Map` of `i18next` language functions keyed by their language code.
     * @since 1.0.0
     */
    readonly languages: Map<string, TFunction>;
    /**
     * The options I18nextHandler was initialized with in the client.
     * @since 1.0.0
     */
    readonly options?: I18nOptions;
    /**
     * The director passed to `i18next-fs-backend`.
     * Also used in {@link I18nextHandler.walkLanguageDirectory}.
     * @since 1.2.0
     */
    readonly languagesDir: string;
    /**
     * The backend options for `i18next-fs-backend` used by `i18next`.
     * @since 1.0.0
     */
    protected readonly backendOptions: i18nextFsBackend.i18nextFsBackendOptions;
    /**
     * @param options The options that `i18next`, `i18next-fs-backend`, and {@link I18nextHandler} should use.
     * @since 1.0.0
     * @constructor
     */
    constructor(options?: I18nOptions);
    /**
     * Intitialises the handler by loading in the namespaces, passing the data to i18next, and filling in the {@link I18nextHandler#languages}.
     * @since 1.0.0
     */
    init(): Promise<void>;
    /**
     * Retrieve a raw TFunction from the passed locale.
     * @param locale The language to be used.
     * @since 1.0.0
     */
    fetchT(locale: string): TFunction;
    /**
     * Resolves a localised string from a language code, key, optional replaceables, and optional i18next options.
     * @param locale The language to be used.
     * @param key The key that should be translated.
     * @param replace The replaceable keys in translation string.
     * @param options i18next language options.
     * @since 1.0.0
     */
    fetchLocale(locale: string, key: string, replace?: Record<string, unknown>, options?: TOptions<StringMap>): Awaited<string>;
    /**
     * @description Skips any files that don't end with `.json`.
     * @param dir The directory that should be walked.
     * @param namespaces The currently known namespaces.
     * @param current The directory currently being traversed.
     * @since 1.0.0
     */
    walkLanguageDirectory(dir: string, namespaces?: string[], current?: string): Promise<{
        namespaces: string[];
        languages: string[];
    }>;
}
//# sourceMappingURL=I18nextHandler.d.ts.map