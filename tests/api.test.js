import request from "supertest";
import app from "../src/server.js";
test("health",async()=>{const r=await request(app).get("/health");expect(r.statusCode).toBe(200);expect(r.body.status).toBe("ok");});
