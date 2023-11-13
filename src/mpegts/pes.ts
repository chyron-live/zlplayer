export const PES_HEADER_SIZE = 6;

export const packet_start_code_prefix = (pes: Uint8Array): number => {
  return ((pes[0]) << 16) | ((pes[1]) << 8) | (pes[2]);
}

export const PES_packet_length = (pes: Uint8Array, offset: number): number => {
  return ((pes[offset + 4]) << 8) | (pes[offset + 5])
}

const optionalPesHeaderIds: boolean[] = new Array(256).fill(true);
optionalPesHeaderIds[0b10111100] = false;
optionalPesHeaderIds[0b10111111] = false;
optionalPesHeaderIds[0b11110000] = false;
optionalPesHeaderIds[0b11110001] = false;
optionalPesHeaderIds[0b11110010] = false;
optionalPesHeaderIds[0b11111000] = false;
optionalPesHeaderIds[0b11111111] = false;
optionalPesHeaderIds[0b10111110] = false;

export const has_optional_pes_header = (pes: Uint8Array): boolean => {
  // pes[3] - stream Id
  return optionalPesHeaderIds[pes[3]];
}

export const has_pts = (pes: Uint8Array): boolean => {
  return has_optional_pes_header(pes) && (pes[PES_HEADER_SIZE + 1] & 0x80) !== 0;
}

export const has_dts = (pes: Uint8Array): boolean => {
  return has_optional_pes_header(pes) && (pes[PES_HEADER_SIZE + 1] & 0x40) !== 0;
}

export const optional_pes_header_length = (pes: Uint8Array): number => {
  return pes[PES_HEADER_SIZE + 2];
}

const value1to3 = 1 << 3;
const value1to7 = 1 << 7;
const value1to8 = 1 << 8;

const Header0 = PES_HEADER_SIZE + 3 + 0;
const Header1 = PES_HEADER_SIZE + 3 + 1;
const Header2 = PES_HEADER_SIZE + 3 + 2;
const Header3 = PES_HEADER_SIZE + 3 + 3;
const Header4 = PES_HEADER_SIZE + 3 + 4;

export const pts = (pes: Uint8Array): number | null => {
  if (!has_pts(pes)) {
    return Number.NaN;
  }

  let value = 0;
  value *= value1to3; value += ((pes[Header0] & 0x0E) >> 1);
  value *= value1to8; value += ((pes[Header1] & 0xFF) >> 0);
  value *= value1to7; value += ((pes[Header2] & 0xFE) >> 1);
  value *= value1to8; value += ((pes[Header3] & 0xFF) >> 0);
  value *= value1to7; value += ((pes[Header4] & 0xFE) >> 1);

  return value;
}

const Header5 = PES_HEADER_SIZE + 3 + 5;
const Header6 = PES_HEADER_SIZE + 3 + 6;
const Header7 = PES_HEADER_SIZE + 3 + 7;
const Header8 = PES_HEADER_SIZE + 3 + 8;
const Header9 = PES_HEADER_SIZE + 3 + 9;

export const dts = (pes: Uint8Array): number => {
  let value = 0;
  value *= value1to3; value += ((pes[Header5] & 0x0E) >> 1);
  value *= value1to8; value += ((pes[Header6] & 0xFF) >> 0);
  value *= value1to7; value += ((pes[Header7] & 0xFE) >> 1);
  value *= value1to8; value += ((pes[Header8] & 0xFF) >> 0);
  value *= value1to7; value += ((pes[Header9] & 0xFE) >> 1);

  return value;
}

export const PES_packet_data = (pes: Uint8Array) => {
  if (has_optional_pes_header(pes)) {
    return pes.subarray(PES_HEADER_SIZE + 3 + optional_pes_header_length(pes));
  } else {
    return pes.subarray(PES_HEADER_SIZE);
  }
}