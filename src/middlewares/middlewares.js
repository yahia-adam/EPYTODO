var jwt = require('jsonwebtoken');

module.exports.auth = function (request, response, next) {
    if (request.headers.authorization) {
        try {
            var decoded = jwt.verify(request.headers.authorization.split(" ")[1], process.env.SECRET);
            request.user = decoded;
            next();
        }
        catch (err) {
            response.status(401).send({ "msg": "Token is not valid" });
        }
    }
    else {
        response.status(401).send({ "msg": "No token,authorization denied " });
    }
}