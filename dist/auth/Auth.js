"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailWithSendGrid = exports.domenoBackofficeVerification = exports.tokenVerification = exports.domenoBackofficeJwt = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const mail_1 = require("@sendgrid/mail");
const domenoBackofficeJwt = (id) => {
    console.log(id);
    return (0, jsonwebtoken_1.sign)({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });
};
exports.domenoBackofficeJwt = domenoBackofficeJwt;
// export const signJwtSubscriber = (id: number, subscriber: number) => {
//   return sign({ id, subscriber }, process.env.JWT_SECRET as any, {
//     expiresIn: process.env.JWT_EXPIRY,
//   });
// };
const tokenVerification = async (token) => {
    return await (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
};
exports.tokenVerification = tokenVerification;
const domenoBackofficeVerification = async (token) => {
    return await (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
};
exports.domenoBackofficeVerification = domenoBackofficeVerification;
// setApiKey(process.env.SEND_GRID_API as any);
const sendEmailWithSendGrid = async (to, subject, text) => {
    (0, mail_1.setApiKey)(process.env.SEND_GRID_API);
    const msg = { to, from: process.env.EMAIL_FROM, subject, html: text };
    (0, mail_1.send)(msg, false, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
};
exports.sendEmailWithSendGrid = sendEmailWithSendGrid;
