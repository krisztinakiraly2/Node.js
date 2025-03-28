// Loads all of the time periods that was made on the 
// selected week, the connecting project must be added 
// to the view

module.exports = function (objectrepository) 
{
    const requireOption = require('../common/requireOption');
    const TimeModel = requireOption(objectrepository, 'TimeModel');

    return function (req, res, next) 
    {
        const mongoose = require('mongoose');

        if (!res.locals.currentWeek) 
        {
            return next(new Error("Current week data is missing"));
        }

        const { year, start_date, end_date } = res.locals.currentWeek;

        const filter = req.path.startsWith('/timesheet/save') 
        ? {} // Load all time entries when saving
        : { 
            start: { 
                $gte: new Date(year, res.locals.currentWeek.start_month, start_date), 
                $lte: new Date(year, res.locals.currentWeek.start_month, end_date, 23, 59, 59) 
            } 
        };

        TimeModel.find(filter)
        .lean()
        .then((times) => 
        {
            res.locals.times = times;

            res.locals.times.forEach(time => 
            {
                const project = res.locals.projects.find(p => p.id.toString() === time.project_name.toString());

                if (project) 
                {
                    time.project_name = project.name;
                }
            });

            return next();
        })
        .catch((err) => next(err));
    };
};