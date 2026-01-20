import { HttpException } from "./http-exception";

export class BadRequestException extends HttpException {
  constructor(
    public description: string,
    public name: string
  ) {
    super(400, description, name)
  }
}