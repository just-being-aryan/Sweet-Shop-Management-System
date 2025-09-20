import { jest } from '@jest/globals';
const mockCreate = jest.fn().mockResolvedValue({
  choices: [{ message: { content: '["Chocolate","Candy"]' } }]
});

jest.unstable_mockModule("openai", () => ({
  default: class {
    chat = {
      completions: { create: mockCreate }
    };
  }
}));

import request from "supertest";
import app from "../server.js";

describe("Auth API", () => {
  it("should register a user with valid input", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example5.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });
});