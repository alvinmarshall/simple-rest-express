import * as assert from "node:assert";
import {UserDao, UserService, UserServiceException} from "../src/user/index.js";

describe('Users', function () {
    let userService;
    let userDao;

    before(() => {
        userDao = new UserDao();
        userService = new UserService(userDao);
    })

    beforeEach(() => {
        userDao.removeAll();
    })

    describe('User Service', function () {
        it('should create a new user entry', function () {
            const expected = userService.create({name: 'Test 1'});
            assert.equal(1, expected)
        });

        it('should throw if user entry already exists', function () {
            userService.create({name: 'Test 1'});
            assert.throws(() => userService.create({name: 'Test 1'}), UserServiceException)
        });

        it('should retrieve all users', function () {
            userService.create({name: 'Test 1'});
            const expected = userService.users();
            assert.equal(true, expected.length > 0)
        });

        it('should retrieve a user with an id', function () {
            userService.create({name: 'Test 1'});
            const expected = userService.user(1);
            assert.equal(true, expected !== undefined)
        });
    });


});