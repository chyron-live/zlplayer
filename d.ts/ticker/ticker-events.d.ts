export declare const EventTypes: {
    readonly TICKER_START: "TICKER_START";
    readonly TICKER_TICK: "TICKER_TICK";
    readonly TICKER_STOP: "TICKER_STOP";
};
export declare type TICKER_START_PAYLOAD = {
    event: typeof EventTypes.TICKER_START;
    time: number;
};
export declare type TICKER_TICK_PAYLOAD = {
    event: typeof EventTypes.TICKER_TICK;
};
export declare type TICKER_STOP_PAYLOAD = {
    event: typeof EventTypes.TICKER_STOP;
};
export declare type Events = {
    [EventTypes.TICKER_START]: TICKER_START_PAYLOAD;
    [EventTypes.TICKER_TICK]: TICKER_TICK_PAYLOAD;
    [EventTypes.TICKER_STOP]: TICKER_STOP_PAYLOAD;
};
//# sourceMappingURL=ticker-events.d.ts.map