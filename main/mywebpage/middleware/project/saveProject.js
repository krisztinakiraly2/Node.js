// Save the data provided in the form to the database

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) 
{
    const ProjectModel = requireOption(objectrepository, 'ProjectModel');
    let status = '';

    return function (req, res, next) 
    {
        if (!req.body.name || !req.body.status || !req.body.priority) 
        {
            return res.redirect(req.get("Referrer") || "/");
        }

        const existingProject = res.locals.projects.find(project => project.name.toLowerCase() === req.body.name.toLowerCase());

        // If a project with the same name exists and we're not editing it, prevent creation
        if (existingProject && (!res.locals.project || res.locals.project._id.toString() !== existingProject._id.toString())) 
        {
           return res.redirect(req.get("Referrer") || "/");
        }

        status = res.locals.project ? 'project_edit_success' : 'project_save_success';

        if (typeof res.locals.project === 'undefined') 
        {
            res.locals.project = new ProjectModel();
            res.locals.project.tracked_time = 0;
        }

        res.locals.project.name = req.body.name;
        res.locals.project.status = req.body.status;
        res.locals.project.priority = req.body.priority;

        if (req.body.tags && typeof req.body.tags === 'string') 
        {
            res.locals.project.tags = req.body.tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);
        } 
        else 
        {
            res.locals.project.tags = [];
        }        

        if (typeof req.body.description !== 'undefined')
        {
            res.locals.project.description = req.body.description;
        }

        res.locals.project.save()
            .then(() => 
            {
                return res.redirect('/project?status=' + status);
            })
            .catch((err) => 
            {
                return next(err);
            });
    };
};