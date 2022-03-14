import EventEmitter from "../event/eventemitter";
import BufferingStrategy from "./buffering-strategy";
export default class PassThrough extends BufferingStrategy {
    private emitter;
    private readonly onH264ParsedHandler;
    private readonly onAACParsedHandler;
    private readonly onMPEG2VideoParsedHandler;
    static isSupported(): boolean;
    setEmitter(emitter: EventEmitter): void;
    start(): void;
    abort(): void;
    destroy(): void;
    private onH264Parsed;
    private onAACParsed;
    private onMPEG2VideoParsed;
}
//# sourceMappingURL=pass-through.d.ts.map