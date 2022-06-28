export default class SectionDecoder {
    private readonly pid;
    private chunks;
    constructor(pid: number);
    getPid(): number;
    add(packet: Uint8Array): Uint8Array[] | null;
}
//# sourceMappingURL=section-decoder.d.ts.map