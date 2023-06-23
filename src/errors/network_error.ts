export class NetworkError extends Error {
    constructor(error: any) {
        super("Network Error: " + error);
    }
}
