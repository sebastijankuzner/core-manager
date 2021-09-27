"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseProcessActionResponse = void 0;
exports.parseProcessActionResponse = (response) => {
    const responseLines = response.stdout.split("\n");
    if (responseLines.length >= 2) {
        const response = responseLines[1].substring(responseLines[1].indexOf("=") + 1);
        const parsedResponse = JSON.parse(response);
        if (!parsedResponse.response && !parsedResponse.error) {
            throw new Error("Invalid process action response");
        }
        return parsedResponse;
    }
    throw new Error("Cannot parse process action response");
};
//# sourceMappingURL=process-actions.js.map