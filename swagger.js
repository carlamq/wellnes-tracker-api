const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Wellness Tracker API',
    description: 'Douglas,Carla,David\'s Fitness and Workout API Documentation - 4 Collections with GitHub OAuth Authentication',
    version: '1.0.0'
  },
  host: 'wellnes-tracker-api.onrender.com',
  schemes: ['https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter your bearer token in the format: Bearer {token}'
    }
  },
  definitions: {
    Workout: {
      userId: 'user123',
      date: '2024-02-11T10:00:00Z',
      type: 'strength',
      durationMin: 60,
      exercises: [
        { name: 'Push-ups', sets: 3, reps: 10, weight: 0 }
      ],
      notes: 'Great workout session'
    },
    Habit: {
      userName: 'testuser',
      name: 'Morning Exercise',
      frequency: 'daily',
      targetCount: 7,
      category: 'fitness',
      active: true
    },
    Nutrition: {
      userId: 'user123',
      date: '2024-02-11T08:00:00Z',
      mealType: 'breakfast',
      foods: [
        { 
          name: 'Oatmeal with Berries', 
          calories: 250, 
          protein: 8, 
          carbs: 45, 
          fats: 5, 
          servingSize: '1 bowl' 
        }
      ],
      totalCalories: 250,
      waterIntakeMl: 500,
      notes: 'Healthy breakfast to start the day'
    },
    Sleep: {
      userId: 'user123',
      date: '2024-02-11T00:00:00Z',
      bedtime: '2024-02-10T22:00:00Z',
      wakeTime: '2024-02-11T06:00:00Z',
      durationHours: 8,
      quality: 'good',
      interruptions: 1,
      sleepStages: {
        lightSleepMin: 240,
        deepSleepMin: 120,
        remSleepMin: 120
      },
      notes: 'Solid night of sleep',
      feltRested: true
    }
  },
  tags: [
    {
      name: 'Authentication',
      description: 'GitHub OAuth endpoints'
    },
    {
      name: 'Workouts',
      description: 'Workout tracking endpoints'
    },
    {
      name: 'Habits',
      description: 'Habit tracking endpoints'
    },
    {
      name: 'Nutrition',
      description: 'Nutrition tracking endpoints (Protected routes require authentication)'
    },
    {
      name: 'Sleep',
      description: 'Sleep tracking endpoints (Protected routes require authentication)'
    }
  ]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);