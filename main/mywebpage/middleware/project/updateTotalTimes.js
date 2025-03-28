// When loading the project page update the total times in db

module.exports = function (objectrepository) {
    const requireOption = require('../common/requireOption');
    const TimeModel = requireOption(objectrepository, 'TimeModel');
    const ProjectModel = requireOption(objectrepository, 'ProjectModel');

    return async function (req, res, next) {
        try {
            // Get all projects
            const projects = await ProjectModel.find({});

            // Loop through each project to calculate total tracked time
            for (let project of projects) {
                const times = await TimeModel.find({ project_name: project._id });

                let totalTrackedTime = times.reduce((sum, time) => {
                    const start = new Date(time.start);
                    const end = new Date(time.end);
                    const durationMinutes = (end - start) / (1000 * 60); // Convert milliseconds to minutes

                    return sum + durationMinutes;
                }, 0);

                // Update the project's tracked_time in the database
                await ProjectModel.updateOne({ _id: project._id }, { tracked_time: totalTrackedTime });
            }

            next();
        } catch (err) {
            next(err);
        }
    };
};