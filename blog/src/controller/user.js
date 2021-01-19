const loginCheck = (username, password) => {
    if(username === 'join' && password === 'key') {
        return true
    }
    return false
}

module.exports = {
    loginCheck
}