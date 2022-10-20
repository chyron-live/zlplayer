import EventEmitter from '../event/eventemitter';
import Decoder from './decoder';
export default class WindowDecoder extends Decoder {
    private emitter;
    private videoDecoder;
    private audioDecoder;
    private videoKeyFrameArrived;
    private readonly onH264EmittedHandler;
    private readonly onAACEmittedHandler;
    static isSupported(): boolean;
    constructor();
    setEmitter(emitter: EventEmitter): void;
    init(): Promise<void>;
    private resetVideoDecoder;
    private resetAudioDecoder;
    private onH264Emitted;
    private onAACEmitted;
}
//# sourceMappingURL=window-decoder.d.ts.map