const sessionIdToUserMap = new Map();


const userSet = (id: string, user: string) => {
    sessionIdToUserMap.set(id, user)
}
const userGet = (id: string) => {
    return sessionIdToUserMap.get(id)
}

export {
    userGet,
    userSet
}