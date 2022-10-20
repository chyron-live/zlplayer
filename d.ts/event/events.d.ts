/// <reference types="dom-webcodecs" />
export declare const EventTypes: {
    readonly H264_PARSED: "H264_PARSED";
    readonly AAC_PARSED: "AAC_PARSED";
    readonly ID3_PARSED: "ID3_PARSED";
    readonly ARIB_CAPTION_PARSED: "ARIB_CAPTION_PARSED";
    readonly MPEG2VIDEO_PARSED: "MPEG2VIDEO_PARSED";
    readonly H264_EMITTED: "H264_EMITTED";
    readonly AAC_EMITTED: "AAC_EMITTED";
    readonly MPEG2VIDEO_EMITTED: "MPEG2VIDEO_EMITTED";
    readonly VIDEO_FRAME_DECODED: "VIDEO_FRAME_DECODED";
    readonly AUDIO_FRAME_DECODED: "AUDIO_FRAME_DECODED";
    readonly VIDEO_DECODE_ERROR: "VIDEO_DECODE_ERROR";
    readonly AUDIO_DECODE_ERROR: "AUDIO_DECODE_ERROR";
};
export declare type H264_PARSED_PAYLOAD = {
    event: typeof EventTypes.H264_PARSED;
    initPTS: number;
    pts: number;
    dts: number;
    pts_timestamp: number;
    dts_timestamp: number;
    data: Uint8Array;
    has_IDR: boolean;
};
export declare type AAC_PARSED_PAYLOAD = {
    event: typeof EventTypes.AAC_PARSED;
    initPTS: number;
    pts: number;
    dts: number;
    pts_timestamp: number;
    dts_timestamp: number;
    data: Uint8Array;
};
export declare type ID3_PARSED_PAYLOAD = {
    event: typeof EventTypes.ID3_PARSED;
    initPTS: number;
    pts: number;
    dts: number;
    pts_timestamp: number;
    dts_timestamp: number;
    data: Uint8Array;
};
export declare type ARIB_CAPITON_PARSED_PAYLOAD = {
    event: typeof EventTypes.ARIB_CAPTION_PARSED;
    initPTS: number;
    pts: number;
    dts: number;
    pts_timestamp: number;
    dts_timestamp: number;
    data: Uint8Array;
};
export declare type MPEG2VIDEO_PARSED_PAYLOAD = {
    event: typeof EventTypes.MPEG2VIDEO_PARSED;
    initPTS: number;
    pts: number;
    dts: number;
    pts_timestamp: number;
    dts_timestamp: number;
    data: Uint8Array;
};
export declare type H264_EMITTED_PAYLOAD = {
    event: typeof EventTypes.H264_EMITTED;
    initPTS: number;
    pts: number;
    dts: number;
    pts_timestamp: number;
    dts_timestamp: number;
    data: Uint8Array;
    has_IDR: boolean;
};
export declare type AAC_EMITTED_PAYLOAD = {
    event: typeof EventTypes.AAC_EMITTED;
    initPTS: number;
    pts: number;
    dts: number;
    pts_timestamp: number;
    dts_timestamp: number;
    data: Uint8Array;
};
export declare type MPEG2VIDEO_EMITTED_PAYLOAD = {
    event: typeof EventTypes.MPEG2VIDEO_EMITTED;
    initPTS: number;
    pts: number;
    dts: number;
    pts_timestamp: number;
    dts_timestamp: number;
    data: Uint8Array;
};
export declare type VIDEO_FRAME_DECODED_PAYLOAD = {
    event: typeof EventTypes.VIDEO_FRAME_DECODED;
    frame: VideoFrame;
};
export declare type AUDIO_FRAME_DECODED_PAYLOAD = {
    event: typeof EventTypes.AUDIO_FRAME_DECODED;
    frame: AudioData;
};
export declare type VIDEO_DECODE_ERROR_PAYLOAD = {
    event: typeof EventTypes.VIDEO_DECODE_ERROR;
    error: unknown;
};
export declare type AUDIO_DECODE_ERROR_PAYLOAD = {
    event: typeof EventTypes.AUDIO_DECODE_ERROR;
    error: unknown;
};
export declare type Events = {
    [EventTypes.H264_PARSED]: H264_PARSED_PAYLOAD;
    [EventTypes.AAC_PARSED]: AAC_PARSED_PAYLOAD;
    [EventTypes.ID3_PARSED]: ID3_PARSED_PAYLOAD;
    [EventTypes.ARIB_CAPTION_PARSED]: ARIB_CAPITON_PARSED_PAYLOAD;
    [EventTypes.MPEG2VIDEO_PARSED]: MPEG2VIDEO_PARSED_PAYLOAD;
    [EventTypes.H264_EMITTED]: H264_EMITTED_PAYLOAD;
    [EventTypes.AAC_EMITTED]: AAC_EMITTED_PAYLOAD;
    [EventTypes.MPEG2VIDEO_EMITTED]: MPEG2VIDEO_EMITTED_PAYLOAD;
    [EventTypes.VIDEO_FRAME_DECODED]: VIDEO_FRAME_DECODED_PAYLOAD;
    [EventTypes.AUDIO_FRAME_DECODED]: AUDIO_FRAME_DECODED_PAYLOAD;
    [EventTypes.VIDEO_DECODE_ERROR]: VIDEO_DECODE_ERROR_PAYLOAD;
    [EventTypes.AUDIO_DECODE_ERROR]: AUDIO_DECODE_ERROR_PAYLOAD;
};
//# sourceMappingURL=events.d.ts.map