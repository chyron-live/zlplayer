import { EventTypes } from './worker-decoder-events';
import { secToMicro } from './constants';

let videoDecoder: VideoDecoder | null = null;
let audioDecoder: AudioDecoder | null = null;
let videoKeyFrameArrived: boolean = false;

const aacAudioDecoderCodec = 'mp4a.40.2';
const mpeg1AudioDecoderCodec = 'mp3'
let currentAudioDecoderCodec = '';

const resetVideoDecoder = async () => {
  videoDecoder = new VideoDecoder({
    output: (videoFrame) => {
      self.postMessage({
        event: EventTypes.VIDEO_FRAME_DECODED,
        frame: videoFrame
      });
      videoFrame.close();
    },
    error: (e) => {
      self.postMessage({
        event: EventTypes.VIDEO_DECODE_ERROR,
        error: e,
      });
    },
  })
  videoDecoder.configure({
    codec: 'avc1.64001f', // TODO: refer sps
    hardwareAcceleration: "prefer-hardware",
  });
  videoKeyFrameArrived = false;
}

const resetAudioDecoder = async (codec = aacAudioDecoderCodec) => {
  audioDecoder = new AudioDecoder({
    output: (audioFrame) => {
      self.postMessage({
        event: EventTypes.AUDIO_FRAME_DECODED,
        frame: audioFrame
      });
      audioFrame.close();
    },
    error: (e) => {
      self.postMessage({
        event: EventTypes.AUDIO_DECODE_ERROR,
        error: e,
      });
    },
  });
  currentAudioDecoderCodec = codec;
  audioDecoder.configure({
    codec,
    sampleRate: 48000, // TODO: Refer ADTS Header
    numberOfChannels: 2,
  });
}

self.onmessage = async ({ data }) => {
  const { event } = data;
  switch(event) {
    case EventTypes.H264_EMITTED: {
      const { pts_timestamp, data: rawData, has_IDR } = data;

      videoKeyFrameArrived ||= has_IDR;
      if (!videoKeyFrameArrived) { return; }

      const encodedVideoChunk = new EncodedVideoChunk({
        type: has_IDR ? 'key' : 'delta',
        timestamp: pts_timestamp * secToMicro,
        data: rawData,
      });

      try {
        videoDecoder?.decode(encodedVideoChunk);
      } catch (e: unknown) {
        self.postMessage({
          event: EventTypes.VIDEO_DECODE_ERROR,
          error: e,
        });
        await resetVideoDecoder();
      }
      break;
    }
    case EventTypes.AAC_EMITTED:
    case EventTypes.MPEG1AUDIO_EMITTED: {
      const { pts_timestamp, data: rawData } = data;

      const encodedAudioChunk = new EncodedAudioChunk({
        type: 'key',
        timestamp: pts_timestamp * secToMicro,
        data: rawData,
      });

      try {
        if (event === EventTypes.AAC_EMITTED && currentAudioDecoderCodec !== aacAudioDecoderCodec) {
          await resetAudioDecoder(aacAudioDecoderCodec);
        }
        if (event === EventTypes.MPEG1AUDIO_EMITTED && currentAudioDecoderCodec !== mpeg1AudioDecoderCodec) {
          await resetAudioDecoder(mpeg1AudioDecoderCodec);
        }
        audioDecoder?.decode(encodedAudioChunk);
      } catch (e: unknown) {
        self.postMessage({
          event: EventTypes.AUDIO_DECODE_ERROR,
          error: e,
        });
        await resetAudioDecoder();
      }
      break;
    }
    case EventTypes.DECODER_INITIALIZE: {
      await resetVideoDecoder();
      await resetAudioDecoder();
      break;
    }
  }
}