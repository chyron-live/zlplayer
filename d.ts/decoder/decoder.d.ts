import EventEmitter from "../event/eventemitter";
export default abstract class Decoder {
    abstract setEmitter(emitter: EventEmitter): void;
    abstract init(): Promise<void>;
}
//# sourceMappingURL=decoder.d.ts.map