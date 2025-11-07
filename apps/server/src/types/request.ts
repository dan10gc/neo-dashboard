import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    login: string;
    id: number;
  };
}