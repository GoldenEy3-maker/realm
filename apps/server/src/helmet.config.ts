import type { HelmetOptions } from "helmet";

export class HelmetConfig {
  public static getApiConfig(isProduction: boolean): HelmetOptions {
    return {
      ...this.getBaseConfig(isProduction),
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'none'"],
          scriptSrc: ["'none'"],
          styleSrc: ["'none'"],
          imgSrc: ["'none'"],
          connectSrc: ["'self'"], // Allow API calls to same origin
          fontSrc: ["'none'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'none'"],
          frameSrc: ["'none'"],
          ...(isProduction && { upgradeInsecureRequests: [] }),
        },
      },
    };
  }

  public static getDocsConfig(isProduction: boolean): HelmetOptions {
    return {
      ...this.getBaseConfig(isProduction),
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'", // Required for Scalar inline scripts
            "'unsafe-eval'", // Required for Scalar dynamic code
            "https://cdn.jsdelivr.net", // Scalar CDN
          ],
          styleSrc: [
            "'self'",
            "'unsafe-inline'", // Required for Scalar inline styles
            "https://cdn.jsdelivr.net", // Scalar CDN
            "https://fonts.googleapis.com", // Google Fonts
          ],
          fontSrc: [
            "'self'",
            "https://fonts.gstatic.com", // Google Fonts
            "https://cdn.jsdelivr.net", // Scalar CDN
          ],
          imgSrc: ["'self'", "data:", "https:"], // Allow images from any HTTPS source
          connectSrc: ["'self'", "https://cdn.jsdelivr.net"], // Allow fetching resources
          frameSrc: ["'self'"],
          objectSrc: ["'none'"],
          ...(isProduction && { upgradeInsecureRequests: [] }),
        },
      },
    };
  }

  public static getStaticConfig(isProduction: boolean): HelmetOptions {
    return {
      ...this.getBaseConfig(isProduction),
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles for flexibility
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          frameSrc: ["'self'"],
          ...(isProduction && { upgradeInsecureRequests: [] }),
        },
      },
    };
  }

  private static getBaseConfig(isProduction: boolean): HelmetOptions {
    return {
      hsts: isProduction
        ? {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
          }
        : false,
      crossOriginEmbedderPolicy: false,
    };
  }
}
