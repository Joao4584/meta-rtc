interface RouteErrorProps{
  status: string,
  message: string,
  statusCode: number
}
export class RouteError extends Error {
  status: string;
  statusCode: number;
  message: string;

  constructor({status, message, statusCode}: RouteErrorProps) {
    super(message);
    this.status = status;
    this.message = message;
    this.statusCode = statusCode;
  }
}
