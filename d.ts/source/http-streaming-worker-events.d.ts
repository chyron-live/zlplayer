import { LoadOption } from "./source";
export declare const EventTypes: {
    readonly LOAD_REQUEST: "LOAD_REQUEST";
    readonly LOAD_ABORTED: "LOAD_ABORTED";
    readonly LOAD_SUCCEEDED: "LOAD_SUCCEEDED";
    readonly LOAD_FAILED: "LOAD_FAILED";
    readonly DATA_ARRIVED: "DATA_ARRIVED";
};
export declare type LOAD_REQUEST_PAYLOAD = {
    event: typeof EventTypes.LOAD_REQUEST;
    url: string;
    options?: LoadOption;
};
export declare type LOAD_SUCCEEDED_PAYLOAD = {
    event: typeof EventTypes.LOAD_SUCCEEDED;
};
export declare type LOAD_FAILED_PAYLOAD = {
    event: typeof EventTypes.LOAD_FAILED;
};
export declare type LOAD_ABORTED_PAYLOAD = {
    event: typeof EventTypes.LOAD_ABORTED;
};
export declare type DATA_ARRIVED_PAYLOAD = {
    event: typeof EventTypes.DATA_ARRIVED;
    data: Uint8Array;
};
export declare type Events = {
    [EventTypes.LOAD_REQUEST]: LOAD_REQUEST_PAYLOAD;
    [EventTypes.LOAD_ABORTED]: LOAD_ABORTED_PAYLOAD;
    [EventTypes.LOAD_SUCCEEDED]: LOAD_SUCCEEDED_PAYLOAD;
    [EventTypes.LOAD_FAILED]: LOAD_FAILED_PAYLOAD;
    [EventTypes.DATA_ARRIVED]: DATA_ARRIVED_PAYLOAD;
};
//# sourceMappingURL=http-streaming-worker-events.d.ts.map