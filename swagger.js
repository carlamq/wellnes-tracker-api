const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Wellness Tracker API',
    description: 'Douglas,Carla,David\'s Fitness and Workout API Documentation',
  },
  host: 'wellnes-tracker-api.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js']; // Points to my main server file

swaggerAutogen(outputFile, endpointsFiles, doc);