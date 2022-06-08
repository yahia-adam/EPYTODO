const db = require("../../config/db");
var bcrypt = require('bcryptjs');


module.exports.register = function (email, name, firstname, password, callback) {
    bcrypt.hash(password, 10, function (err, hash) {
        if (err)
            console.log(err);
        db.execute("INSERT INTO `user` (`email`, `password`, `name`, `firstname`) VALUES (?,?,?,?)",[email, hash, name, firstname],function (err, results, fields) {
                if (err) {
                    console.log(err);
                }
                callback(err, results);
            });
    });
}

module.exports.login = function (email, password, callback) {
    db.execute("SELECT id, email, password, firstname, name FROM user WHERE email = ?",[email],function (err, results, fields) {
            if (err) {
                console.log(err);
                callback(err, false);
            }
            if (results.length == 1) {
                bcrypt.compare(password, results[0]["password"], function (err, res) {
                    if (err) {
                        console.log(err);
                    }

                    callback(err, res);
                });
            } else {
                callback(err, false);
            }
        });
}
