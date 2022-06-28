/// <reference types="dom-webcodecs" />
import { Events } from '../event/events';
import { LoadOption } from '../source/source';
export default abstract class Player {
    abstract load(url: string, options?: LoadOption): Promise<boolean>;
    abstract attachMedia(media: HTMLMediaElement): void;
    abstract stop(): void;
    abstract on<T extends keyof Events>(type: T, handler: ((payload: Events[T]) => void)): void;
    abstract off<T extends keyof Events>(type: T, handler: ((payload: Events[T]) => void)): void;
    abstract pushVideoFrame(videoFrame: VideoFrame): void;
    abstract pushAudioFrame(audioFrame: AudioData): void;
}
//# sourceMappingURL=player.d.ts.map