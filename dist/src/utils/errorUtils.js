export function testError(error) {
    return error.type !== undefined;
}
export function statusCodeFromErrors(type) {
    if (type === "wrong_schema")
        return 422;
    if (type === "conflict")
        return 409;
    if (type === "unauthorized")
        return 401;
    if (type === "not_found")
        return 404;
    return 400;
}
export function failSchema(message) {
    return { type: "wrong_schema", message: message };
}
export function failsConflict(message) {
    return { type: "conflict", message: message };
}
export function failUnauth(message) {
    return { type: "unauthorized", message: message };
}
export function failNotFound(message) {
    return { type: "not_found", message: message };
}
