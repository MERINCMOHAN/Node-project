const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500; //if statuscode not present then assign it to 500
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "validation failed", message: err.message, stackTrace: err.stack });
            break
        case constants.UNAUTORISED:
            res.json({ title: "unauthorised", message: err.message, stackTrace: err.stack });
            break
        case constants.FORBIDDEN:
            res.json({ title: "forbidden", message: err.message, stackTrace: err.stack });

        default:
            console.log('no error');
    }
    //it will show th error in json 
}
module.exports = errorHandler;