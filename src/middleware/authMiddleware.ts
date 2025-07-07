import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { config } from "../config/env";
import { logger } from "../utils/logger";

const checkJwt = auth({
  audience: config.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${config.AUTH0_DOMAIN}`,
  tokenSigningAlg: "RS256",
});

// Express typing override
declare global {
  namespace Express {
    interface Request {
      auth?: {
        payload: {
          sub: string;
          permissions?: string[];
        };
      };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("🔥 Incoming request to protected route");
  console.log("🧾 Headers:", req.headers);

  try {
    await checkJwt(req, res, (err: any) => {
      if (err) {
        console.error("🛑 Auth0 middleware error:", err.message || err);
        return res.status(401).json({ message: "Unauthorized" });
      }

      console.log("✅ Auth success! User:", req.auth?.payload);
      next();
    });
  } catch (error) {
    console.error("🔥 Catch block error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
