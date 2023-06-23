import { KeyPairOptions } from "../constants/key_pair_options";
import { Languages } from "../constants/languages";

export class EpointRequest {
    constructor(
        private readonly _signature: string,
        private readonly _data: string,
        private readonly keyPairOptions: KeyPairOptions
    ) {}

    public get data(): string {
        return this._data;
    }

    public get signature(): string {
        return this._signature;
    }

    public get keyPair(): KeyPairOptions {
        return this.keyPairOptions;
    }
}
