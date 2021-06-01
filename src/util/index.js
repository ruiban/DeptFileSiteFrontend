export function easyClone(obj) {
    if (obj === undefined) {
        obj = null
    }
    return JSON.parse(JSON.stringify(obj))
}