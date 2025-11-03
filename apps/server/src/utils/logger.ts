import type { Request, Response, NextFunction } from "express";

export function middlewareLogResponses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = Date.now();
  // Log when request starts
  console.log(`→ ${req.method} ${req.path}`);
  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const statusEmoji = status >= 500 ? '❌' : status >= 400 ? '⚠️' : '✅';
    
    console.log(`${statusEmoji} ${req.method} ${req.path} ${status} - ${duration}ms`)
    // Log only non-ok responses
    // if (res.statusCode >= 300) {
    //   console.log(
    //     `[NON-OK] ${req.method} ${req.url} - Status: ${res.statusCode}`
    //   );
    // }
  });
  next();
}
