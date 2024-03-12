import { handleGenerateNewShortURL } from "../controller/url";
import express from 'express';
const data = require('../model/data.json')


const router = express.Router();

router.post('/', handleGenerateNewShortURL);

router.get('/:shortID', (req: any, res: any) => {
    const shortid = req.params.shortID;
    const findURL = data.find((d: any) => d.short_url === shortid)
    return res.redirect(findURL.original_url)
})

module.exports = router;