import { EpointRequestBuilder } from "./builder/epoint_request_builder";
import { KeyPairOptions } from "./constants/key_pair_options";

export class EpointInstance {
    constructor(private keyPairOptions: KeyPairOptions) {}

    beginCommand() {
        return new EpointRequestBuilder(this.keyPairOptions);
    }
}
