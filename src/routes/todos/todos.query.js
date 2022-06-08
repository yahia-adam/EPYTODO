const db = require("../../config/db");

module.exports.get_all_todos = function (callback) {
    var query = "SELECT id, title, description, created_at, due_time, user_id, status FROM todo";
    db.execute(query,[],function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            callback(err, results);
        });
}

module.exports.delete_todo = function (id, callback) {
    var query = "DELETE FROM todo WHERE id = ?";
    db.execute(query,[id],function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            if (results && results.affectedRows == 1) {
                callback(err, true);
            } else {
                callback(err, false);
            }
        });
}

module.exports.get_todo = function (id, callback) {
    var query = "SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE id = ?";
    db.execute(query,[id],function (err, results, fields) {
            if (err)
                console.log(err);
            if (results && results.length == 1)
                callback(err, results[0]);
            else
                callback(err, null);
        });
}

module.exports.create_todo = function (todo, callback) {
    var query = "INSERT INTO todo (title, description, due_time, status, user_id) VALUES (?,?,?,?,?)";
    db.execute(query,[todo.title, todo.description, todo.due_time, todo.status, todo.user_id],function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            console.log(results);
            if (results && results.length == 1) {
                callback(err, results[0]);
            } else {
                callback(err, null);
            }
        });
}

module.exports.get_all_todos_by_user = function (user_id, callback) {
    var query = "SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE user_id = ?";
    db.execute(query,[user_id],function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            callback(err, results);
        });
}

module.exports.update_todo = function (todo, callback) {
    var query = "UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?";
    db.execute(query,[todo.title, todo.description, todo.due_time, todo.user_id, todo.status, todo.id],function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            if (results && results.affectedRows == 1) {
                callback(err, true);
            } else {
                callback(err, false);
            }
        });
}
