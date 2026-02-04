const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Wellness Tracker API',
    description: 'Douglas\'s Fitness and Workout API Documentation',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js']; // Points to my main server file

swaggerAutogen(outputFile, endpointsFiles, doc);