
const UserModel = require("../Models/User");


function checkIfEmailExist(email) {
    UserModel.findOne({ where: { email: email } }).then((result) => {
        if (!result) {
            return false;
        } else {
            return true;
        }
    })
}

module.exports = checkIfEmailExist; 