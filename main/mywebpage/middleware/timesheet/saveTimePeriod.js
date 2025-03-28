const requireOption = require('../common/requireOption');
const mongoose = require('mongoose');

module.exports = function (objectrepository) 
{
    const TimeModel = requireOption(objectrepository, 'TimeModel');
    let status = '';
    let page = '';

    return function (req, res, next) 
    {
        if (typeof res.locals.time === 'undefined') 
        {
            page = 'new';
        } 
        else 
        {
            page = 'edit/' + req.path.split('/').pop();
        }

        // Check if required fields are present
        if (!req.body.project_name || !req.body.date || !req.body.start) 
        {
            res.location(req.get("Referrer") || "/");
            console.log("Missing required fields");
            return res.redirect('/timesheet/' + page);
        }

        const project = res.locals.projects.find(project => project._id.toString() === req.body.project_name);

        if (!project) 
        {
            res.location(req.get("Referrer") || "/");
            console.log("Project not found");
            return res.redirect('/timesheet/' + page);
        }

        // Format date
        const formattedDate = req.body.date.replace(/\./g, '').trim().split(' ').join('-');
        const startDate = new Date(`${formattedDate}T${req.body.start}:00.000Z`);

        let endDate;
        if (req.body.end) 
        {
            endDate = new Date(`${formattedDate}T${req.body.end}:00.000Z`);

            if (isNaN(endDate.getTime())) 
            {
                console.log("Invalid end time format");
                return res.redirect('/timesheet/' + page);
            }

            if (endDate < startDate) 
            {
                console.log("End time must be at least the same as or after the start time");
                return res.redirect('/timesheet/' + page);
            }
        } 
        else 
        {
            endDate = new Date("1900-01-01T00:00:00.000Z"); // Default end time
        }

        status = 'time_edit_success';

        // If time entry is not provided, create a new one
        if (typeof res.locals.time === 'undefined') 
        {
            res.locals.time = new TimeModel();
            res.locals.time.tracked_time = 0;
            status = 'time_save_success';
        }

        // Assign project and time data to the time entry
        res.locals.time.project_name = new mongoose.Types.ObjectId(project._id);
        res.locals.time.start = startDate;
        res.locals.time.end = endDate;

        // Assign notes if provided
        if (typeof req.body.notes !== 'undefined') 
        {
            res.locals.time.notes = req.body.notes;
        }

        // Save the time entry
        res.locals.time.save()
            .then(() => {
                return res.redirect('/timesheet?status=' + status);
            })
            .catch((err) => {
                return next(err);
            });
    };
};