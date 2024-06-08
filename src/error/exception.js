export default class Exception extends Error {
    status = 500
    name = ''

    constructor(data) {
        const {message, status} = data
        super(message);
        this.status = status === undefined ? 500 : status
        this.name = this.constructor.name;
    }
}

