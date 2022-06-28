export default class PESDecoder {
    private readonly pid;
    private chunks;
    constructor(pid: number);
    getPid(): number;
    add(packet: Uint8Array): Uint8Array[] | null;
}
//# sourceMappingURL=pes-decoder.d.ts.map