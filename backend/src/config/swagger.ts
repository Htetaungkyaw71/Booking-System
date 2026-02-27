// import swaggerJsdoc from "swagger-jsdoc";

// const isProduction = process.env.NODE_ENV === "production";

// const options: swaggerJsdoc.Options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Booking System API",
//       version: "1.0.0",
//       description: "API documentation for Booking System",
//     },
//     servers: [
//       {
//         url: "http://localhost:3000/api",
//       },
//       {
//         url: "https://booking-system-mocha.vercel.app/api",
//       },
//     ],

//     components: {
//       securitySchemes: {
//         UserIdAuth: {
//           type: "apiKey",
//           in: "header",
//           name: "x-user-id",
//         },
//       },
//     },
//   },
//   apis: isProduction
//     ? ["./dist/routes/*.js"] // Production: compiled JS files
//     : ["./src/routes/*.ts"], // Development: TypeScript files
// };

// export const swaggerSpec = swaggerJsdoc(options);

import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Booking System API",
      version: "1.0.0",
      description: "Booking system with role-based access control",
    },
    servers: [
      { url: "http://localhost:3000/api" },
      { url: "https://booking-system-mocha.vercel.app/api" },
    ],

    components: {
      securitySchemes: {
        UserIdAuth: {
          type: "apiKey",
          in: "header",
          name: "x-user-id",
        },
      },

      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            role: {
              type: "string",
              enum: ["admin", "owner", "user"],
            },
          },
        },

        Booking: {
          type: "object",
          properties: {
            id: { type: "string" },
            userId: { type: "string" },
            startTime: {
              type: "string",
              format: "date-time",
            },
            endTime: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateBookingInput: {
          type: "object",
          required: ["startTime", "endTime"],
          properties: {
            startTime: {
              type: "string",
              format: "date-time",
            },
            endTime: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateUserInput: {
          type: "object",
          required: ["name", "role"],
          properties: {
            name: { type: "string" },
            role: {
              type: "string",
              enum: ["admin", "owner", "user"],
            },
          },
        },

        UpdateUserRoleInput: {
          type: "object",
          required: ["role"],
          properties: {
            role: {
              type: "string",
              enum: ["admin", "owner", "user"],
            },
          },
        },

        Error: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },

    security: [{ UserIdAuth: [] }],

    paths: {
      "/health": {
        get: {
          tags: ["System"],
          summary: "Health check",
          responses: {
            200: { description: "System running" },
          },
        },
      },

      "/me": {
        get: {
          tags: ["System"],
          summary: "Get current authenticated user",
          responses: {
            200: {
              description: "Current user",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
          },
        },
      },

      "/summary": {
        get: {
          tags: ["System"],
          summary: "Get booking summary (Admin/Owner only)",
          responses: {
            200: { description: "Booking summary" },
            403: { description: "Forbidden" },
          },
        },
      },

      "/bookings": {
        get: {
          tags: ["Bookings"],
          summary: "Get all bookings",
          responses: {
            200: {
              description: "List of bookings",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Booking",
                    },
                  },
                },
              },
            },
          },
        },

        post: {
          tags: ["Bookings"],
          summary: "Create booking",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CreateBookingInput",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Booking created",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Booking",
                  },
                },
              },
            },
            400: { description: "Invalid input" },
            409: { description: "Booking overlap" },
          },
        },
      },

      "/bookings/mybookings": {
        get: {
          tags: ["Bookings"],
          summary: "Get current user's bookings",
          responses: {
            200: {
              description: "List of user's bookings",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Booking",
                    },
                  },
                },
              },
            },
            401: { description: "Unauthorized" },
          },
        },
      },

      "/bookings/{id}": {
        delete: {
          tags: ["Bookings"],
          summary: "Delete booking",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Booking deleted" },
            403: { description: "Not allowed" },
            404: { description: "Not found" },
          },
        },
      },

      "/users": {
        get: {
          tags: ["Users"],
          summary: "Get all users",
          responses: {
            200: {
              description: "List of users",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                },
              },
            },
          },
        },

        post: {
          tags: ["Users"],
          summary: "Create new user (Admin only)",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CreateUserInput",
                },
              },
            },
          },
          responses: {
            201: { description: "User created" },
            403: { description: "Forbidden" },
          },
        },
      },

      "/users/{id}/role": {
        put: {
          tags: ["Users"],
          summary: "Update user role",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UpdateUserRoleInput",
                },
              },
            },
          },
          responses: {
            200: { description: "Role updated" },
            403: { description: "Forbidden" },
          },
        },
      },

      "/users/{id}": {
        delete: {
          tags: ["Users"],
          summary: "Delete user",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "User deleted" },
            404: { description: "Not found" },
          },
        },
      },
    },
  },

  apis: [], // manual mode
};

export const swaggerSpec = swaggerJsdoc(options);
