"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSet = exports.userGet = void 0;
const sessionIdToUserMap = new Map();
const userSet = (id, user) => {
    sessionIdToUserMap.set(id, user);
};
exports.userSet = userSet;
const userGet = (id) => {
    return sessionIdToUserMap.get(id);
};
exports.userGet = userGet;
