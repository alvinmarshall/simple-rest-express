import Exception from "../error/exception.js";

export class UserDao {
    db = []

    constructor() {
        this.db = [];
    }

    add(user) {
        const {name} = user
        const filter = this.db.filter(value => value.name === name);
        if (filter.length) throw new UserDaoException("user already exists")
        console.log(this.db)
        return this.db.push(user);
    }

    get() {
        return this.db;
    }

    getOne(id) {
        return this.db[id];
    }

    removeAll(){
        this.db = []
    }

}

export class UserDaoException extends Exception {
    constructor(message) {
        super({message});
    }
}