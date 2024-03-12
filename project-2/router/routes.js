"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("../controller/url");
const express_1 = __importDefault(require("express"));
const data = require('../model/data.json');
const router = express_1.default.Router();
router.post('/', url_1.handleGenerateNewShortURL);
router.get('/:shortID', (req, res) => {
    const shortid = req.params.shortID;
    const findURL = data.find((d) => d.short_url === shortid);
    return res.redirect(findURL.original_url);
});
module.exports = router;
