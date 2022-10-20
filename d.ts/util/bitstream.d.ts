export default class Bitstream {
    private bits;
    private data;
    private offset;
    constructor(data: Uint8Array);
    private fill_bits;
    private peekBit;
    private readBit;
    private count_trailing_zeros;
    readBits(length: number): number;
    readUEG(): number;
    readSEG(): number;
}
//# sourceMappingURL=bitstream.d.ts.map