import EventEmitter from "../event/eventemitter";
export default class Demuxer {
    private inputReader;
    private emitter;
    private PATDecoder;
    private PMTDecoder;
    private VideoDecoder;
    private SoundDecoder;
    private ID3Decoder;
    private ARIBCaptionDecoder;
    private MPEG2Decoder;
    private PCR_PID;
    private initPTS;
    private isFirstAAC;
    constructor(reader: ReadableStream<Uint8Array>, emitter: EventEmitter);
    static isSupported(): boolean;
    abort(): void;
    private reset;
    private pump;
}
//# sourceMappingURL=demuxer.d.ts.map