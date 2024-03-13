const uniqueID = require('uniqid')
import fs from 'fs';
const data = require('../model/data.json')

const handleGenerateNewShortURL = (req: any, res: any) => {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'URL is required' })

    const existingEntry = data.find((entry: any) => entry.original_url === body.url);
    if (existingEntry) {
        return res.status(400).json({ error: 'Short URL already exists for this URL' });
    }
    const shortID = uniqueID();
    let getData = {
        original_url: body.url,
        short_url: shortID,
    }
    data.push(getData)
    fs.writeFile('./model/data.json', JSON.stringify(data), () => {
        return res.render("home", {
            status: 'ShortID generated sucessfully!',
            id: shortID
        })
    })}


export {
    handleGenerateNewShortURL
}