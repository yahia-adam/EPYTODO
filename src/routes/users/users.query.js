const db = require("../../config/db");
var bcrypt = require('bcryptjs');

module.exports.delete_user = function (id, callback) {
    var query = "DELETE FROM user WHERE id = ?";
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

module.exports.update_user = function (id, user, callback) {
    var query = "UPDATE user SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?;";
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            console.log(err);
        }
        db.execute(query,[user.email, hash, user.name, user.firstname, id],
            function (err, results, fields) {
                if (err) {
                    callback(err, null);
                } else {
                    module.exports.get_user(user.email, callback);
                }
            });
    });
}

module.exports.get_user = function (id, callback) {
    if (parseInt(id)) {
        var query = "SELECT id, email, password, firstname, name, created_at FROM user WHERE id = ?";
    } else {
        var query = "SELECT id, email, password, firstname, name, created_at FROM user WHERE email = ?";
    }
    db.execute(query,[id],function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            if (results && results.length == 1) {
                callback(err, results[0]);
            } else {
                callback(err, null);
            }
        });
}
