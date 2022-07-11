import Source, { LoadOption } from "./source";
export default class HTTPStreamingWindowSource extends Source {
    private fetchReader;
    private abortController;
    private outputStream;
    private outputController;
    constructor();
    static isSupported(): boolean;
    abort(): void;
    load(url: string, options?: LoadOption): Promise<boolean>;
    getStream(): ReadableStream<Uint8Array>;
    private pump;
}
//# sourceMappingURL=http-streaming-window-source.d.ts.map