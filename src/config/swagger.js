import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Twitter Clone API',
      version: '1.0.0',
      description: 'API documentation for Twitter-like backend built with Express.js'
    },
    servers: [
      {
        url: 'http://localhost:7000/api',
        description: 'Local server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js'], // Scans route files for JSDoc comments
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
