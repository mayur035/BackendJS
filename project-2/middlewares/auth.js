"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForAuthentication = void 0;
const auth_1 = require("../services/auth");
const checkForAuthentication = (req, res, next) => {
    req.user = null;
    const authorizationValue = req.headers['authorization'];
    if (!authorizationValue || !authorizationValue.startsWith('Bearer')) {
        return next();
    }
    const token = authorizationValue.split('Bearer ')[1];
    const user = (0, auth_1.userGet)(token);
    req.user = user;
    return next();
};
exports.checkForAuthentication = checkForAuthentication;
