import crypto from "crypto"

export function sha1(input: string) {
    return crypto.createHash('sha1').update(JSON.stringify(input)).digest('base64')
}