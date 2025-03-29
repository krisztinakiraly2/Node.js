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

        console.log(req.body);

        // Format date
        const formattedDate = req.body.date.replace(/\./g, '').trim().split(' ').join('-');
        
        // Default time if not provided
        let startTime = req.body.start;
        let endTime = req.body.end;

        // Validate time format (basic validation)
        const timeFormat = /^([01]?\d|2[0-3]):([0-5]\d)$/;
        if (!timeFormat.test(startTime) || (req.body.end && !timeFormat.test(endTime))) 
        {
            console.log("Invalid time format");
            return res.redirect('/timesheet/' + page);
        }

        // Convert to full datetime format
        const fullStartTime = `${formattedDate} ${startTime+ ":00"}`; // If no start time is provided, default to 1900-01-01 00:00:00
        let fullEndTime = '';
        if(req.body.end === '')
        {
            fullEndTime = '1900-01-01 00:00:00';
        }
        else
        {
            fullEndTime = `${formattedDate} ${endTime + ':00'}`;
        }

        console.log(fullStartTime,fullEndTime);

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
        res.locals.time.start = fullStartTime; // Store full timestamp as string
        res.locals.time.end = fullEndTime; // Store full timestamp as string

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
