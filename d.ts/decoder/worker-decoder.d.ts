import EventEmitter from '../event/eventemitter';
import Decoder from './decoder';
export default class WorkerDecoder extends Decoder {
    private emitter;
    private worker;
    private readonly onH264EmittedHandler;
    private readonly onAACEmittedHandler;
    static isSupported(): boolean;
    constructor();
    setEmitter(emitter: EventEmitter): void;
    init(): Promise<void>;
    private onH264Emitted;
    private onAACEmitted;
}
//# sourceMappingURL=worker-decoder.d.ts.map