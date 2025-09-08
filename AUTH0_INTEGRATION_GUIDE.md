# Auth0 Integration Guide

## Overview
This guide explains how to integrate Auth0 authentication with your portfolio project.

## Configuration Steps

### 1. Environment Variables

Create a `.env.local` file in the `web` directory with the following variables:

```env
# Auth0 Configuration
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://dev-bws5votbjb7vascb.us.auth0.com'
AUTH0_CLIENT_ID='4XgINXkJwZ2EPtoXzfMlmP3fcm0jfyOq'
AUTH0_CLIENT_SECRET='your-client-secret-here'
AUTH0_AUDIENCE='your-api-identifier-here'
```

### 2. Server Environment Variables

Add these to your server's environment variables:

```env
# Auth0 Configuration
AUTH0_DOMAIN="dev-bws5votbjb7vascb.us.auth0.com"
AUTH0_AUDIENCE="your-api-identifier"
AUTH0_CLIENT_ID="4XgINXkJwZ2EPtoXzfMlmP3fcm0jfyOq"
AUTH0_CLIENT_SECRET="your-client-secret-here"
```

### 3. Auth0 Dashboard Configuration

In your Auth0 dashboard, configure the following:

#### Application Settings:
- **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback`
- **Allowed Logout URLs**: `http://localhost:3000`
- **Allowed Web Origins**: `http://localhost:3000`

#### API Settings:
- Create an API with identifier matching your `AUTH0_AUDIENCE`
- Enable RBAC (Role-Based Access Control) if needed

### 4. User Roles (Optional)

To use role-based access control, add custom claims to your Auth0 rules:

```javascript
// Auth0 Rule: Add roles to token
function addRolesToToken(user, context, callback) {
  const namespace = 'https://your-domain.com/';
  context.idToken[namespace + 'roles'] = user.app_metadata.roles || ['user'];
  context.accessToken[namespace + 'roles'] = user.app_metadata.roles || ['user'];
  callback(null, user, context);
}
```

## Features Implemented

### Frontend (Next.js)
- ✅ Auth0 Provider integration
- ✅ Login/Logout functionality
- ✅ User context management
- ✅ Admin authentication with Auth0

### Backend (Express)
- ✅ Auth0 token verification middleware
- ✅ Role-based access control
- ✅ JWT verification using Auth0 public keys

## Usage

### Frontend
```tsx
import { useUser } from '@auth0/nextjs-auth0/client';

function MyComponent() {
  const { user, error, isLoading } = useUser();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>Not logged in</div>;
  
  return <div>Hello {user.name}!</div>;
}
```

### Backend
```typescript
import { authenticateAuth0Token, requireRole } from './middleware/auth0';

// Protect a route
app.get('/api/protected', authenticateAuth0Token, (req, res) => {
  res.json({ user: req.user });
});

// Require specific role
app.get('/api/admin', authenticateAuth0Token, requireRole(['admin']), (req, res) => {
  res.json({ message: 'Admin access granted' });
});
```

## Migration from JWT

The old JWT authentication system has been replaced with Auth0. The following changes were made:

1. **AuthProvider**: Updated to use Auth0 instead of custom JWT
2. **Login Form**: Simplified to use Auth0 login flow
3. **Server Middleware**: Added Auth0 token verification
4. **User Interface**: Updated to work with Auth0 user object

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `/admin` to test the login flow
3. Check the browser console for any Auth0-related errors
4. Verify that user information is displayed correctly after login

## Troubleshooting

### Common Issues:

1. **"Invalid audience" error**: Check that your `AUTH0_AUDIENCE` matches your API identifier
2. **"Invalid issuer" error**: Verify your `AUTH0_ISSUER_BASE_URL` is correct
3. **CORS errors**: Ensure your Auth0 application settings include the correct URLs
4. **Token verification fails**: Check that your server has the correct Auth0 domain and audience

### Debug Mode:
Enable debug logging by adding `DEBUG=auth0:*` to your environment variables.
