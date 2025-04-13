// Stop a timer on the project that has an ongoing timer

module.exports = function (objectrepository) 
{
    const requireOption = require('../common/requireOption');
    const moment = require('moment');
    const TimeModel = requireOption(objectrepository, 'TimeModel');
    const mongoose = require('mongoose');
    
    return function (req, res, next) 
    {
        const { year, start_date, end_date } = res.locals.currentWeek;

        const startOfWeek = moment(`${year}-${res.locals.currentWeek.start_month + 1}-${start_date}`, "YYYY-MM-DD")
            .startOf('day')
            .format("YYYY-MM-DD HH:mm:ss");

        const endOfWeek = moment(`${year}-${res.locals.currentWeek.start_month + 1}-${end_date}`, "YYYY-MM-DD")
            .endOf('day')
            .format("YYYY-MM-DD HH:mm:ss");

        const filter = 
        { 
            start: 
            { 
                $gte: startOfWeek, 
                $lte: endOfWeek
            },
            end:
            {
                $eq: '1900-01-01 00:00:00'
            }
        };

        TimeModel.findOne(filter)
            .then((time) => 
            {
                res.locals.time = time;

                res.locals.time.end = moment(new Date()).format('YYYY-MM-DD HH:mm')+":00";

                res.locals.time.save()
                    .then(() => {
                        return res.redirect('/timesheet?status=time_timer_stopped');
                    })
                    .catch((err) => {
                        return next(err);
                    });
            })
            .catch((err) => next(err));
    };
};