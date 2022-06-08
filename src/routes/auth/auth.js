const express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken');
const auth_query = require("./auth.query");

router.post('/register', function (request, response) {
    if ("email" in request.body && "name" in request.body && "firstname" in request.body && "password" in request.body) {
        auth_query.register(request.body["email"], request.body["name"], request.body["firstname"], request.body["password"],
            function (registerErr, registerResult) {
                if (registerErr) {
                    if (registerErr.code == "ER_DUP_ENTRY") {
                        response.status(400).send({ "msg": "Account already exists" });
                    } else {
                        response.status(500).send({ "msg": "Internal server error" });
                    }
                } else {
                    var token = jwt.sign({ email: request.body["email"] }, process.env.SECRET);
                    response.status(201).send({ "token": token });
                }
            });
    } else
        response.status(400).send({ "msg": "Bad parameter" });
});

router.post('/login', function (request, response) {
    console.log(request.body)
    if ("email" in request.body && "password" in request.body) {
        auth_query.login(request.body["email"], request.body["password"], function (err, result) {
            if (err) {
                response.send(500, { "msg": "Internal server error" });
            } else {
                if (result == true) {
                    var token = jwt.sign({ email: request.body["email"] }, process.env.SECRET);
                    response.status(200).send({ "token": token });
                } else {
                    response.status(401).send({ "msg": "Invalid Credentials" });
                }
            }
        });
    } else {
        response.status(400).send({ "msg": "Bad parameter" });
    }
});
module.exports = router;
