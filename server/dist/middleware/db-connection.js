"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeForInput = exports.execute = exports.connection = void 0;
const mysql = require('mysql');
const db_1 = require("../config/db");
exports.connection = mysql.createConnection({
    host: db_1.cafe24DB.HOST,
    user: db_1.cafe24DB.USER,
    password: db_1.cafe24DB.PASSWORD,
    database: db_1.cafe24DB.DB,
    multipleStatements: true,
    insecureAuth: true,
    typeCast: function (field, next) {
        if (field.type === 'VAR_STRING') {
            return field.string();
        }
        else if (field.type === 'BLOB') {
            return field.string();
        }
        return next();
    }
});
const execute = (query) => {
    return new Promise((resolve, reject) => {
        exports.connection.query(query, function (err, rows) {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
};
exports.execute = execute;
const executeForInput = (query, value) => {
    return new Promise((resolve, reject) => {
        exports.connection.query(query, value, function (err, rows) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
};
exports.executeForInput = executeForInput;
