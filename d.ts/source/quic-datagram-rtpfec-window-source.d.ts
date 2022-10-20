import Source from "./source";
export default class HTTPStreamingWindowSource extends Source {
    private webTransport;
    private datagramReader;
    private abortController;
    private outputStream;
    private outputController;
    private ringBuffer;
    private head;
    private tail;
    private length;
    private baseSN;
    private fecs;
    constructor(length: number);
    static isSupported(): boolean;
    abort(): void;
    load(url: string): Promise<boolean>;
    getStream(): ReadableStream<Uint8Array>;
    private after;
    private has;
    private get;
    private push;
    private pump;
}
//# sourceMappingURL=quic-datagram-rtpfec-window-source.d.ts.map