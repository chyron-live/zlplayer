import Player from './player'

import HTTPStreamingWorkerSource from '../source/http-streaming-worker-source';
import Demuxer from '../demux/demuxer';
import EventEmitter from '../event/eventemitter';
import { Events, EventTypes } from '../event/events';
import PacketChunker from '../mpegts/packet-chunker';
import BufferingStrategy from '../buffering/buffering-strategy';
import TickBasedThrottling from '../buffering/tick-based-throttling';
import Source, { LoadOption } from '../source/source';
import Decoder from '../decoder/decoder';
import WorkerDecoder from '../decoder/worker-decoder';

type PassThroughPlayerOptions = {
  audioTrack?: number;
  audioTransformer?: Transformer;
  source?: Source;
  bufferingStrategy?: BufferingStrategy;
  decoder?: Decoder;
}

export default class PassThroughPlayer extends Player {
  private readonly emitter: EventEmitter;
  private options: Required<Omit<PassThroughPlayerOptions, 'audioTransformer'>> & Pick<PassThroughPlayerOptions, 'audioTransformer'>;

  private source: Source;
  private chunker: PacketChunker | null = null;
  private demuxer: Demuxer | null = null;
  private buffering: BufferingStrategy;
  private decoder: Decoder;

  private media: HTMLMediaElement | null = null;
  private videoTrackGeneratorWriter: WritableStreamDefaultWriter | null = null;
  private audioTrackGeneratorWriter: WritableStreamDefaultWriter | null = null;

  private readonly onVideoFrameDecodedHandler = this.onVideoFrameDecoded.bind(this);
  private readonly onAudioFrameDecodedHandler = this.onAudioFrameDecoded.bind(this);

  static isSupported () {
    return window.isSecureContext && !!(window.VideoFrame) && !!(window.AudioData) && !!(window.VideoDecoder) && !!(window.AudioDecoder) && !!(window.EncodedVideoChunk) && !!(window.EncodedAudioChunk);
  }

  public constructor(options?: PassThroughPlayerOptions) {
    super();

    this.emitter = new EventEmitter();
    this.options = {
      audioTrack: options?.audioTrack ?? 0,
      source: options?.source ?? new HTTPStreamingWorkerSource(),
      bufferingStrategy: options?.bufferingStrategy ?? new TickBasedThrottling(),
      decoder: options?.decoder ?? new WorkerDecoder(),
      audioTransformer: options?.audioTransformer
    };

    this.source = this.options.source;
    this.buffering = this.options.bufferingStrategy;
    this.buffering.setEmitter(this.emitter);
    this.decoder = this.options.decoder;
    this.decoder.setEmitter(this.emitter);

    this.emitter.on(EventTypes.VIDEO_FRAME_DECODED, this.onVideoFrameDecodedHandler);
    this.emitter.on(EventTypes.AUDIO_FRAME_DECODED, this.onAudioFrameDecodedHandler);
  }

  public async load(url: string, options?: LoadOption): Promise<boolean> {
    if (!(await this.source.load(url, options))) {
      return false;
    }

    this.chunker = new PacketChunker(this.source.getStream());
    this.demuxer = new Demuxer(this.chunker.getStream(), this.emitter, this.options.audioTrack);
    this.buffering.start();
    await this.decoder.init();

    return true;
  }

  public attachMedia(media: HTMLMediaElement): void {
    this.media = media;
    this.unload();

    const videoTrackGenerator = new MediaStreamTrackGenerator({ kind: 'video' });
    const audioTrackGeneratorInput = new MediaStreamTrackGenerator({ kind: 'audio' });

    let audioTrackGeneratorOutput = null;

    this.videoTrackGeneratorWriter = videoTrackGenerator.writable.getWriter();
    this.audioTrackGeneratorWriter = audioTrackGeneratorInput.writable.getWriter();

    if (this.options.audioTransformer) {
      const trackProcessor = new MediaStreamTrackProcessor({ track: audioTrackGeneratorInput });

      audioTrackGeneratorOutput = new MediaStreamTrackGenerator({ kind: 'audio' });

      const transformer = new TransformStream(this.options.audioTransformer);

      trackProcessor.readable.pipeThrough(transformer).pipeTo(audioTrackGeneratorOutput?.writable);
    }

    const mediaStream = new MediaStream();

    mediaStream.addTrack(videoTrackGenerator);

    if (audioTrackGeneratorOutput) mediaStream.addTrack(audioTrackGeneratorOutput);
    else mediaStream.addTrack(audioTrackGeneratorInput);

    this.media.srcObject = mediaStream;
  }

  private abort(): void {
    this.demuxer?.abort();
    this.chunker?.abort();
    this.buffering?.abort();
    this.source.abort();
  }

  private unload() {
    this.media?.removeAttribute('src');
    this.media?.load();
  }

  public stop(): void {
    this.abort();
    this.unload();
  }

  public on<T extends keyof Events>(type: T, handler: ((payload: Events[T]) => void)): void {
    this.emitter?.on(type, handler);
  }

  public off<T extends keyof Events>(type: T, handler: ((payload: Events[T]) => void)): void {
    this.emitter?.off(type, handler);
  }

  public pushVideoFrame(videoFrame: VideoFrame) {
    this.videoTrackGeneratorWriter?.write(videoFrame).finally(() => videoFrame.close());
  }

  public pushAudioFrame(audioFrame: AudioData) {
    this.audioTrackGeneratorWriter?.write(audioFrame).finally(() => audioFrame.close());
  }

  private async onVideoFrameDecoded({ frame }: Events[typeof EventTypes.VIDEO_FRAME_DECODED]) {
    this.pushVideoFrame(frame);
  }

  private async onAudioFrameDecoded({ frame }: Events[typeof EventTypes.AUDIO_FRAME_DECODED]) {
    this.pushAudioFrame(frame);
  }
};