const express = require("express");
var router = express.Router();
const todo_queries = require("./todos.query");

router.delete('/:id', function (request, response) {
    if ("id" in request.params) {
        todo_queries.delete_todo(request.params["id"], function (err, todo) {
            if (err) {
                response.status(500).send({ "msg": "Internal server error" });
            } else {
                response.status(200).send({ "msg": "Successfully deleted record number : " + request.params["id"] });
            }
        });
    } else {
        response.status(400).send({ "msg": "Bad parameter" });
    }
});

router.get('/', function (request, response) {
    todo_queries.get_all_todos(function (err, todos) {
        if (err) {
            response.status(500).send({ "msg": "Internal server error" });
        } else {
            response.status(200).send(todos);
        }
    });
});

router.post('/', function (request, response) {
    if ("title" in request.body && "description" in request.body && "due_time" in request.body && "status" in request.body && "user_id" in request.body) {
        todo_queries.create_todo(request.body, function (err, todo) {
            if (err) {
                response.status(500).send({ "msg": "Internal server error" });
            } else {
                response.status(201).send(todo);
            }
        });
    } else {
        response.status(400).send({ "msg": "Bad parameter" });
    }
});

router.put('/:id', function (request, response) {
    if ("title" in request.body && "description" in request.body && "due_time" in request.body && "status" in request.body && "user_id" in request.body) {
        var todo = request.body;
        todo["id"] = request.params.id;
        todo_queries.update_todo(todo, function (err, todo) {
            if (err) {
                response.status(500).send({ "msg": "Internal server error" });
            } else {
                response.status(200).send(todo);
            }
        });
    } else {
        response.status(400).send({ "msg": "Bad parameter" });
    }
});

router.get('/:id', function (request, response) {
    if ("id" in request.params) {
        todo_queries.get_todo(request.params["id"], function (err, todo) {
            if (err) {
                response.status(500).send({ "msg": "Internal server error" });
            } else {
                if (todo) {
                    response.status(200).send(todo);
                } else {
                    response.status(404).send({ "msg": "Not found" });
                }
            }
        });
    } else {
        response.status(400).send({ "msg": "Bad parameter" });
    }
});

module.exports = router;
