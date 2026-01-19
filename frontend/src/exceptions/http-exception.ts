export class HttpException extends Error {
  constructor(
    public code: number,
    public description: string,
    public name: string
  ) {
    super(description ?? `HTTP Error ${code}`);
  }
}