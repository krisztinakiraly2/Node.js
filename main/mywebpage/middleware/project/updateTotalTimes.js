// When loading the project page update the total times in db

module.exports = function (objectrepository) 
{
    const requireOption = require('../common/requireOption');
    const TimeModel = requireOption(objectrepository, 'TimeModel');
    const ProjectModel = requireOption(objectrepository, 'ProjectModel');

    return async function (req, res, next) 
    {
        try 
        {
            const projects = await ProjectModel.find({});
            const now = new Date(); // Current time

            for (let project of projects) 
            {
                const times = await TimeModel.find({ project_name: project._id });

                let totalTrackedTime = 0;

                for (let time of times) 
                {
                    const start = new Date(time.start);
                    let end = new Date(time.end);

                    // If end is set to 1900-01-01 or any invalid value, use `now`
                    if (isNaN(end.getTime()) || end.getFullYear() < 1970) 
                    {
                        end = now;
                    }

                    // Ensure valid start and end dates
                    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) 
                    {
                        console.warn(`Skipping invalid entry for project ${project.name}`);
                        continue;
                    }

                    const durationMinutes = Math.round((end - start) / (1000 * 60)); // Convert to minutes
                    totalTrackedTime += Math.max(durationMinutes, 0);
                }

                console.log(`Updating ${project.name}: ${totalTrackedTime} minutes`);

                await ProjectModel.updateOne
                (
                    { _id: project._id },
                    { $set: { tracked_time: totalTrackedTime } }
                );
            }

            next();
        } 
        catch (err) 
        {
            console.error("Error updating tracked time:", err);
            next(err);
        }
    };
};