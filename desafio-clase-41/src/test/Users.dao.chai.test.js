import mongoose from 'mongoose'
import Users from '../dao/Users.dao.js'
import chai from 'chai'

const expect = chai.expect
const connection = mongoose.connect('mongodb://localhost:27017/coder51220')
const testUser = { first_name: 'Coder', last_name: 'House', email: 'coder51220@gmail.com', password: 'abc123'}

describe('Testing de Users.dao.js', () => {
    before(function () {
        this.user = new Users()
    })

    beforeEach(function () {
        mongoose.connection.collections.users_adoptmes.drop()
        this.timeout(5000)
    })

    // Test 1
    it('debe obtener los usuarios como array', async function () {
        const result = await this.user.get()
        expect(Array.isArray(result)).equals(true)
    })

    // Test 2
    it('debe cargar un nuevo usuario', async function () {
        const result = await this.user.save(testUser)
        expect(result._id).to.be.a('object')
    })

    // Test 3
    it('debe agregar un array vacío de mascotas al usuario', async function () {
        const result = await this.user.save(testUser)
        expect(result.pets).to.be.a('array')
    })

    // Test 4
    it('debe obtener un usuario indicando su email', async function () {
        const result = await this.user.save(testUser)
        const user = await this.user.getBy({ email: result.email })
        expect(user).to.be.a('object')
    })

    // Test 5
    it('debe borrar un usuario indicando su id', async function () {
        const result = await this.user.save(testUser)
        const deletedUser = await this.user.delete(result._id)
        expect(deletedUser).to.be.a('object')
    })
})