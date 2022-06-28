export declare const SYNC_BYTE = 71;
export declare const STUFFING_BYTE = 255;
export declare const HEADER_LENGTH = 4;
export declare const PACKET_LENGTH = 188;
export declare const PCR_CYCLES: number;
export declare const HZ = 90000;
export declare const transport_error_indicator: (packet: Uint8Array) => boolean;
export declare const payload_unit_start_indicator: (packet: Uint8Array) => boolean;
export declare const transport_priority: (packet: Uint8Array) => boolean;
export declare const pid: (packet: Uint8Array) => number;
export declare const has_adaptation_field: (packet: Uint8Array) => boolean;
export declare const has_payload: (packet: Uint8Array) => boolean;
export declare const adaptation_field_length: (packet: Uint8Array) => number;
export declare const continuity_counter: (packet: Uint8Array) => number;
export declare const has_pcr: (packet: Uint8Array) => boolean;
export declare const pcr: (packet: Uint8Array) => number;
//# sourceMappingURL=packet.d.ts.map