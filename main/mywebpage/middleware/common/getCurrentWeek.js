// When reloading the /timesheet it loads with the current week "selected"
// This mw adds the current date req body

module.exports = function (objectrepository) 
{
    return function (req, res, next) 
    {
        next();
    };
};