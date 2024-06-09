import request from 'supertest'
import app from '../src/app.js'
import * as assert from "node:assert";

describe('User Router Test', () => {
    describe('add user entry', () => {
        it('should add user entry', async () => {
            const response = await request(app)
                .post("/users")
                .set("content-type", "application/json")
                .send({
                    name: "Test 1"
                });
            assert.equal(201, response.status)
        });
        it('should return 422 if user name already exists', async () => {
            await request(app)
                .post("/users")
                .set("content-type", "application/json")
                .send({
                    name: "Test A"
                });
            const response = await request(app)
                .post("/users")
                .set("content-type", "application/json")
                .send({
                    name: "Test A"
                });
            assert.equal(422, response.status)
        });
    });
    it('should return 200 with all user entries', async () => {
        await request(app)
            .post("/users")
            .set("content-type", "application/json")
            .send({
                name: "Test B"
            });
        var response = await request(app)
            .get("/users")
            .set("content-type", "application/json");
        assert.equal(200, response.status)
    });

    describe('Get user By Id', async () => {
        var userReponse = await request(app)
            .post("/users")
            .set("content-type", "application/json")
            .send({
                name: "Test C"
            });
        const userId = userReponse.body.user
        it('should user by id and return 200', async () => {
            var response = await request(app)
                .get(`/users/${userId}`)
                .set("content-type", "application/json");
            assert.equal(200, response.status)
        });
        it('should return 404 if user not found', async () => {
            var response = await request(app)
                .get(`/users/100`)
                .set("content-type", "application/json");
            assert.equal(404, response.status)
        });
    });
});