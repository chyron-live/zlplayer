import { EventTypes as PlayerEventTypes, Events as PlayerEvents } from '../event/events';
export declare const EventTypes: {
    readonly H264_EMITTED: "H264_EMITTED";
    readonly AAC_EMITTED: "AAC_EMITTED";
    readonly DECODER_INITIALIZE: "DECODER_INITIALIZE";
    readonly VIDEO_FRAME_DECODED: "VIDEO_FRAME_DECODED";
    readonly AUDIO_FRAME_DECODED: "AUDIO_FRAME_DECODED";
    readonly VIDEO_DECODE_ERROR: "VIDEO_DECODE_ERROR";
    readonly AUDIO_DECODE_ERROR: "AUDIO_DECODE_ERROR";
};
export declare type H264_EMITTED_PAYLOAD = PlayerEvents[typeof PlayerEventTypes.H264_EMITTED];
export declare type AAC_EMITTED_PAYLOAD = PlayerEvents[typeof PlayerEventTypes.AAC_EMITTED];
export declare type DECODER_INITIALIZE_PAYLOAD = {
    event: typeof EventTypes.DECODER_INITIALIZE;
};
export declare type VIDEO_FRAME_DECODED_PAYLOAD = PlayerEvents[typeof PlayerEventTypes.VIDEO_FRAME_DECODED];
export declare type AUDIO_FRAME_DECODED_PAYLOAD = PlayerEvents[typeof PlayerEventTypes.AUDIO_FRAME_DECODED];
export declare type VIDEO_DECODE_ERROR_PAYLOAD = PlayerEvents[typeof PlayerEventTypes.VIDEO_DECODE_ERROR];
export declare type AUDIO_DECODE_ERROR_PAYLOAD = PlayerEvents[typeof PlayerEventTypes.AUDIO_DECODE_ERROR];
export declare type Events = {
    [EventTypes.H264_EMITTED]: H264_EMITTED_PAYLOAD;
    [EventTypes.AAC_EMITTED]: AAC_EMITTED_PAYLOAD;
    [EventTypes.DECODER_INITIALIZE]: DECODER_INITIALIZE_PAYLOAD;
    [EventTypes.VIDEO_FRAME_DECODED]: VIDEO_FRAME_DECODED_PAYLOAD;
    [EventTypes.AUDIO_FRAME_DECODED]: AUDIO_FRAME_DECODED_PAYLOAD;
    [EventTypes.VIDEO_DECODE_ERROR]: VIDEO_DECODE_ERROR_PAYLOAD;
    [EventTypes.AUDIO_DECODE_ERROR]: AUDIO_DECODE_ERROR_PAYLOAD;
};
//# sourceMappingURL=worker-decoder-events.d.ts.map