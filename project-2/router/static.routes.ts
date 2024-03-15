import { Router } from 'express'
import { restrictTo } from '../middlewares/auth';
import data from '../model/data.json';
import { ROLE } from '../constant';

export const staticRouter = Router();

staticRouter.get('/', restrictTo([ROLE.Admin, ROLE.Normal]), (req: any, res: any) => {
    return res.render('home', {
        urls: data
    })
})

staticRouter.get('/admin/url', restrictTo([ROLE.Admin]), (req, res) => {
    return res.send("Admin only")
})
staticRouter.get('/signup', (req, res) => {
    return res.render('signup')
})
staticRouter.get('/login', (req, res) => {
    return res.render('login')
})
