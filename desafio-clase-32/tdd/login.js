const login = (user, pass) => {
    if (pass == null || pass === '') return 'No se ha proporcionado contraseña'
    if (user == null || user === '') return 'No se ha proporcionado usuario'
    if (pass !== '123') return 'Contraseña incorrecta'
    if (user !== 'coderUser') return 'Credenciales incorrectas'
    return 'Logueado'
}

let test
let passedTests = 0

console.log('T1: No se ha proporcionado contraseña si pass está vacío.')
if (login('vitto-tezza') === 'No se ha proporcionado contraseña') {
    passedTests++
    console.log('Passed')
} else {
    console.log('Failed')
}

console.log('T2: No se ha proporcionado usuario si user está vacío.')
if (login('', '123456') === 'No se ha proporcionado usuario') {
    passedTests++
    console.log('Passed')
} else {
    console.log('Failed')
}

console.log('T3: Contraseña incorrecta si pass es incorrecto.')
if (login('coderUser', 'abc123') === 'Contraseña incorrecta') {
    passedTests++
    console.log('Passed')
} else {
    console.log('Failed')
}

console.log('T4: Credenciales incorrectas si user es incorrecto.')
if (login('vitto-tezza', '123456') === 'Credenciales incorrectas') {
    passedTests++
    console.log('Passed')
} else {
    console.log('Failed')
}

console.log('T5: Logueado si user y pass coinciden.')
if (login('coderUser', '123') === 'Logueado') {
    passedTests++
    console.log('Passed')
} else {
    console.log('Failed')
}

console.log(`Tests superados: ${passedTests} de 5`)