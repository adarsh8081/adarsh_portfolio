import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, pathname } = new URL(request.url);
  const route = pathname.split('/').pop();

  // Check if Auth0 is properly configured
  if (!process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_ISSUER_BASE_URL) {
    // Return a user-friendly error page instead of JSON
    const errorHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Auth0 Configuration Error</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .error { color: #e74c3c; font-size: 24px; margin-bottom: 20px; }
            .message { color: #333; margin-bottom: 20px; }
            .code { background: #f8f9fa; padding: 15px; border-radius: 4px; font-family: monospace; margin: 10px 0; }
            .step { margin: 15px 0; padding: 10px; background: #e8f4f8; border-left: 4px solid #3498db; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="error">⚠️ Auth0 Configuration Required</div>
            <div class="message">
              Your Auth0 environment variables are not configured. Please follow these steps:
            </div>
            <div class="step">
              <strong>Step 1:</strong> Create a <code>.env.local</code> file in the <code>web</code> directory
            </div>
            <div class="code">
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'<br>
AUTH0_BASE_URL='http://localhost:3000'<br>
AUTH0_ISSUER_BASE_URL='https://dev-bws5votbjb7vascb.us.auth0.com'<br>
AUTH0_CLIENT_ID='4XgINXkJwZ2EPtoXzfMlmP3fcm0jfyOq'<br>
AUTH0_CLIENT_SECRET='your-client-secret-here'<br>
AUTH0_AUDIENCE='your-api-identifier-here'
            </div>
            <div class="step">
              <strong>Step 2:</strong> Get your Auth0 Client Secret from the Auth0 Dashboard
            </div>
            <div class="step">
              <strong>Step 3:</strong> Configure your Auth0 Application settings:
              <ul>
                <li>Allowed Callback URLs: <code>http://localhost:3000/api/auth/callback</code></li>
                <li>Allowed Logout URLs: <code>http://localhost:3000</code></li>
                <li>Allowed Web Origins: <code>http://localhost:3000</code></li>
              </ul>
            </div>
            <div class="step">
              <strong>Step 4:</strong> Restart your development server after adding the environment variables
            </div>
          </div>
        </body>
      </html>
    `;
    return new NextResponse(errorHtml, {
      status: 500,
      headers: { 'Content-Type': 'text/html' }
    });
  }

  switch (route) {
    case 'login':
      // Redirect to Auth0 login
      const loginUrl = new URL(`${process.env.AUTH0_ISSUER_BASE_URL}/authorize`);
      loginUrl.searchParams.set('response_type', 'code');
      loginUrl.searchParams.set('client_id', process.env.AUTH0_CLIENT_ID);
      loginUrl.searchParams.set('redirect_uri', `${process.env.AUTH0_BASE_URL}/api/auth/callback`);
      loginUrl.searchParams.set('scope', 'openid profile email');
      // Only add audience if it's configured and not a placeholder
      if (process.env.AUTH0_AUDIENCE && !process.env.AUTH0_AUDIENCE.includes('example.com')) {
        loginUrl.searchParams.set('audience', process.env.AUTH0_AUDIENCE);
      }
      loginUrl.searchParams.set('state', 'login');
      
      return NextResponse.redirect(loginUrl.toString());

    case 'logout':
      // Redirect to Auth0 logout
      const logoutUrl = new URL(`${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout`);
      logoutUrl.searchParams.set('client_id', process.env.AUTH0_CLIENT_ID);
      logoutUrl.searchParams.set('returnTo', process.env.AUTH0_BASE_URL || 'http://localhost:3000');
      
      return NextResponse.redirect(logoutUrl.toString());

    case 'callback':
      // Handle Auth0 callback
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      
      if (error) {
        return NextResponse.json({ 
          error: 'Auth0 authorization failed', 
          details: error,
          description: searchParams.get('error_description') || 'Unknown error'
        }, { status: 400 });
      }
      
      if (!code) {
        return NextResponse.json({ error: 'No authorization code received' }, { status: 400 });
      }

      // For now, just redirect to home page
      // In a real implementation, you would exchange the code for tokens
      return NextResponse.redirect(new URL('/', request.url));

    case 'me':
      // Return user profile (placeholder)
      return NextResponse.json({ 
        message: 'User profile endpoint',
        note: 'This would return the current user profile in a real implementation'
      });

    default:
      return NextResponse.json({ error: 'Invalid route' }, { status: 404 });
  }
}
