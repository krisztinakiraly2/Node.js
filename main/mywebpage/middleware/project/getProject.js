// list one specific project
// all so used for checking before deleting a project

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) 
{
    const ProjectModel = requireOption(objectrepository, 'ProjectModel');
    
    return function (req, res, next) 
    {
        if (!req.params.projectid) 
        {
            return next();
        }
        
        ProjectModel.findOne({ _id: req.params.projectid })
            .then((project) => 
            {
                if (!project) 
                {
                    // If no project found, handle it
                    return next(new Error('Project not found'));
                }

                res.locals.project = project;
                return next();
            })
                .catch((err) => 
                {
                    console.log("Error during query:", err);
                    return next(err);
                });
    };
};