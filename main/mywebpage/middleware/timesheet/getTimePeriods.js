module.exports = function (objectrepository) 
{
    const requireOption = require('../common/requireOption');
    const TimeModel = requireOption(objectrepository, 'TimeModel');
    const ProjectModel = requireOption(objectrepository, 'ProjectModel');
    const moment = require('moment');

    return function (req, res, next) 
    {
        if (!res.locals.currentWeek) 
        {
            return next(new Error("Current week data is missing"));
        }

        const { year, start_date, end_date } = res.locals.currentWeek;

        const startOfWeek = moment(`${year}-${res.locals.currentWeek.start_month + 1}-${start_date}`, "YYYY-MM-DD")
            .startOf('day')
            .format("YYYY-MM-DD HH:mm:ss");

        const endOfWeek = moment(`${year}-${res.locals.currentWeek.start_month + 1}-${end_date}`, "YYYY-MM-DD")
            .endOf('day')
            .format("YYYY-MM-DD HH:mm:ss");

        const filter = req.path.startsWith('/timesheet/save') 
            ? {} 
            : { 
                start: { 
                    $gte: startOfWeek, 
                    $lte: endOfWeek
                } 
            };

        TimeModel.find(filter)
            .lean()
            .then((times) => 
            {
                // Fetch all projects
                return ProjectModel.find({}).lean().then((projects) => {
                    // Create a map of projectId to projectName
                    const projectMap = projects.reduce((map, project) => {
                        map[project._id.toString()] = project.name; // Assuming 'name' is the project name field
                        return map;
                    }, {});

                    // Map the times to include the project name
                    times.forEach(time => {
                        // Replace the project_id with the actual project name
                        time.project_name = projectMap[time.project_name.toString()] || "Unknown Project";
                    });

                    // Now pass the resolved times and projects to locals
                    res.locals.times = times;
                    res.locals.projects = projects; // For rendering project list if needed
                    return next();
                });
            })
            .catch((err) => next(err));
    };
};
