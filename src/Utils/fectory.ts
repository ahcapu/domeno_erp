import { validate } from "class-validator";
export class DomenosUtils {
  static validator = async (dto: any) => {
    const errors = await validate(dto);

    if (errors.length) {
      for (let i = 0; i < errors.length; i++) {
        const element = errors[i];

        return element.constraints;
      }
    }
  };

  static parentQuery = async (Model: any, value: number) => {
    return await Model.findOne({ where: { value } });
  };

  static bodyValidate = (body: any) => {
    if (body) {
      Object.keys(body).forEach((key) => {
        if (
          body[key] === "" ||
          body[key] === null ||
          body[key] === undefined ||
          body[key] === "Invalid date"
        ) {
          body[key] = null;
        }
      });
    }
  };
}
