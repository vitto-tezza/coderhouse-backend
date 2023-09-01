
import { createHash } from '../utils.js'

export default class UserDTO {
    constructor(data) {       
        this.autoId = Date.now() + Math.floor(Math.random() * 10000 + 1);
        this.name = data.name
        this.email = data.email
        this.pass = createHash(data.pass)
        this.role = data.role === 'admin' || data.role === 'user' ? data.role : 'user'
        this.orders = []
    }
}