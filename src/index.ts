import { EpointRequestBuilder } from "./builder/epoint_request_builder";

const a = new EpointRequestBuilder({ private_key: "1", public_key: "2" });
a.sign("hey").isSignatureValid().build()
