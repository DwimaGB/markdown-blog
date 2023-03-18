
const express = require('express');
const router = express.Router();

const NotFoundError = require('../../utils/classes/usernameAlreadyExistsError');

const notFound = (err, req, res, next) => {
    if (err instanceof NotFoundError) {
        res.send(err);
    }
}

// module.exports = router;
module.exports = notFound;