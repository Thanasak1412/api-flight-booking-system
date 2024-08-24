import fs from 'fs';
import { type HelmetOptions } from 'helmet';
import rateLimit from 'express-rate-limit';

// Load the self-signed certificate and key
const certOptions = {
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.crt'),
};

// helmet options
const helmetOptions: Readonly<HelmetOptions> = {
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      'default-src': ["'self'"],
      'script-src': ["'self'"],
      'style-src': ["'self'", 'https:'],
    },
  },
  frameguard: {
    action: 'deny', // Prevent clickjacking by denying iframes
  },
  xssFilter: true, // Enable XSS filter in browser
};

// Rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMS
});

export { certOptions, helmetOptions, limiter };
