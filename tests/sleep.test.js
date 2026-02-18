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

<<<<<<< David's-contribution
describe("Sleep API", () => {
  describe("GET /sleep", () => {
    it("should return all sleep entries", async () => {
      const sleep = new Sleep({
        userId: "user123",
        bedtime: new Date("2024-02-10T22:00:00Z"),
        wakeTime: new Date("2024-02-11T06:00:00Z"),
        durationHours: 8,
        quality: "good",
        interruptions: 1
      });
      await sleep.save();

      const res = await request(app).get("/sleep");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty("quality", "good");
    });

    it("should return empty array when no sleep entries exist", async () => {
      const res = await request(app).get("/sleep");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(0);
    });
  });

  describe("GET /sleep/:id", () => {
    it("should return a sleep entry by ID", async () => {
      const sleep = new Sleep({
        userId: "user123",
        bedtime: new Date("2024-02-10T23:00:00Z"),
        wakeTime: new Date("2024-02-11T07:00:00Z"),
        durationHours: 8,
        quality: "excellent",
        interruptions: 0,
        feltRested: true
      });
      await sleep.save();

      const res = await request(app).get(`/sleep/${sleep._id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("quality", "excellent");
      expect(res.body).toHaveProperty("feltRested", true);
    });

    it("should return 404 if sleep entry not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/sleep/${fakeId}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message", "Sleep entry not found");
    });

    it("should return 400 for invalid ID format", async () => {
      const res = await request(app).get("/sleep/invalid-id");

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message", "Invalid sleep ID");
    });
  });

  describe("POST /sleep", () => {
    it("should create a new sleep entry", async () => {
      const newSleep = {
        userId: "user123",
        bedtime: "2024-02-10T22:30:00Z",
        wakeTime: "2024-02-11T06:30:00Z",
        durationHours: 8,
        quality: "good",
        interruptions: 1,
        sleepStages: {
          lightSleepMin: 240,
          deepSleepMin: 120,
          remSleepMin: 120
        },
        notes: "Good night sleep",
        feltRested: true
      };

      const res = await request(app).post("/sleep").send(newSleep);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("quality", "good");
      expect(res.body).toHaveProperty("durationHours", 8);
    });

    it("should return 400 for missing required fields", async () => {
      const invalidSleep = {
        userId: "user123"
        // missing required fields
      };

      const res = await request(app).post("/sleep").send(invalidSleep);

      expect(res.statusCode).toEqual(400);
    });

    it("should return 400 for invalid quality", async () => {
      const invalidSleep = {
        userId: "user123",
        bedtime: "2024-02-10T22:00:00Z",
        wakeTime: "2024-02-11T06:00:00Z",
        durationHours: 8,
        quality: "invalid"
      };

      const res = await request(app).post("/sleep").send(invalidSleep);

      expect(res.statusCode).toEqual(400);
    });

    it("should return 400 for invalid duration", async () => {
      const invalidSleep = {
        userId: "user123",
        bedtime: "2024-02-10T22:00:00Z",
        wakeTime: "2024-02-11T06:00:00Z",
        durationHours: 30, // Invalid - exceeds max
        quality: "good"
      };

      const res = await request(app).post("/sleep").send(invalidSleep);

      expect(res.statusCode).toEqual(400);
    });
  });

  describe("PUT /sleep/:id", () => {
    it("should update a sleep entry", async () => {
      const sleep = new Sleep({
        userId: "user123",
        bedtime: new Date("2024-02-10T22:00:00Z"),
        wakeTime: new Date("2024-02-11T06:00:00Z"),
        durationHours: 8,
        quality: "fair"
      });
      await sleep.save();

      const updatedData = {
        quality: "excellent",
        notes: "Actually slept really well"
      };

      const res = await request(app)
        .put(`/sleep/${sleep._id}`)
        .send(updatedData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("quality", "excellent");
      expect(res.body).toHaveProperty("notes", "Actually slept really well");
    });

    it("should return 404 if sleep entry not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/sleep/${fakeId}`)
        .send({ quality: "good" });

      expect(res.statusCode).toEqual(404);
    });

    it("should return 400 for invalid data", async () => {
      const sleep = new Sleep({
        userId: "user123",
        bedtime: new Date("2024-02-10T22:00:00Z"),
        wakeTime: new Date("2024-02-11T06:00:00Z"),
        durationHours: 8,
        quality: "good"
      });
      await sleep.save();

      const res = await request(app)
        .put(`/sleep/${sleep._id}`)
        .send({ quality: "invalid" });

      expect(res.statusCode).toEqual(400);
    });
  });

  describe("DELETE /sleep/:id", () => {
    it("should delete a sleep entry", async () => {
      const sleep = new Sleep({
        userId: "user123",
        bedtime: new Date("2024-02-10T22:00:00Z"),
        wakeTime: new Date("2024-02-11T06:00:00Z"),
        durationHours: 8,
        quality: "good"
      });
      await sleep.save();

      const res = await request(app).delete(`/sleep/${sleep._id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message", "Sleep entry deleted successfully");

      const deletedSleep = await Sleep.findById(sleep._id);
      expect(deletedSleep).toBeNull();
    });

    it("should return 404 if sleep entry not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/sleep/${fakeId}`);

      expect(res.statusCode).toEqual(404);
    });

    it("should return 400 for invalid ID", async () => {
      const res = await request(app).delete("/sleep/invalid-id");

      expect(res.statusCode).toEqual(400);
    });
=======
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
>>>>>>> main
  });
});