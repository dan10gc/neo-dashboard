import type { NextFunction, Request, Response } from "express";
import { ForbiddenError, UnauthorizedError } from "../utils/errors.js";
import { Octokit } from "@octokit/rest";
import { env } from "../config.js";
import logger from "../utils/logger.js";

export async function requireGitHubAuth(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  // extract token from Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Missing or invalid Authorization header");
  }
  const githubToken = authHeader.substring(7);

  const octokit = new Octokit({
    auth: githubToken,
  });
  const { data: user } = await octokit.users.getAuthenticated();

  if (user.login !== env.AUTH.GITHUB_ALLOWED_USER) {
    throw new ForbiddenError("User is not authorized to access this resource");
  }

  logger.info("User authenticated successfully", {
    user: user.login,
    method: req.method,
    path: req.path,
  });

  // TODO: attach user info to req object if needed
  // req.user = {
  //   login: user.login,
  //   id: user.id,
  //   name: user.name,
  //   email: user.email,
  // };
  next();
}
