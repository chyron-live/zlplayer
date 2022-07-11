export declare const BASIC_HEADER_SIZE = 3;
export declare const EXTENDED_HEADER_SIZE = 8;
export declare const CRC_SIZE = 4;
export declare const table_id: (section: Uint8Array) => number;
export declare const section_length: (section: Uint8Array) => number;
export declare const table_id_extension: (section: Uint8Array) => number;
export declare const version_number: (section: Uint8Array) => number;
export declare const current_next_indicator: (section: Uint8Array) => boolean;
export declare const section_number: (section: Uint8Array) => number;
export declare const last_section_number: (section: Uint8Array) => number;
export declare const CRC32: (section: Uint8Array) => number;
//# sourceMappingURL=section.d.ts.map