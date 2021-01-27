/// <reference types="node" />
import { Piece } from '@sapphire/pieces';
import type { Awaited } from '@sapphire/utilities';
import type { ApiRequest } from './api/ApiRequest';
import type { Route } from './Route';
/**
 * A media parser
 * @since 1.3.0
 */
export declare abstract class MediaParser extends Piece {
    /**
     * Parses the body data from an API request.
     * @since 1.3.0
     */
    abstract run(request: ApiRequest): Awaited<unknown>;
    /**
     * Checks if a route accepts the media type from this parser.
     * @since 1.3.0
     * @param route The route to be checked.
     */
    accepts(route: Route): boolean;
    /**
     * Reads the content body as a string, this is useful for parsing/reading plain-text data.
     * @since 1.3.0
     * @param request The request to read the body from.
     */
    protected readString(request: ApiRequest): Promise<string>;
    /**
     * Reads the content body as a buffer, this is useful for parsing/reading binary data.
     * @since 1.3.0
     * @param request The request to read the body from.
     */
    protected readBuffer(request: ApiRequest): Promise<Buffer>;
    /**
     * Reads the content stream from a request, piping the data through a transformer stream.
     * @since 1.3.0
     * @param request The request to read the body from.
     */
    protected contentStream(request: ApiRequest): import("zlib").BrotliDecompress | ApiRequest | null;
}
//# sourceMappingURL=MediaParser.d.ts.map