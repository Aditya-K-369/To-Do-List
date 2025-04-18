const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const token = jwt.sign(
        {
        email: user.email,
        id: user._id,
        name: user.name,
        },
        process.env.JWT_SECRET,
    );
    return token;
}
module.exports = generateToken;