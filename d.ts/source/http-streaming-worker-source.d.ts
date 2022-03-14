import Source from "./source";
export default class HTTPStreamingWorkerSource extends Source {
    private outputStream;
    private outputController;
    private worker;
    constructor();
    static isSupported(): boolean;
    abort(): void;
    load(url: string): Promise<boolean>;
    getStream(): ReadableStream<Uint8Array>;
}
//# sourceMappingURL=http-streaming-worker-source.d.ts.map