// Start a timer on the project with the current time

module.exports = function (objectrepository) 
{
    const requireOption = require('../common/requireOption');
    const moment = require('moment');
    const TimeModel = requireOption(objectrepository, 'TimeModel');
    const mongoose = require('mongoose');
    
    return function (req, res, next) 
    {
        const fullStartTime = moment(new Date()).format('YYYY-MM-DD HH:mm')+":00";
        const fullEndTime = '1900-01-01 00:00:00';

        res.locals.time = new TimeModel();
        res.locals.time.project_name = new mongoose.Types.ObjectId(res.locals.project._id);
        res.locals.time.start = fullStartTime; // Store full timestamp as string
        res.locals.time.end = fullEndTime; // Store full timestamp as string

        res.locals.time.save()
            .then(() => {
                return res.redirect('/timesheet?status=time_timer_started');
            })
            .catch((err) => {
                return next(err);
            });
    };
};