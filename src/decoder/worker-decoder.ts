import EventEmitter from '../event/eventemitter';
import { Events as PlayerEvents, EventTypes as PlayerEventTypes } from '../event/events';
import { EventTypes } from './worker-decoder-events';

import Decoder from './decoder';
import { secToMicro } from './constants';

const aacAudioDecoderCodec = 'mp4a.40.2';
const mpeg1AudioDecoderCodec = 'mp3'

export default class WorkerDecoder extends Decoder {
  private emitter: EventEmitter | null = null;

  private readonly onH264EmittedHandler = this.onH264Emitted.bind(this);
  private readonly onAACEmittedHandler = this.onAACEmitted.bind(this);
  private readonly onMPEG1AudioEmittedHandler = this.onMPEG1AudioEmitted.bind(this);

  static isSupported () {
    return window.isSecureContext && !!(window.VideoFrame) && !!(window.AudioData) && !!(window.VideoDecoder) && !!(window.AudioDecoder) && !!(window.EncodedVideoChunk) && !!(window.EncodedAudioChunk);
  }

  private videoDecoder: VideoDecoder | null = null;
  private audioDecoder: AudioDecoder | null = null;
  private videoKeyFrameArrived: boolean = false;

  private currentAudioDecoderCodec = '';

  private resetVideoDecoder = async () => {
    this.videoDecoder = new VideoDecoder({
      output: (videoFrame) => {
        this.emitter?.emit(PlayerEventTypes.VIDEO_FRAME_DECODED, {
          event: PlayerEventTypes.VIDEO_FRAME_DECODED,
          frame: videoFrame
        });
        videoFrame.close();
      },
      error: (e) => {
        this.emitter?.emit(PlayerEventTypes.VIDEO_DECODE_ERROR, {
          event: PlayerEventTypes.VIDEO_DECODE_ERROR,
          error: e,
        });
      },
    })
    this.videoDecoder.configure({
      codec: 'avc1.64001f', // TODO: refer sps
      hardwareAcceleration: "prefer-hardware",
      optimizeForLatency: true,
    });
    this.videoKeyFrameArrived = false;
  }

  private resetAudioDecoder = async (codec = aacAudioDecoderCodec) => {
    this.audioDecoder = new AudioDecoder({
      output: (audioFrame) => {
        this.emitter?.emit(PlayerEventTypes.AUDIO_FRAME_DECODED, {
          event: PlayerEventTypes.AUDIO_FRAME_DECODED,
          frame: audioFrame
        });
        audioFrame.close();
      },
      error: (e) => {
        this.emitter?.emit(PlayerEventTypes.AUDIO_DECODE_ERROR, {
          event: PlayerEventTypes.AUDIO_DECODE_ERROR,
          error: e,
        });
      },
    });
    this.currentAudioDecoderCodec = codec;
    this.audioDecoder.configure({
      codec,
      sampleRate: 48000, // TODO: Refer ADTS Header
      numberOfChannels: 2,
    });
  }

  public constructor() {
    super();
  }

  public setEmitter(emitter: EventEmitter) {
    if (this.emitter) {
      this.emitter.off(PlayerEventTypes.H264_EMITTED, this.onH264EmittedHandler);
      this.emitter.off(PlayerEventTypes.AAC_EMITTED, this.onAACEmittedHandler);
      this.emitter.off(PlayerEventTypes.MPEG1AUDIO_EMITTED, this.onMPEG1AudioEmittedHandler);
    }

    this.emitter = emitter;
    this.emitter.on(PlayerEventTypes.H264_EMITTED, this.onH264EmittedHandler);
    this.emitter.on(PlayerEventTypes.AAC_EMITTED, this.onAACEmittedHandler);
    this.emitter.on(PlayerEventTypes.MPEG1AUDIO_EMITTED, this.onMPEG1AudioEmittedHandler);
  }

  public async init(): Promise<void> {
    await this.resetVideoDecoder();
    await this.resetAudioDecoder();
  }

  private async onH264Emitted(payload: PlayerEvents[typeof PlayerEventTypes.H264_EMITTED]) {
    const { pts_timestamp, data: rawData, has_IDR } = payload;

    this.videoKeyFrameArrived ||= has_IDR;
    if (!this.videoKeyFrameArrived) { return; }

    const encodedVideoChunk = new EncodedVideoChunk({
      type: has_IDR ? 'key' : 'delta',
      timestamp: pts_timestamp * secToMicro,
      data: rawData,
    });

    try {
      this.videoDecoder?.decode(encodedVideoChunk);
    } catch (e: unknown) {
      this.emitter?.emit(EventTypes.VIDEO_DECODE_ERROR, {
        event: EventTypes.VIDEO_DECODE_ERROR,
        error: e,
      });
      await this.resetVideoDecoder();
    }

  }

  private async onAACEmitted(payload: PlayerEvents[typeof PlayerEventTypes.AAC_EMITTED]) {
    const { pts_timestamp, data: rawData } = payload;

    const encodedAudioChunk = new EncodedAudioChunk({
      type: 'key',
      timestamp: pts_timestamp * secToMicro,
      data: rawData,
    });

    try {
      if (this.currentAudioDecoderCodec !== aacAudioDecoderCodec) {
        await this.resetAudioDecoder(aacAudioDecoderCodec);
      }
      this.audioDecoder?.decode(encodedAudioChunk);
    } catch (e: unknown) {
      this.emitter?.emit(EventTypes.AUDIO_DECODE_ERROR, {
        event: EventTypes.AUDIO_DECODE_ERROR,
        error: e,
      });
      await this.resetAudioDecoder();
    }
  }

  private async onMPEG1AudioEmitted(payload: PlayerEvents[typeof PlayerEventTypes.MPEG1AUDIO_EMITTED]) {
    const { pts_timestamp, data: rawData } = payload;

    const encodedAudioChunk = new EncodedAudioChunk({
      type: 'key',
      timestamp: pts_timestamp * secToMicro,
      data: rawData,
    });

    try {
      if (this.currentAudioDecoderCodec !== mpeg1AudioDecoderCodec) {
        await this.resetAudioDecoder(mpeg1AudioDecoderCodec);
      }
      this.audioDecoder?.decode(encodedAudioChunk);
    } catch (e: unknown) {
      this.emitter?.emit(EventTypes.AUDIO_DECODE_ERROR, {
        event: EventTypes.AUDIO_DECODE_ERROR,
        error: e,
      });
      await this.resetAudioDecoder();
    }
  }
};