const requireOption = require('../common/requireOption');
const mongoose = require('mongoose');
const moment = require('moment');

module.exports = function (objectrepository) {
    const TimeModel = requireOption(objectrepository, 'TimeModel');
    let status = '';
    let page = '';

    return function (req, res, next) {
        if (!res.locals.time) {
            page = 'new';
        } else {
            page = 'edit/' + req.path.split('/').pop();
        }

        // Check if all required fields are provided
        if (!req.body.project_name || !req.body.date || !req.body.start) {
            console.log("Missing required fields");
            return res.redirect('/timesheet/' + page);
        }

        const project = res.locals.projects.find(project => project._id.toString() === req.body.project_name);

        if (!project) {
            console.log("Project not found");
            return res.redirect('/timesheet/' + page);
        }

        // Format date and time correctly (YYYY-MM-DD HH:mm:ss)
        const formattedDate = req.body.date.replace(/\./g, '').trim().split(' ').join('-');

        const startDate = `${formattedDate} ${req.body.start}:00`;
        let endDate = req.body.end ? `${formattedDate} ${req.body.end}:00` : "1900-01-01 00:00:00";

        // Ensure valid date format
        if (!moment(startDate, "YYYY-MM-DD HH:mm:ss", true).isValid() || 
            (req.body.end && !moment(endDate, "YYYY-MM-DD HH:mm:ss", true).isValid())) {
            console.log("Invalid date or time format");
            return res.redirect('/timesheet/' + page);
        }

        // Ensure end time is after start time
        if (req.body.end && moment(endDate).isBefore(moment(startDate))) {
            console.log("End time must be at least the same as or after the start time");
            return res.redirect('/timesheet/' + page);
        }

        status = 'time_edit_success';

        // If time entry does not exist, create a new one
        if (!res.locals.time) {
            res.locals.time = new TimeModel();
            res.locals.time.tracked_time = 0;
            status = 'time_save_success';
        }

        // Assign project and time data to the time entry
        res.locals.time.project_name = new mongoose.Types.ObjectId(project._id);
        res.locals.time.start = startDate;
        res.locals.time.end = endDate;
        res.locals.time.notes = req.body.notes || '';

        // Save the time entry to the database
        res.locals.time.save()
            .then(() => {
                return res.redirect('/timesheet?status=' + status);
            })
            .catch((err) => {
                return next(err);
            });
    };
};