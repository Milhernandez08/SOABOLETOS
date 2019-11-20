const cry = require('crypto');

function proteger(pass) {
    const secret = 'abcdefghijklm@*+-{';
    const hash = cry.createHmac('sha256', secret).update(pass).digest('hex');
    return hash;
}

console.log(proteger("SoyLaMaestraDiana-.*"));
