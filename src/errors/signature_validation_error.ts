export class SignatureValidationError extends Error {
    constructor() {
        super("Signature is not correct");
    }
}
