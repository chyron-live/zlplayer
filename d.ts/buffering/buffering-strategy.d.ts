import EventEmitter from "../event/eventemitter";
export default abstract class BufferingStrategy {
    abstract setEmitter(emitter: EventEmitter): void;
    abstract start(): void;
    abstract abort(): void;
    abstract destroy(): void;
}
//# sourceMappingURL=buffering-strategy.d.ts.map