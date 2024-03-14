//statefull auth

// const sessionIdToUserMap = new Map();
// const userSet = (id: string, user: string) => {
//     sessionIdToUserMap.set(id, user)
// }
// const userGet = (id: string) => {
//     return sessionIdToUserMap.get(id)
// }


//using jwt token -- stateless auth
import jwt from 'jsonwebtoken'

const serectKey = 'anySecretkey@1'

const userSet = (user: any) => {
    return jwt.sign(user, serectKey)
}
const userGet = (token: any) => {
    if (!token) return null;
    return jwt.verify(token, serectKey)
}

export {
    userGet,
    userSet
}