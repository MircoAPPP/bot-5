const { verifyToken } = require('../../utils/tokenUtils'); // Supponendo che la funzione verifyToken sia esportata da qui

exports.handler = async (event) => {
    const { userToken, staffToken, ticketId, userId } = JSON.parse(event.body);

    const isValid = verifyToken(userToken, staffToken, ticketId, userId);

    return {
        statusCode: isValid ? 200 : 401,
        body: JSON.stringify({ valid: isValid })
    };
};