// Loads one specific timeperiod for the edit
// This is also used for checking before deleting a time period

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) 
{
    const TimeModel = requireOption(objectrepository, 'TimeModel');

    return function (req, res, next) 
    {
        /*res.locals.time = 
        {
            timesheetid: '1',
            project_name: 'My important project',
            date: '2024-12-10',
            start: '10:30',
            end: '14:25',
            notes: 'Doing important stuff'
        };*/

        if (!req.params.timesheetid) 
        {
            return next();
        }

        if(req.url.includes('save') || req.url.includes('del'))
        {
            TimeModel.findOne({ _id: req.params.timesheetid})
            .then((time) => 
            {
                if (!time) 
                {
                    return next(new Error('Time not found'));
                }

                res.locals.time = time;
                return next();
            })
                .catch((err) => 
                {
                    console.log("Error during query:", err);
                    return next(err);
                });
        }
        else
        {
            TimeModel.findOne({ _id: req.params.timesheetid}).lean()
            .then((time) => 
            {
                if (!time) 
                {
                    return next(new Error('Time not found'));
                }

                res.locals.time = time;
                return next();
            })
                .catch((err) => 
                {
                    console.log("Error during query:", err);
                    return next(err);
                });
        }
    };
};