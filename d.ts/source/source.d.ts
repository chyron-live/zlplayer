export default abstract class Source {
    abstract abort(): void;
    abstract load(url: string): Promise<boolean>;
    abstract getStream(): ReadableStream<Uint8Array>;
}
//# sourceMappingURL=source.d.ts.map