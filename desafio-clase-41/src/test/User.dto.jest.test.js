import {test, expect } from '@jest/globals'
import userDTO from '../dto/User.dto.js'

describe('Testing de User.dto.js (Jest)', () => {
    // Test 1
    test('debe unificar nombre y apellido', async function () {
        const user = { first_name: 'Coder', last_name: 'House', role: 'academy', email: 'coderhouse@gmail.com' }
        const userDto = userDTO.getUserTokenFrom(user);
        expect(userDto.name).toEqual(`${user.first_name} ${user.last_name}`)
    })

    // Test 2
    test('debe filtrar campos sensibles (password)', async function () {
        const user = { first_name: 'Coder', last_name: 'House', role: 'academy', email: 'coderhouse@gmail.com', password: 'abc123' }
        const userDto = userDTO.getUserTokenFrom(user);
        expect(userDto).not.toHaveProperty('password')
    })
})