import { HttpException } from "./http-exception";

export class RequiredActionException extends HttpException {
  constructor(
    public actions: string[],
    public description: string,
    public name: string
  ) {
    super(409, description, name);
  }
}