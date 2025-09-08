import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

// Auth0 configuration
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || 'dev-bws5votbjb7vascb.us.auth0.com';
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || 'your-api-identifier';

// JWKS client for token verification
const client = jwksClient({
  jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  cache: true,
  cacheMaxAge: 86400000, // 24 hours
});

interface Auth0User {
  sub: string;
  email: string;
  name: string;
  picture?: string;
  'https://your-domain.com/roles'?: string[];
}

interface AuthRequest extends Request {
  user?: Auth0User;
}

export const authenticateAuth0Token = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    // Get the signing key
    const getKey = (header: any, callback: any) => {
      client.getSigningKey(header.kid, (err, key) => {
        if (err) {
          callback(err);
          return;
        }
        const signingKey = key?.getPublicKey();
        callback(null, signingKey);
      });
    };

    // Verify the token
    const decoded = jwt.verify(token, getKey, {
      audience: AUTH0_AUDIENCE,
      issuer: `https://${AUTH0_DOMAIN}/`,
      algorithms: ['RS256']
    }) as Auth0User;

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth0 token verification failed:', error);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const userRoles = req.user['https://your-domain.com/roles'] || ['user'];
    const hasRequiredRole = roles.some(role => userRoles.includes(role));

    if (!hasRequiredRole) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    next();
  };
};
