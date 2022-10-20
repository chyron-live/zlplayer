import { Events } from './events';
export default class EventEmitter {
    private listeners;
    on<T extends keyof Events>(type: T, handler: ((payload: Events[T]) => void)): void;
    off<T extends keyof Events>(type: T, handler: ((payload: Events[T]) => void)): void;
    emit<T extends keyof Events>(type: T, payload: Events[T]): void;
}
//# sourceMappingURL=eventemitter.d.ts.map