"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGenerateNewShortURL = void 0;
const uniqid_1 = __importDefault(require("uniqid"));
const data_json_1 = __importDefault(require("../model/data.json"));
const fs_1 = __importDefault(require("fs"));
const constant_1 = require("../constant");
const handleGenerateNewShortURL = (req, res) => {
    const body = req.body;
    if (!body.url)
        return res.status(constant_1.HTTP_STATUS_CODES.NOT_FOUND).json({ error: constant_1.ERROR_MESSAGE._NotFound('URL') });
    const existingEntry = data_json_1.default.find((entry) => entry.originalUrl === body.url);
    if (existingEntry) {
        return res.status(constant_1.HTTP_STATUS_CODES.CONFLICT).json({ error: constant_1.ERROR_MESSAGE._Conflict('URL') });
    }
    const shortID = (0, uniqid_1.default)();
    let getData = {
        originalUrl: body.url,
        shortUrl: shortID,
    };
    data_json_1.default.push(getData);
    fs_1.default.writeFile('./model/data.json', JSON.stringify(data_json_1.default), () => {
        return res.render("home", {
            status: constant_1.SUCCESS_MESSAGES._Ok('short url creation'),
            id: shortID
        });
    });
};
exports.handleGenerateNewShortURL = handleGenerateNewShortURL;
