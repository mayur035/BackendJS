"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlRouter = void 0;
const url_1 = require("../controller/url");
const express_1 = __importDefault(require("express"));
const data = require('../model/data.json');
const urlRouter = express_1.default.Router();
exports.urlRouter = urlRouter;
urlRouter.post('/', url_1.handleGenerateNewShortURL);
urlRouter.get('/:shortID', (req, res) => {
    const shortid = req.params.shortID;
    const findURL = data.find((d) => d.short_url === shortid);
    return res.redirect(findURL.original_url);
});
