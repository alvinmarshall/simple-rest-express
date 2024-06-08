import Exception from "../error/exception.js";

export class UserService {
    userDao = undefined

    constructor(userDao) {
        this.userDao = userDao;
    }

    create(user) {
        try {
            return this.userDao.add(user)
        } catch (err) {
            throw new UserServiceException(err.message, 422)
        }
    }

    users() {
        return this.userDao.get();
    }

    user(id) {
        const index = id > 0 ? id - 1 : id;
        if (!this.userDao.getOne(index)) throw new UserServiceException("Not Found", 404)
        return this.userDao.getOne(index)
    }
}

export class UserServiceException extends Exception {
    constructor(message, status) {
        super({message, status});
    }
}