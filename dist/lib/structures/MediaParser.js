"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaParser = void 0;
const pieces_1 = require("@sapphire/pieces");
const zlib_1 = require("zlib");
/**
 * A media parser
 * @since 1.3.0
 */
class MediaParser extends pieces_1.Piece {
    /**
     * Checks if a route accepts the media type from this parser.
     * @since 1.3.0
     * @param route The route to be checked.
     */
    accepts(route) {
        return route.acceptedContentMimeTypes === null || route.acceptedContentMimeTypes.includes(this.name);
    }
    /**
     * Reads the content body as a string, this is useful for parsing/reading plain-text data.
     * @since 1.3.0
     * @param request The request to read the body from.
     */
    async readString(request) {
        const stream = this.contentStream(request);
        if (stream === null)
            return '';
        let body = '';
        for await (const chunk of stream)
            body += chunk;
        return body;
    }
    /**
     * Reads the content body as a buffer, this is useful for parsing/reading binary data.
     * @since 1.3.0
     * @param request The request to read the body from.
     */
    async readBuffer(request) {
        const stream = this.contentStream(request);
        if (stream === null)
            return Buffer.alloc(0);
        const bodies = [];
        for await (const chunk of stream)
            bodies.push(chunk);
        return Buffer.concat(bodies);
    }
    /**
     * Reads the content stream from a request, piping the data through a transformer stream.
     * @since 1.3.0
     * @param request The request to read the body from.
     */
    contentStream(request) {
        var _a;
        switch (((_a = request.headers['content-encoding']) !== null && _a !== void 0 ? _a : 'identity').toLowerCase()) {
            // RFC 7230 4.2.2:
            //
            // The "deflate" coding is a "zlib" data format (RFC 1950) containing a "deflate" compressed data stream
            // (RFC 1951) that uses a combination of the Lempel-Ziv (LZ77) compression algorithm and Huffman coding.
            case 'deflate': {
                const stream = zlib_1.createInflate();
                request.pipe(stream);
                return stream;
            }
            // RFC 7230 4.2.3
            //
            // The "gzip" coding is an LZ77 coding with a 32-bit Cyclic Redundancy Check (CRC) that is commonly produced
            // by the gzip file compression program (RFC 1952).
            case 'x-gzip':
            case 'gzip': {
                const stream = zlib_1.createGunzip();
                request.pipe(stream);
                return stream;
            }
            // RFC 7932
            //
            // A format using the Brotli algorithm.
            case 'br': {
                const stream = zlib_1.createBrotliDecompress();
                request.pipe(stream);
                return stream;
            }
            // An "identity" token is used as a synonym for "no encoding" in order to communicate when no encoding is
            // preferred.
            case 'identity': {
                return request;
            }
        }
        return null;
    }
}
exports.MediaParser = MediaParser;
//# sourceMappingURL=MediaParser.js.map