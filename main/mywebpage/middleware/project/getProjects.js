// list all the existing projects

module.exports = function (objectrepository) 
{
    const requireOption = require('../common/requireOption');
    const ProjectModel = requireOption(objectrepository, 'ProjectModel');
    
    return function (req, res, next) 
    {
        ProjectModel.find({})
            .then((projects) => 
                {
                    res.locals.projects = projects;
                    return next();
                })
                .catch((err) => next(err));
    };
};