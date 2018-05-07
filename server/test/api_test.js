'use strict';
const app = require('../app').app;
const request = require('supertest')(app.listen(6500));
const expect = require('chai').expect;

const token = require("../controllers/auth_controller").genToken({id: 1, username: "admin"});

describe("test koa blog app", () => {
  describe("auth test", () => {
    it('get / should get OK', async () => {
      let res = await request
        .get('/')
        .expect("Content-Type", /text\/html/)
        .expect(200);
    });

    it('post /api/auth/register should get OK', async () => {
      let res = await request
        .post('/api/auth/register')
        .send({username: 'admin', password: 'admin'})
        .expect(201);
    });
  });

  describe("crud articles with auth", () => {
    it('post /api/articles/ should get OK', async () => {
      let res = await request
        .post('/api/articles/')
        .send({title: "t", body: "b"})
        .set("Authorization", "Bearer " + token)
        .expect(201);
    });
    it('put /api/articles/1 should get OK', async () => {
      let res = await request
        .put('/api/articles/')
        .send({title: "t", body: "b"})
        .set("Authorization", "Bearer " + token)
        .expect(200);
    });
  });

  describe("crud articles without auth", () => {
    it('post /api/articles/ should get OK', async () => {
      let res = await request
        .post('/api/articles/')
        .send({title: "t", body: "b"})
        .expect(401);

    });
  });
});
