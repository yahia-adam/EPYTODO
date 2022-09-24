const express = require("express");
var router_user = express.Router();
var router_users = express.Router();

const user_queries = require("./users.query");
const todo_queries = require("../todos/todos.query");

router_users.put('/:id', function (request, response) {
    if ("email" in request.body && "name" in request.body && "firstname" in request.body && "password" in request.body) {
        user_queries.update_user(request.params.id, request.body, function (err, user) {
            if (err) {
                response.status(500).send({ "msg": "Internal server error" });
            } else {
                if (user) {
                    response.status(200).send(user);
                } else {
                    response.status(404).send({ "msg": "Not found" });
                }
            }
        });
    } else {
        response.status(400).send({ "msg": "Bad parameter" });
    }
});

router_user.get('/todos', function (request, response) {
    user_queries.get_user(request.user.email, function (err, user) {
        if (err) {
            response.status(500).send({ "msg": "Internal server error" });
        } else {
            todo_queries.get_all_todos_by_user(user.id, function (err, todos) {
                if (err) {
                    response.status(500).send({ "msg": "Internal server error" });
                } else {
                    response.status(200).send(todos);
                }
            });
        }
    });
});

router_user.get('/', function (request, response) {
    user_queries.get_user(request.user.email, function (err, user) {
        if (err) {
            response.status(500).send({ "msg": "Internal server error" });
        } else {
            response.status(200).send(user);
        }
    });
});

router_users.get('/:id', function (request, response) {
    if ("id" in request.params) {
        user_queries.get_user(request.params["id"], function (err, user) {
            if (err) {
                response.status(500).send({ "msg": "Internal server error" });
            } else {
                if (user) {
                    response.status(200).send(user);
                } else {
                    response.status(404).send({ "msg": "Not found" });
                }
            }
        });
    } else {
        response.status(400).send({ "msg": "Bad parameter" });
    }
});

router_users.delete('/:id', function (request, response) {
    if ("id" in request.params) {
        user_queries.delete_user(request.params["id"], function (err, user) {
            if (err) {
                response.status(500).send({ "msg": "Internal server error" });
            } else {
                if (user) {
                    response.status(200).send({ "msg": "Successfully deleted record number : " + request.params["id"] });
                } else {
                    response.status(404).send({ "msg": "Not found" });
                }
            }
        });
    } else {
        response.status(400).send({ "msg": "Bad parameter" });
    }
});

module.exports.router_user = router_user;
module.exports.router_users = router_users;