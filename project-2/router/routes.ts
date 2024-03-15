import { handleGenerateNewShortURL } from "../controller/url";
import express from 'express';
const data = require('../model/data.json')

export const urlRouter = express.Router();

urlRouter.post('/', handleGenerateNewShortURL);

urlRouter.get('/:shortID', (req: any, res: any) => {
    const shortid = req.params.shortID;
    const findURL = data.find((data: any) => data.shortUrl === shortid)
    return res.redirect(findURL.originalUrl)
})

