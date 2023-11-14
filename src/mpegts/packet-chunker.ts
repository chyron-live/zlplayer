import {
  SYNC_BYTE,
  PACKET_LENGTH
} from './packet'

export default class PacketChunker {
  private inputReader: ReadableStreamDefaultReader<Uint8Array>;
  private restBytes: Uint8Array;
  private outputStream: ReadableStream<Uint8Array>;
  private outputController: ReadableStreamController<Uint8Array> | null = null;

  public constructor (reader: ReadableStream<Uint8Array>) {
    this.inputReader = reader.getReader();
    this.restBytes = Uint8Array.from([]);

    const global = this;
    this.outputStream = new ReadableStream<Uint8Array>({
      start (controller) {
        global.outputController = controller;
      }
    })
    this.pump();
  }

  static isSupported () {
    return !!(self.ReadableStream);
  }

  public getStream(): ReadableStream<Uint8Array> {
    return this.outputStream;
  }

  public abort() {
    try {
      this.inputReader?.cancel();
    } catch (e: unknown) {}
    try {
      if (!this.outputStream.locked){
        this.outputStream?.cancel();
      }

      const global = this;
      this.outputStream = new ReadableStream<Uint8Array>({
        start (controller) {
          global.outputController = controller;
        }
      });
    } catch (e: unknown) {}
  }

  private pump(): void {
    this.inputReader.read().then(({ value, done }) => {
      if (done) {
        return;
      } else if (!this.outputController) {
        return;
      }

      const append = value ?? [];
      const chunk = new Uint8Array(this.restBytes.byteLength + append.byteLength);
      chunk.set(this.restBytes, 0);
      chunk.set(append, this.restBytes.byteLength);

      let lastPosition: number | null = null;
      for (let i = 0; i < chunk.length; i++) {
        if (chunk[i] === SYNC_BYTE) {
          if (i + PACKET_LENGTH > chunk.length) {
            lastPosition = i;
            break;
          } else {
            lastPosition = i + PACKET_LENGTH;
            this.outputController.enqueue(chunk.subarray(i, i + PACKET_LENGTH));
            i += PACKET_LENGTH - 1;
          }
        }
      }

      if (lastPosition != null) {
        this.restBytes = chunk.subarray(lastPosition);
      } else {
        this.restBytes = Uint8Array.from([]);
      }

      return this.pump();
    })
  }
};
