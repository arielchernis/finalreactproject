import request from "supertest";
import server from "../app";
import mongoose from "mongoose";
import User from "../models/user_model";
import { closeSocketServer } from "../socket_server"

const email = "authtest@a.com";
const wrongEmail = "test2@a.com";
const password = "1234567890";
const wrongPassword = "44444444";
let accessToken = "";
let refreshToken = "";

const sleep = (ms:number) => new Promise((r) => setTimeout(r, ms));

const serverCleanup = async () => {
  return new Promise<void>((resolve) => {
      server.close(() => {
          resolve()
      })
  })
}

beforeAll(async () => {
  //set the token expiration to 3 sec so it will expire for the refresh test.
  process.env.TOKEN_EXPIRATION = '3s'
  
  // clear Posts collection
  await User.deleteMany({ email: email });
});

afterAll(async () => {
  await User.deleteMany({ email: email });
  await closeSocketServer()
  await serverCleanup()
  mongoose.connection.close();
});

describe("This is Auth API test", () => {
  test("Test register API", async () => {
    let response = await request(server)
      .post("/auth/register")
      .send({ email: email, password: password });
    expect(response.statusCode).toEqual(200);
    accessToken = response.body.access_token;
    refreshToken = response.body.refresh_token;
    expect(accessToken).not.toBeNull();
    expect(refreshToken).not.toBeNull();

    response = await request(server)
      .get("/auth/test")
      .set({ authorization: "barer " + accessToken });
    expect(response.statusCode).toEqual(200);
  });

  test("Test login API", async () => {
    let response = await request(server)
      .post("/auth/login")
      .send({ email: email, password: password });
    expect(response.statusCode).toEqual(200);

    accessToken = response.body.access_token;
    refreshToken = response.body.refresh_token;
    expect(accessToken).not.toBeNull();
    expect(refreshToken).not.toBeNull();

    response = await request(server)
      .get("/auth/test")
      .set({ authorization: "barer " + accessToken });
    expect(response.statusCode).toEqual(200);
  });

  test("Test register taken email API", async () => {
    const response = await request(server)
      .post("/auth/register")
      .send({ email: email, password: password });
    expect(response.statusCode).not.toEqual(200);
  });

  test("Test login wrong email API", async () => {
    const response = await request(server)
      .post("/auth/login")
      .send({ email: wrongEmail, password: password });
    expect(response.statusCode).not.toEqual(200);
  });

  test("Test login wrong password API", async () => {
    const response = await request(server)
      .post("/auth/login")
      .send({ email: email, password: wrongPassword });
    expect(response.statusCode).not.toEqual(200);
  });


  test("test refresh token", async () => {
    //wait untill access token is expiered
    await sleep(3000);
    let response = await request(server)
      .get("/auth/test")
      .set({ authorization: "barer " + accessToken });
    expect(response.statusCode).not.toEqual(200);

    response = await request(server)
      .get("/auth/refresh")
      .set({ authorization: "barer " + refreshToken });
    expect(response.statusCode).toEqual(200);

    accessToken = response.body.access_token;
    refreshToken = response.body.refresh_token;
    expect(accessToken).not.toBeNull();
    expect(refreshToken).not.toBeNull();

    console.log("new access token " + accessToken)
    response = await request(server)
      .get("/auth/test")
      .set({ authorization: "barer " + accessToken });
    expect(response.statusCode).toEqual(200);
  });
});
