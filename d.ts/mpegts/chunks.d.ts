export default class Chunks {
    private chunks;
    private total;
    private expected;
    constructor(expected: number);
    push(buffer: Uint8Array): void;
    length(): number;
    expect(): number;
    concat(): Uint8Array;
    isOver(): boolean;
    isFull(): boolean;
}
//# sourceMappingURL=chunks.d.ts.map