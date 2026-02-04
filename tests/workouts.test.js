const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");
const Workout = require("../src/models/workout");

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
  await Workout.deleteMany({});
});

describe("Workouts API", () => {
  describe("GET /workouts", () => {
    it("should return all workouts", async () => {
      const workout = new Workout({
        userId: "user123",
        type: "strength",
        durationMin: 60,
        exercises: [{ name: "Push-ups", sets: 3, reps: 10 }],
      });
      await workout.save();

      const res = await request(app).get("/workouts");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty("type", "strength");
    });
  });

  describe("GET /workouts/:id", () => {
    it("should return a workout by ID", async () => {
      const workout = new Workout({
        userId: "user123",
        type: "cardio",
        durationMin: 30,
        exercises: [{ name: "Running", sets: 1, reps: null }],
      });
      await workout.save();

      const res = await request(app).get(`/workouts/${workout._id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("type", "cardio");
    });

    it("should return 404 if workout not found", async () => {
      const res = await request(app).get("/workouts/60d5ecb74b24c72b8c8b4567");

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message", "Workout not found");
    });
  });

  describe("POST /workouts", () => {
    it("should create a new workout", async () => {
      const newWorkout = {
        userId: "user123",
        type: "yoga",
        durationMin: 45,
        exercises: [{ name: "Downward Dog", sets: 1, reps: null }],
        notes: "Relaxing session",
      };

      const res = await request(app).post("/workouts").send(newWorkout);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("type", "yoga");
      expect(res.body).toHaveProperty("notes", "Relaxing session");
    });

    it("should return 400 for invalid data", async () => {
      const invalidWorkout = {
        userId: "user123",
        // missing required fields
      };

      const res = await request(app).post("/workouts").send(invalidWorkout);

      expect(res.statusCode).toEqual(400);
    });
  });

  describe("PUT /workouts/:id", () => {
    it("should update a workout", async () => {
      const workout = new Workout({
        userId: "user123",
        type: "strength",
        durationMin: 60,
        exercises: [{ name: "Push-ups", sets: 3, reps: 10 }],
      });
      await workout.save();

      const updatedData = {
        type: "cardio",
        durationMin: 45,
      };

      const res = await request(app)
        .put(`/workouts/${workout._id}`)
        .send(updatedData);

      expect(res.statusCode).toEqual(204);

      const updatedWorkout = await Workout.findById(workout._id);
      expect(updatedWorkout.type).toBe("cardio");
      expect(updatedWorkout.durationMin).toBe(45);
    });

    it("should return 404 if workout not found", async () => {
      const res = await request(app)
        .put("/workouts/60d5ecb74b24c72b8c8b4567")
        .send({ type: "yoga" });

      expect(res.statusCode).toEqual(404);
    });
  });

  describe("DELETE /workouts/:id", () => {
    it("should delete a workout", async () => {
      const workout = new Workout({
        userId: "user123",
        type: "other",
        durationMin: 20,
        exercises: [{ name: "Stretching", sets: 1, reps: null }],
      });
      await workout.save();

      const res = await request(app).delete(`/workouts/${workout._id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty(
        "message",
        "Workout deleted successfully",
      );

      const deletedWorkout = await Workout.findById(workout._id);
      expect(deletedWorkout).toBeNull();
    });

    it("should return 404 if workout not found", async () => {
      const res = await request(app).delete(
        "/workouts/60d5ecb74b24c72b8c8b4567",
      );

      expect(res.statusCode).toEqual(404);
    });
  });
});
