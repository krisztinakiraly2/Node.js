// when reaching for the / page it redirects it to /timesheet

module.exports = function (objectrepository, goalRoute) 
{
    return function (req, res, next) 
    {
        return res.redirect(goalRoute);
    };
};