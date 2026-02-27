import swaggerJsdoc from "swagger-jsdoc";

const isProduction = process.env.NODE_ENV === "production";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Booking System API",
      version: "1.0.0",
      description: "API documentation for Booking System",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
      {
        url: "https://booking-system-mocha.vercel.app/api",
      },
    ],

    components: {
      securitySchemes: {
        UserIdAuth: {
          type: "apiKey",
          in: "header",
          name: "x-user-id",
        },
      },
    },
  },
  apis: isProduction
    ? ["./dist/routes/*.js"] // Production: compiled JS files
    : ["./src/routes/*.ts"], // Development: TypeScript files
};

export const swaggerSpec = swaggerJsdoc(options);
