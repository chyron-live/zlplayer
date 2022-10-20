export declare type LoadOption = {
    fetchOptions?: RequestInit;
};
export default abstract class Source {
    abstract abort(): void;
    abstract load(url: string, options?: LoadOption): Promise<boolean>;
    abstract getStream(): ReadableStream<Uint8Array>;
}
//# sourceMappingURL=source.d.ts.map