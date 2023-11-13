export const SYNC_BYTE = 0x47;
export const STUFFING_BYTE = 0xFF;
export const HEADER_LENGTH = 4;
export const PACKET_LENGTH = 188;
export const PCR_CYCLES = 2 ** 33;
export const HZ = 90000;

export const transport_error_indicator = (packet: Uint8Array): boolean => {
  return (packet[1] & 0x80) !== 0;
};
export const payload_unit_start_indicator = (packet: Uint8Array): boolean  => {
  return (packet[1] & 0x40) !== 0;
};
export const transport_priority = (packet: Uint8Array): boolean => {
  return (packet[1] & 0x20) !== 0;
};
export const pid = (packet: Uint8Array): number => {
  return ((packet[1] & 0x1F) << 8) | packet[2];
};
export const has_adaptation_field = (packet: Uint8Array): boolean => {
  return (packet[3] & 0x20) !== 0
};
export const has_payload = (packet: Uint8Array): boolean => {
  return (packet[3] & 0x10) !== 0
};
export const adaptation_field_length = (packet: Uint8Array): number => {
  if (has_adaptation_field(packet)) {
    return packet[4]
  } else {
    return 0;
  }
};
export const continuity_counter = (packet: Uint8Array): number => {
  return packet[3] & 0x0F;
};
export const has_pcr = (packet: Uint8Array): boolean => {
  if (!has_adaptation_field(packet)) { return false; }
  if (adaptation_field_length(packet) === 0) { return false; }
  return (packet[5] & 0x10) !== 0;
}

const value1To1 = 1 << 1;
const value1To8 = 1 << 8;

const header1 = HEADER_LENGTH + 1 + 1;
const header2 = HEADER_LENGTH + 1 + 2;
const header3 = HEADER_LENGTH + 1 + 3;
const header4 = HEADER_LENGTH + 1 + 4;
const header5 = HEADER_LENGTH + 1 + 5;

export const pcr = (packet: Uint8Array): number => {
  let pcr_base = 0;
  pcr_base = (pcr_base * value1To8) + ((packet[header1] & 0xFF) >> 0);
  pcr_base = (pcr_base * value1To8) + ((packet[header2] & 0xFF) >> 0);
  pcr_base = (pcr_base * value1To8) + ((packet[header3] & 0xFF) >> 0);
  pcr_base = (pcr_base * value1To8) + ((packet[header4] & 0xFF) >> 0);
  pcr_base = (pcr_base * value1To1) + ((packet[header5] & 0x80) >> 7);

  return pcr_base;
}