"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictToLoggedInUserOnly = void 0;
const auth_1 = require("../services/auth");
const restrictToLoggedInUserOnly = (req, res, next) => {
    var _a;
    const userId = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.uid;
    if (!userId)
        return res.redirect('/login');
    const user = (0, auth_1.userGet)(userId);
    if (!user)
        return res.redirect('/login');
    req.user = user;
    next();
};
exports.restrictToLoggedInUserOnly = restrictToLoggedInUserOnly;
