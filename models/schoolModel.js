const db = require('../config/dbConfig');

const School = {};

// Create a new school
School.create = (newSchool) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO schools SET ?", newSchool, (err, res) => {
            if (err) {
                console.log("error: ", err);
                return reject(err);
            }
            resolve({ id: res.insertId, ...newSchool });
        });
    });
};

// Get all schools
School.getAll = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM schools", (err, res) => {
            if (err) {
                console.log("error: ", err);
                return reject(err);
            }
            resolve(res);
        });
    });
};

module.exports = School;

