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
  //clear Posts collection
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
    const response = await request(server)
      .post("/auth/register")
      .send({ email: email, password: password });
    expect(response.statusCode).toEqual(200);
    accessToken = response.body.access_token;
    refreshToken = response.body.refresh_token;
    expect(accessToken).not.toBeNull();
    expect(refreshToken).not.toBeNull();

    const response2 = await request(server)
      .get("/auth/test")
      .set({ authorization: "bearer " + accessToken });
    expect(response2.statusCode).toEqual(200);
  });

  test("Test login API", async () => {
    const response = await request(server)
      .post("/auth/login")
      .send({ email: email, password: password });
    expect(response.statusCode).toEqual(200);

    accessToken = response.body.access_token;
    refreshToken = response.body.refresh_token;
    expect(accessToken).not.toBeNull();
    expect(refreshToken).not.toBeNull();

    const response2 = await request(server)
      .get("/auth/test")
      .set({ authorization: "bearer " + accessToken });
    expect(response2.statusCode).toEqual(200);
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
      .post("/auth/test")
      .set({ authorization: "bearer " + accessToken });
    expect(response.statusCode).not.toEqual(200);

    response = await request(server)
      .post("/auth/refresh")
      .set({ authorization: "bearer " + refreshToken });
    expect(response.statusCode).toEqual(200);

    accessToken = response.body.access_token;
    refreshToken = response.body.refresh_token;
    expect(accessToken).not.toBeNull();
    expect(refreshToken).not.toBeNull();

 
  });

  test("LogOut", async () => {
    const response = await request(server)
    .post("/auth/login")
    .send({ email: email, password: password });
    expect(response.statusCode).toEqual(200);
    const accessToken = response.body.access_token;
    expect(accessToken).not.toBeNull();
    const response2 = await request(server)
    .post("/auth/logout")
    .send({ authorization: "bearer " + accessToken });
    expect(response2.statusCode).not.toEqual(200);

  });


});
