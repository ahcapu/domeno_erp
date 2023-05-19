import { sign, verify } from "jsonwebtoken";
import { setApiKey, send } from "@sendgrid/mail";
import ejs from "ejs";


export const domenoBackofficeJwt = (id: number) => {
  console.log(id);
  
  return sign({ id }, process.env.JWT_SECRET as any, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

// export const signJwtSubscriber = (id: number, subscriber: number) => {
//   return sign({ id, subscriber }, process.env.JWT_SECRET as any, {
//     expiresIn: process.env.JWT_EXPIRY,
//   });
// };

export const tokenVerification = async (token: string) => {
  return await verify(token, process.env.JWT_SECRET as any);
};

export const domenoBackofficeVerification = async (token: string) => {
  return await verify(token, process.env.JWT_SECRET as any);
};

// setApiKey(process.env.SEND_GRID_API as any);

export const sendEmailWithSendGrid = async (
  to: any,
  subject: any,
  text: any
) => {
  setApiKey(process.env.SEND_GRID_API as any);
  const msg: any = { to, from: process.env.EMAIL_FROM, subject, html: text };
  send(msg, false, (error: any, result: any) => {
    if (error) {
      console.log(error);
    }
  });
};
