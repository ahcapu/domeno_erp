export class ErrorHandling {
  static modeHandling = async (error: any) => {
    if (process.env.MODE === "production") {
      return "Something went wrong. Please wait a short while and try again. If problem persists then contact to support team.";
    } else if (process.env.MODE === "development") {
      return { error };
    }
  };
}
