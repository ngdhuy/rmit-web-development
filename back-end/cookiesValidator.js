const cookiesValidator = async (cookies) => {
    if(cookies.testCookie === '1000'){
        console.log('Cookie is valid');
    } else {
        throw new Error('Invalid cookie!');
    }
}

module.exports = cookiesValidator;