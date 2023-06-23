import axios from "axios";
import { EpointRequest } from "../entities/epoint_request";
import { NetworkError } from "../errors/network_error";
import { KeyPairOptions } from "../constants/key_pair_options";
import { Languages } from "../constants/languages";
import { EpointRequestBuilder } from "../builder/epoint_request_builder";

export class EpointPayment {
    constructor(private readonly keyPairOptions: KeyPairOptions) {}

    async generatePaymentUrlWithTypingCard(
        amount: number,
        currency: "AZN",
        language: Languages,
        orderId: string,
        description: string,
        successRedirectUrl: string,
        errorRedirectUrl: string
    ) {
        const body = {
            public_key: this.keyPairOptions.public_key,
            language: language,
            amount: amount,
            currency: currency,
            order_id: orderId,
            description: description,
            success_redirect_url: successRedirectUrl,
            error_redirect_url: errorRedirectUrl,
        };

        const epointRequest = new EpointRequestBuilder(this.keyPairOptions)
            .sign(body)
            .isSignatureValid()
            .build();

        const { data, signature } = epointRequest;

        try {
            const response = await axios.post(
                "https://epoint.az/api/1/request",
                {
                    data,
                    signature,
                }
            );
            return response;
        } catch (error) {
            throw new NetworkError(error);
        }
    }

    async getStatus({
        orderId,
        transaction,
    }: {
        orderId?: string;
        transaction?: string;
    }) {
        const body = {
            public_key: this.keyPairOptions.public_key,
            order_id: orderId,
            transaction,
        };

        const epointRequest = new EpointRequestBuilder(this.keyPairOptions)
            .sign(body)
            .isSignatureValid()
            .build();

        const { data, signature } = epointRequest;

        try {
            const response = await axios.post(
                "https://epoint.az/api/1/get-status",
                { data, signature }
            );
            return response;
        } catch (error) {
            throw new NetworkError(error);
        }
    }

    async registerCardForPayment(
        language: Languages,
        description: string,
        successRedirectUrl: string,
        errorRedirectUrl: string
    ) {
        const body = {
            public_key: this.keyPairOptions.public_key,
            language: language,
            refund: 0,
            description: description,
            success_redirect_url: successRedirectUrl,
            error_redirect_url: errorRedirectUrl,
        };

        const epointRequest = new EpointRequestBuilder(this.keyPairOptions)
            .sign(body)
            .isSignatureValid()
            .build();

        const { data, signature } = epointRequest;

        try {
            const response = await axios.post(
                "https://epoint.az/api/1/card-registration",
                { data, signature }
            );
            return response;
        } catch (error) {
            throw new NetworkError(error);
        }
    }

    async registerCardForRefund(
        language: Languages,
        description: string,
        successRedirectUrl: string,
        errorRedirectUrl: string
    ) {
        const body = {
            public_key: this.keyPairOptions.public_key,
            language: language,
            refund: 1,
            description: description,
            success_redirect_url: successRedirectUrl,
            error_redirect_url: errorRedirectUrl,
        };

        const epointRequest = new EpointRequestBuilder(this.keyPairOptions)
            .sign(body)
            .isSignatureValid()
            .build();

        const { data, signature } = epointRequest;

        try {
            const response = await axios.post(
                "https://epoint.az/api/1/card-registration",
                { data, signature }
            );
            return response;
        } catch (error) {
            throw new NetworkError(error);
        }
    }
}
