
const UsernameAlreadyExistsError = require('../utils/classes/usernameAlreadyExistsError');
const NotFoundError = require('../utils/classes/usernameAlreadyExistsError');


const errorHandler = (err, req, res, next) => {
    if (err instanceof UsernameAlreadyExistsError) {
        req.flash('error', err.message);
        // console.log(err);
        res.redirect('/signup');
    }
    else if (err instanceof NotFoundError) {
        res.send(err);
    }
    else {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = errorHandler;