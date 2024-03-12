"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGenerateNewShortURL = void 0;
const uniqueID = require('uniqid');
const fs_1 = __importDefault(require("fs"));
const data = require('../model/data.json');
const handleGenerateNewShortURL = (req, res) => {
    const body = req.body;
    if (!body.url)
        return res.status(400).json({ error: 'URL is required' });
    const existingEntry = data.find((entry) => entry.original_url === body.url);
    if (existingEntry) {
        return res.status(400).json({ error: 'Short URL already exists for this URL' });
    }
    const shortID = uniqueID();
    let getData = {
        original_url: body.url,
        short_url: shortID,
    };
    data.push(getData);
    fs_1.default.writeFile('./model/data.json', JSON.stringify(data), () => {
        return res.json({
            status: 'ShortID generated sucessfully!',
            id: shortID
        });
    });
};
exports.handleGenerateNewShortURL = handleGenerateNewShortURL;
