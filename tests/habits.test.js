const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");
const Habit = require("../src/models/habit"); 

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
}, 30000);

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Habit.deleteMany({});
});

describe("Habits API Unit Tests", () => {
    test("GET /habits should return all habits", async () => {
        const habit = new Habit({
            name: "Drink Water",       // Required by your model
            userName: "testuser123",   // Required by your model
            userId: "user123",
            frequency: "daily",      
            goal: 8,
            unit: "glasses",
        });
        await habit.save();

        const res = await request(app).get("/habits");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(1);
        // Corrected to check "name" per your model validation
        expect(res.body[0]).toHaveProperty("name", "Drink Water");
    });

    test("POST /habits should create a new habit", async () => {
        const newHabit = {
            name: "Morning Jog",       // Required by your model
            userName: "testuser123",   // Required by your model
            userId: "user123",
            frequency: "daily",
            goal: 30,
            unit: "minutes",
        };

        const res = await request(app).post("/habits").send(newHabit);
        expect(res.statusCode).toEqual(201);
        // Corrected to check "name" per your model validation
        expect(res.body).toHaveProperty("name", "Morning Jog");
    });
});