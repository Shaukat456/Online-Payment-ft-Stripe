import { Request, Response } from "express";

export function handleErrorResponse(res: Response, error: Error) {
  const errorMessage =
    error instanceof Error ? error.message : "An error occurred";

  console.log(errorMessage);

  res.status(500).json({
    msg: errorMessage,
    data: {},
  });
}
