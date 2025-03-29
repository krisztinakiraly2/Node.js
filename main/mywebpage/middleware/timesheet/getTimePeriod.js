module.exports = function (objectrepository) {
    const requireOption = require('../common/requireOption');
    const TimeModel = requireOption(objectrepository, 'TimeModel');

    return function (req, res, next) 
    {
        const timeId = req.params.timesheetid;    

        if (!timeId) {
            return next(new Error("No time entry ID provided in the URL"));
        }

        TimeModel.findById(timeId)
            .then((time) => {
                if (!time) {
                    return next(new Error("Time entry not found"));
                }

                // Store the time entry in res.locals so it's available in the EJS template
                res.locals.time = time;

                console.log("Fetched Time Entry:", time);
                return next();
            })
            .catch((err) => next(err));
    };
};