import Exception from "./exception.js";

const exceptionMiddleware = (error, req, res, next) => {
    console.log("exception", error)
    if (error instanceof Exception) {
        res.status(error.status).json({message: error.message, name: error.name, path: req.path})
        return
    }
    res.status(500).json({message});
}

export default exceptionMiddleware;