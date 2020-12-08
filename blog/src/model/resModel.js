// 基类Model
class BaseModel {
    constructor(data, message) {
        if(typeof data === 'string') {
            this.message = data
            data = null
            message = null
        }
        if(data) {
            this.data = data
        }
        if(message) {
            this.message = message
        }
    }
}

// successModel
class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.code = 0
    }
}

// errorModel
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.code = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}