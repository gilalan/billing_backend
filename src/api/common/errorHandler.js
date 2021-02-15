const _ = require('lodash');

module.exports = (req, res, next) => {

    //console.log("#### ErrorMiddleware #####");
    const bundle = res.locals.bundle;
    if (bundle.errors) {
                
        const errors = parseErrors(bundle.errors);
        res.status(500).json({ errors });

    } else {
        next();
    }
}

const parseErrors = (bundleErrors) => {

    const errors = [];
    _.forIn(bundleErrors, error => {
        errors.push(error.message)
        console.error(error.message)
    });
    return errors;
}