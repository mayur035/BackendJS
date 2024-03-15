import uniqid from 'uniqid';
import data from '../model/data.json'
import fs from 'fs';
import { ERROR_MESSAGE, HTTP_STATUS_CODES, SUCCESS_MESSAGES } from '../constant';

export const handleGenerateNewShortURL = (req: any, res: any) => {
    const body = req.body;
    if (!body.url) return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: ERROR_MESSAGE._NotFound('URL') })

    const existingEntry = data.find((entry: any) => entry.originalUrl === body.url);
    if (existingEntry) {
        return res.status(HTTP_STATUS_CODES.CONFLICT).json({ error: ERROR_MESSAGE._Conflict('URL') });
    }
    const shortID = uniqid();
    let getData = {
        originalUrl: body.url,
        shortUrl: shortID,
    }
    data.push(getData)
    fs.writeFile('./model/data.json', JSON.stringify(data), () => {
        return res.render("home",
            {
                status: SUCCESS_MESSAGES._Ok('short url creation'),
                id: shortID
            })
    })
}
