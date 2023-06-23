import { KeyPairOptions } from "../constants/key_pair_options";
import { Languages } from "../constants/languages";
import { EpointRequest } from "../entities/epoint_request";
import { SignatureValidationError } from "../errors/signature_validation_error";
import { sha1 } from "../hash/sha1";

export class EpointRequestBuilder {
    constructor(private keyPairOptions: KeyPairOptions) {}

    private _signature = "";
    private _data = "";

    sign(data: any) {
        this._data = btoa(JSON.stringify(data));
        this._signature = btoa(
            sha1(
                `${this.keyPairOptions.private_key}${this._data}${this.keyPairOptions.private_key}`
            )
        );
        return this;
    }

    private createSignatureByData() {
        return btoa(
            sha1(
                `${this.keyPairOptions.private_key}${this._data}${this.keyPairOptions.private_key}`
            )
        );
    }

    isSignatureValid() {
        if (this._signature === this.createSignatureByData()) return this;
        throw new SignatureValidationError();
    }

    build() {
        return new EpointRequest(
            this._signature,
            this._data,
            this.keyPairOptions
        );
    }
}
