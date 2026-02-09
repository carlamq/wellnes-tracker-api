const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");
const Nutrition = require("../src/models/nutrition");

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
  await Nutrition.deleteMany({});
});

describe("Nutrition API Unit Tests", () => {
  test("GET /nutrition should return all nutrition records", async () => {
    const entry = new Nutrition({
      userId: "user123",
      foodItem: "Apple",
      calories: 95
    });
    await entry.save();

    const res = await request(app).get("/nutrition");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty("foodItem", "Apple");
  });

  test("POST /nutrition should return 400 for missing required fields", async () => {
    const res = await request(app)
      .post("/nutrition")
      .send({ userId: "user123" }); // missing foodItem and calories

    expect(res.statusCode).toEqual(400);
  });
});