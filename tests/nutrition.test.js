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

describe("Nutrition API", () => {
  describe("GET /nutrition", () => {
    it("should return all nutrition entries", async () => {
      const nutrition = new Nutrition({
        userId: "user123",
        mealType: "breakfast",
        foods: [
          { name: "Oatmeal", calories: 150, protein: 5, carbs: 27, fats: 3 }
        ],
        totalCalories: 150,
        waterIntakeMl: 500
      });
      await nutrition.save();

      const res = await request(app).get("/nutrition");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty("mealType", "breakfast");
    });

    it("should return empty array when no nutrition entries exist", async () => {
      const res = await request(app).get("/nutrition");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(0);
    });
  });

  describe("GET /nutrition/:id", () => {
    it("should return a nutrition entry by ID", async () => {
      const nutrition = new Nutrition({
        userId: "user123",
        mealType: "lunch",
        foods: [
          { name: "Chicken Salad", calories: 350, protein: 30, carbs: 20, fats: 15 }
        ],
        totalCalories: 350
      });
      await nutrition.save();

      const res = await request(app).get(`/nutrition/${nutrition._id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("mealType", "lunch");
      expect(res.body.foods[0]).toHaveProperty("name", "Chicken Salad");
    });

    it("should return 404 if nutrition entry not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/nutrition/${fakeId}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message", "Nutrition entry not found");
    });

    it("should return 400 for invalid ID format", async () => {
      const res = await request(app).get("/nutrition/invalid-id");

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message", "Invalid nutrition ID");
    });
  });

  describe("POST /nutrition", () => {
    it("should create a new nutrition entry", async () => {
      const newNutrition = {
        userId: "user123",
        mealType: "dinner",
        foods: [
          { name: "Grilled Salmon", calories: 200, protein: 25, carbs: 0, fats: 10 },
          { name: "Brown Rice", calories: 150, protein: 3, carbs: 30, fats: 1 }
        ],
        totalCalories: 350,
        waterIntakeMl: 250,
        notes: "Healthy dinner"
      };

      const res = await request(app).post("/nutrition").send(newNutrition);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("mealType", "dinner");
      expect(res.body.foods).toHaveLength(2);
    });

    it("should return 400 for missing required fields", async () => {
      const invalidNutrition = {
        userId: "user123"
        // missing required fields
      };

      const res = await request(app).post("/nutrition").send(invalidNutrition);

      expect(res.statusCode).toEqual(400);
    });

    it("should return 400 for invalid mealType", async () => {
      const invalidNutrition = {
        userId: "user123",
        mealType: "invalid",
        foods: [{ name: "Test", calories: 100 }],
        totalCalories: 100
      };

      const res = await request(app).post("/nutrition").send(invalidNutrition);

      expect(res.statusCode).toEqual(400);
    });
  });

  describe("PUT /nutrition/:id", () => {
    it("should update a nutrition entry", async () => {
      const nutrition = new Nutrition({
        userId: "user123",
        mealType: "snack",
        foods: [{ name: "Apple", calories: 95 }],
        totalCalories: 95
      });
      await nutrition.save();

      const updatedData = {
        waterIntakeMl: 500,
        notes: "Added water intake"
      };

      const res = await request(app)
        .put(`/nutrition/${nutrition._id}`)
        .send(updatedData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("waterIntakeMl", 500);
      expect(res.body).toHaveProperty("notes", "Added water intake");
    });

    it("should return 404 if nutrition entry not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/nutrition/${fakeId}`)
        .send({ notes: "Updated" });

      expect(res.statusCode).toEqual(404);
    });

    it("should return 400 for invalid data", async () => {
      const nutrition = new Nutrition({
        userId: "user123",
        mealType: "breakfast",
        foods: [{ name: "Test", calories: 100 }],
        totalCalories: 100
      });
      await nutrition.save();

      const res = await request(app)
        .put(`/nutrition/${nutrition._id}`)
        .send({ mealType: "invalid" });

      expect(res.statusCode).toEqual(400);
    });
  });

  describe("DELETE /nutrition/:id", () => {
    it("should delete a nutrition entry", async () => {
      const nutrition = new Nutrition({
        userId: "user123",
        mealType: "breakfast",
        foods: [{ name: "Test", calories: 100 }],
        totalCalories: 100
      });
      await nutrition.save();

      const res = await request(app).delete(`/nutrition/${nutrition._id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message", "Nutrition entry deleted successfully");

      const deletedNutrition = await Nutrition.findById(nutrition._id);
      expect(deletedNutrition).toBeNull();
    });

    it("should return 404 if nutrition entry not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/nutrition/${fakeId}`);

      expect(res.statusCode).toEqual(404);
    });

    it("should return 400 for invalid ID", async () => {
      const res = await request(app).delete("/nutrition/invalid-id");

      expect(res.statusCode).toEqual(400);
    });
  });
});