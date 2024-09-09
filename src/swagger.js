const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Users API',
            version: '1.0.0',
            description: 'A simple Express Users API'
        },
        servers: [
            {
                url: 'https://doc-shift-back.vercel.app/api',
                description: 'Production server'
            },
            {
                url: 'http://localhost:3000/api',
                description: 'Development server'
            },
        ],
    },
    apis: ['src/routes/*.js', 'src/docs/*.js'],
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };
