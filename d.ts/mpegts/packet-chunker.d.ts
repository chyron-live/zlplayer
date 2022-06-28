export default class PacketChunker {
    private inputReader;
    private restBytes;
    private outputStream;
    private outputController;
    constructor(reader: ReadableStream<Uint8Array>);
    static isSupported(): boolean;
    getStream(): ReadableStream<Uint8Array>;
    abort(): void;
    private pump;
}
//# sourceMappingURL=packet-chunker.d.ts.map