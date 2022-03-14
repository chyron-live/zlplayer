import BufferingStrategy from "./buffering-strategy";
import EventEmitter from "../event/eventemitter";
declare type TickBasedThrottlingOptions = {
    delay?: number;
    emitFirstFrameOnly?: boolean;
    hasAudioTrack?: boolean;
    tickHz?: number;
};
export default class TickBasedThrottling extends BufferingStrategy {
    private emitter;
    private options;
    private ticker;
    private readonly onH264ParsedHandler;
    private readonly onAACParsedHandler;
    private readonly onMPEG2VideoParsedHandler;
    private readonly onTickerTickHandler;
    private h264Queue;
    private aacQueue;
    private mpeg2videoQueue;
    private soundBufferingTime;
    private soundStalledTime;
    private soundDelayTime;
    private soundDelayEmitTimestamp;
    private startTimestamp;
    private lastTimestamp;
    static isSupported(): boolean;
    constructor(options?: TickBasedThrottlingOptions);
    setEmitter(emitter: EventEmitter): void;
    start(): void;
    abort(): void;
    destroy(): void;
    private onH264Parsed;
    private onAACParsed;
    private onMPEG2VideoParsed;
    private onTickerTick;
    private onTick;
}
export {};
//# sourceMappingURL=tick-based-throttling.d.ts.map