import { Request, Response, NextFunction } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { config } from '../config/env';
import { logger } from '../utils/logger';

// Configure Auth0 middleware
const checkJwt = auth({
  audience: config.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${config.AUTH0_DOMAIN}`,
  tokenSigningAlg: 'RS256'
});

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: string;
        permissions?: string[];
      };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await checkJwt(req, res, (err: any) => {
      if (err) {
        logger.error('Authentication error:', err);
        return res.status(401).json({ message: 'Unauthorized' });
      }
      next();
    });
  } catch (error) {
    logger.error('Auth middleware error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}; 