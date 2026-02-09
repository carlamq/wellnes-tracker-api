const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Wellness Tracker API',
    description: "Douglas, Carla, and David's Fitness and Workout API Documentation",
  },
  host: 'wellnes-tracker-api.onrender.com',
  schemes: ['https', 'http'], // Added http for local testing flexibility
  definitions: {
    Habit: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Drink Water' },
        userName: { type: 'string', example: 'testuser123' },
        userId: { type: 'string', example: 'user123' },
        frequency: { type: 'string', example: 'daily' },
        goal: { type: 'number', example: 8 },
        unit: { type: 'string', example: 'glasses' }
      }
    },
    Nutrition: {
      type: 'object',
      properties: {
        userId: { type: 'string', example: 'user123' },
        foodItem: { type: 'string', example: 'Grilled Chicken Salad' },
        calories: { type: 'number', example: 450 },
        protein: { type: 'number', example: 35 },
        carbs: { type: 'number', example: 12 },
        fat: { type: 'number', example: 15 }
      }
    },
    Sleep: {
      type: 'object',
      properties: {
        userId: { type: 'string', example: 'user123' },
        hoursSlept: { type: 'number', example: 7.5 },
        sleepQuality: { type: 'string', example: 'Good' },
        date: { type: 'string', example: '2026-02-09' }
      }
    },
    Workout: {
      type: 'object',
      properties: {
        userId: { type: 'string', example: 'user123' },
        exerciseType: { type: 'string', example: 'Running' },
        duration: { type: 'number', example: 45 },
        intensity: { type: 'string', example: 'Moderate' },
        caloriesBurned: { type: 'number', example: 400 }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);