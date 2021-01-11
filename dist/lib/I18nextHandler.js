"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nextHandler = void 0;
const tslib_1 = require("tslib");
const pieces_1 = require("@sapphire/pieces");
const utilities_1 = require("@sapphire/utilities");
const promises_1 = require("fs/promises");
const i18next_1 = tslib_1.__importDefault(require("i18next"));
const i18next_fs_backend_1 = tslib_1.__importDefault(require("i18next-fs-backend"));
const path_1 = require("path");
/**
 * A generalised class for handling `i18next` JSON files and their discovery.
 * @since 1.0.0
 */
class I18nextHandler {
    /**
     * @param options The options that `i18next`, `i18next-fs-backend`, and {@link I18nextHandler} should use.
     * @since 1.0.0
     * @constructor
     */
    constructor(options) {
        var _a, _b, _c;
        /**
         * Describes whether `I18nextHandler#init` has been run and languages are loaded in `I18nextHandler.languages`.
         * @since 1.0.0
         */
        Object.defineProperty(this, "languagesLoaded", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**
         * A `Map` of `i18next` language functions keyed by their language code.
         * @since 1.0.0
         */
        Object.defineProperty(this, "languages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        /**
         * The options I18nextHandler was initialized with in the client.
         */
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "languagesDir", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "backendOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.options = options;
        this.languagesDir = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.defaultLanguageDirectory) !== null && _b !== void 0 ? _b : path_1.join(pieces_1.getRootData().root, 'languages');
        this.backendOptions = utilities_1.mergeDefault({
            loadPath: path_1.join(this.languagesDir, '{{lng}}', '{{ns}}.json'),
            addPath: this.languagesDir
        }, (_c = this.options) === null || _c === void 0 ? void 0 : _c.backend);
    }
    /**
     * Intitialises the handler by loading in the namespaces, passing the data to i18next, and filling in the {@link I18nextHandler#languages}.
     * @since 1.0.0
     */
    async init() {
        var _a, _b, _c, _d, _e, _f, _g;
        const { namespaces, languages } = await this.walkLanguageDirectory(this.languagesDir);
        i18next_1.default.use(i18next_fs_backend_1.default);
        await i18next_1.default.init(utilities_1.mergeDefault({
            backend: this.backendOptions,
            fallbackLng: (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.defaultName) !== null && _b !== void 0 ? _b : 'en-US',
            initImmediate: false,
            interpolation: {
                escapeValue: false
            },
            load: 'all',
            defaultNS: (_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.defaultNS) !== null && _d !== void 0 ? _d : 'default',
            ns: namespaces,
            preload: languages
        }, utilities_1.isFunction((_e = this.options) === null || _e === void 0 ? void 0 : _e.i18next) ? (_f = this.options) === null || _f === void 0 ? void 0 : _f.i18next(namespaces, languages) : (_g = this.options) === null || _g === void 0 ? void 0 : _g.i18next));
        for (const item of languages) {
            this.languages.set(item, i18next_1.default.getFixedT(item));
        }
        this.languagesLoaded = true;
    }
    /**
     * Retrieve a raw TFunction from the passed locale.
     * @param locale The language to be used.
     * @since 1.0.0
     */
    fetchT(locale) {
        if (!this.languagesLoaded)
            throw new Error('Cannot call this method until I18nextHandler#init has been called');
        const t = this.languages.get(locale);
        if (t)
            return t;
        throw new ReferenceError('Invalid language provided');
    }
    /**
     * Resolves a localised string from a language code, key, optional replaceables, and optional i18next options.
     * @param locale The language to be used.
     * @param key The key that should be translated.
     * @param replace The replaceable keys in translation string.
     * @param options i18next language options.
     * @since 1.0.0
     */
    fetchLocale(locale, key, replace, options) {
        var _a, _b;
        if (!this.languagesLoaded)
            throw new Error('Cannot call this method until I18nextHandler#init has been called');
        const language = this.languages.get(locale);
        if (!language)
            throw new ReferenceError('Invalid language provided');
        return language(key, utilities_1.mergeDefault({
            defaultValue: language((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.defaultMissingKey) !== null && _b !== void 0 ? _b : 'default:default', { replace: { key } }),
            replace
        }, options));
    }
    /**
     * @description Skips any files that don't end with `.json`.
     * @param dir The directory that should be walked.
     * @param namespaces The currently known namespaces.
     * @param current The directory currently being traversed.
     * @since 1.0.0
     * @protected
     */
    async walkLanguageDirectory(dir, namespaces = [], current = '') {
        const directory = await promises_1.opendir(dir);
        const languages = [];
        for await (const entry of directory) {
            const fn = entry.name;
            if (entry.isDirectory()) {
                // This structure may very well be changed in future.
                // See i18next/i18next-fs-backend#13
                const isLanguage = fn.includes('-');
                if (isLanguage)
                    languages.push(fn);
                ({ namespaces } = await this.walkLanguageDirectory(path_1.join(dir, fn), namespaces, isLanguage ? '' : `${fn}/`));
            }
            else if (entry.name.endsWith('.json')) {
                namespaces.push(`${current}${fn.substr(0, fn.length - 5)}`);
            }
        }
        return { namespaces: [...new Set(namespaces)], languages };
    }
}
exports.I18nextHandler = I18nextHandler;
//# sourceMappingURL=I18nextHandler.js.map