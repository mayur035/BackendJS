//statefull auth

// const sessionIdToUserMap = new Map();
// const userSet = (id: string, user: string) => {
//     sessionIdToUserMap.set(id, user)
// }
// const userGet = (id: string) => {
//     return sessionIdToUserMap.get(id)
// }

interface User {
    email: string;
    password: string;
    role: string;
}
//using jwt token -- stateless auth
import jwt from 'jsonwebtoken'

const serectKey = 'anySecretkey@1'

const userSet = (user: User) => {
    return jwt.sign(user, serectKey)
}
const userGet = (token: string) => {
    if (!token) return null;
    try {
        return jwt.verify(token, serectKey)
    } catch (e) {
        console.log(e);
        return null
    }
}

export {
    userGet,
    userSet
}