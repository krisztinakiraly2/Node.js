// it renders the requested page

const moment = require("moment-timezone");

module.exports = (objRepo, viewName) => {
    return (req, res) => {
        res.locals.moment = moment;
        res.render(viewName, res.locals);
    };
};