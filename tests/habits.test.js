const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");
<<<<<<< David's-contribution
const Habit = require("../src/models/habit");
=======
const Habit = require("../src/models/habit"); 
>>>>>>> main

let mongoServer;

beforeAll(async () => {
<<<<<<< David's-contribution
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

describe("Habits API", () => {
  describe("GET /habits", () => {
    it("should return all habits", async () => {
      const habit = new Habit({
        userName: "testuser",
        name: "Morning Exercise",
        frequency: "daily",
        targetCount: 7,
        category: "fitness",
        active: true
      });
      await habit.save();

      const res = await request(app).get("/habits");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty("name", "Morning Exercise");
    });

    it("should return empty array when no habits exist", async () => {
      const res = await request(app).get("/habits");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(0);
    });
  });

  describe("GET /habits/:id", () => {
    it("should return a habit by ID", async () => {
      const habit = new Habit({
        userName: "testuser",
        name: "Read Books",
        frequency: "weekly",
        targetCount: 5,
        category: "education"
      });
      await habit.save();

      const res = await request(app).get(`/habits/${habit._id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("name", "Read Books");
      expect(res.body).toHaveProperty("frequency", "weekly");
    });

    it("should return 404 if habit not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/habits/${fakeId}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message", "Habit not found");
    });

    it("should return 400 for invalid ID format", async () => {
      const res = await request(app).get("/habits/invalid-id");

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message", "Invalid id");
    });
  });

  describe("POST /habits", () => {
    it("should create a new habit", async () => {
      const newHabit = {
        userName: "testuser",
        name: "Meditation",
        frequency: "daily",
        targetCount: 1,
        category: "wellness",
        active: true
      };

      const res = await request(app).post("/habits").send(newHabit);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("name", "Meditation");
      expect(res.body).toHaveProperty("frequency", "daily");
    });

    it("should return 400 for missing required fields", async () => {
      const invalidHabit = {
        userName: "testuser"
        // missing required fields
      };

      const res = await request(app).post("/habits").send(invalidHabit);

      expect(res.statusCode).toEqual(400);
    });

    it("should return 400 for invalid frequency", async () => {
      const invalidHabit = {
        userName: "testuser",
        name: "Test",
        frequency: "invalid",
        targetCount: 1
      };

      const res = await request(app).post("/habits").send(invalidHabit);

      expect(res.statusCode).toEqual(400);
    });
  });

  describe("PUT /habits/:id", () => {
    it("should update a habit", async () => {
      const habit = new Habit({
        userName: "testuser",
        name: "Yoga",
        frequency: "daily",
        targetCount: 1
      });
      await habit.save();

      const updatedData = {
        frequency: "weekly",
        targetCount: 5
      };

      const res = await request(app)
        .put(`/habits/${habit._id}`)
        .send(updatedData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("frequency", "weekly");
      expect(res.body).toHaveProperty("targetCount", 5);
    });

    it("should return 404 if habit not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/habits/${fakeId}`)
        .send({ name: "Updated" });

      expect(res.statusCode).toEqual(404);
    });

    it("should return 400 for invalid data", async () => {
      const habit = new Habit({
        userName: "testuser",
        name: "Test",
        frequency: "daily",
        targetCount: 1
      });
      await habit.save();

      const res = await request(app)
        .put(`/habits/${habit._id}`)
        .send({ frequency: "invalid" });

      expect(res.statusCode).toEqual(400);
    });
  });

  describe("DELETE /habits/:id", () => {
    it("should delete a habit", async () => {
      const habit = new Habit({
        userName: "testuser",
        name: "Test Habit",
        frequency: "daily",
        targetCount: 1
      });
      await habit.save();

      const res = await request(app).delete(`/habits/${habit._id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message", "Habit deleted successfully");

      const deletedHabit = await Habit.findById(habit._id);
      expect(deletedHabit).toBeNull();
    });

    it("should return 404 if habit not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/habits/${fakeId}`);

      expect(res.statusCode).toEqual(404);
    });

    it("should return 400 for invalid ID", async () => {
      const res = await request(app).delete("/habits/invalid-id");

      expect(res.statusCode).toEqual(400);
    });
  });
=======
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
>>>>>>> main
});