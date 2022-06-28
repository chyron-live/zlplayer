/// <reference types="dom-webcodecs" />
import Player from './player';
import { Events } from '../event/events';
import BufferingStrategy from '../buffering/buffering-strategy';
import Source, { LoadOption } from '../source/source';
import Decoder from '../decoder/decoder';
declare type PassThroughPlayerOptions = {
    source?: Source;
    bufferingStrategy?: BufferingStrategy;
    decoder?: Decoder;
    audioTransformer?: Transformer<any, any>;
};
export default class PassThroughPlayer extends Player {
    private emitter;
    private options;
    private source;
    private chunker;
    private demuxer;
    private buffering;
    private decoder;
    private media;
    private videoTrackGeneratorWriter;
    private audioTrackGeneratorWriter;
    private readonly onVideoFrameDecodedHandler;
    private readonly onAudioFrameDecodedHandler;
    static isSupported(): boolean;
    constructor(options?: PassThroughPlayerOptions);
    load(url: string, options?: LoadOption): Promise<boolean>;
    attachMedia(media: HTMLMediaElement): void;
    private abort;
    private unload;
    stop(): void;
    on<T extends keyof Events>(type: T, handler: ((payload: Events[T]) => void)): void;
    off<T extends keyof Events>(type: T, handler: ((payload: Events[T]) => void)): void;
    pushVideoFrame(videoFrame: VideoFrame): void;
    pushAudioFrame(audioFrame: AudioData): void;
    private onVideoFrameDecoded;
    private onAudioFrameDecoded;
}
export {};
//# sourceMappingURL=pass-through-player.d.ts.map