"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandling = void 0;
class ErrorHandling {
}
_a = ErrorHandling;
ErrorHandling.modeHandling = async (error) => {
    if (process.env.MODE === "production") {
        return "Something went wrong. Please wait a short while and try again. If problem persists then contact to support team.";
    }
    else if (process.env.MODE === "development") {
        return { error };
    }
};
exports.ErrorHandling = ErrorHandling;
