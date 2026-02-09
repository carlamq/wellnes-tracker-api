const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");
const Sleep = require("../src/models/sleep");

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
  await Sleep.deleteMany({});
});

describe("Sleep API Unit Tests", () => {
  test("GET /sleep should return all sleep records", async () => {
    const sleepEntry = new Sleep({
      userId: "user123",
      hoursSlept: 8,
      sleepQuality: "Excellent",
      notes: "Feeling rested"
    });
    await sleepEntry.save();

    const res = await request(app).get("/sleep");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty("hoursSlept", 8);
  });

  test("POST /sleep should return 400 for missing fields", async () => {
    const invalidEntry = { userId: "user123" }; // Missing hoursSlept and date
    const res = await request(app).post("/sleep").send(invalidEntry);
    expect(res.statusCode).toEqual(400);
  });
});