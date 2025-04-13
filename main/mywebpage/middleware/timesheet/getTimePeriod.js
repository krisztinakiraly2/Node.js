module.exports = function (objectrepository) {
    const requireOption = require('../common/requireOption');
    const TimeModel = requireOption(objectrepository, 'TimeModel');

    return function (req, res, next) 
    {
        const timeId = req.params.timesheetid;    

        if (!timeId) {
            return next();
        }

        TimeModel.findById(timeId)
            .then((time) => {
                if (!time) {
                    return next(new Error("Time entry not found"));
                }

                // Store the time entry in res.locals so it's available in the EJS template
                res.locals.time = time;

                return next();
            })
            .catch((err) => next(err));
    };
};