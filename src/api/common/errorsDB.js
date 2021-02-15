const sendErrorsFromDB = (res, dbErrors) => {
    const errors = [];
    _.forIn(dbErrors, error => {
        errors.push(error.message)
        console.error(error.message)
    });
    return res.status(400).json({ errors })
}

module.exports = {
    sendErrorsFromDB
}