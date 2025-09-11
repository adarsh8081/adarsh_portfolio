import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
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

// Auth0 user interface extending JwtPayload for type safety
interface Auth0User extends JwtPayload {
  sub: string;
  email?: string;
  name?: string;
  picture?: string;
  'https://your-domain.com/roles'?: string[];
  // Add other Auth0 fields you expect
  aud?: string | string[];
  iss?: string;
  exp?: number;
  iat?: number;
}

interface AuthRequest extends Request {
  user?: Auth0User;
}

// Type guard to check if the decoded token is a valid Auth0User
function isAuth0User(decoded: string | JwtPayload): decoded is Auth0User {
  return typeof decoded === 'object' && decoded !== null && 'sub' in decoded;
}

// Promisified version of jwt.verify for cleaner async handling
function verifyTokenAsync(token: string, secretOrKey: jwt.Secret | jwt.GetPublicKeyOrSecret, options: jwt.VerifyOptions): Promise<string | JwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretOrKey, options, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as string | JwtPayload);
      }
    });
  });
}

// Promisified version of getSigningKey
function getSigningKeyAsync(kid: string): Promise<string> {
  return new Promise((resolve, reject) => {
    client.getSigningKey(kid, (err, key) => {
      if (err) {
        reject(err);
      } else {
        const signingKey = key?.getPublicKey();
        if (!signingKey) {
          reject(new Error('No signing key found'));
        } else {
          resolve(signingKey);
        }
      }
    });
  });
}

export const authenticateAuth0Token = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    // Decode the token header to get the key ID (kid)
    const decodedHeader = jwt.decode(token, { complete: true });
    if (!decodedHeader || !decodedHeader.header.kid) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    // Get the signing key
    const signingKey = await getSigningKeyAsync(decodedHeader.header.kid);

    // Verify the token
    const decoded = await verifyTokenAsync(token, signingKey, {
      audience: AUTH0_AUDIENCE,
      issuer: `https://${AUTH0_DOMAIN}/`,
      algorithms: ['RS256']
    });

    // Type guard to ensure we have a valid Auth0User object
    if (!isAuth0User(decoded)) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

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
