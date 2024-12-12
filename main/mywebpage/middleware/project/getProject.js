// list one specific project
// all so used for checking before deleting a project

module.exports = function (objectrepository) 
{
    return function (req, res, next) 
    {
        res.locals.project =
        {
            projectid: '1',
            name: 'My important project',
            status: 'In dev',
            priority: 'Low',
            tags: ['Group1', 'Group2'],
            tracked_time: '12h 12m',
            description: 'Important description'
        };

        return next();
    };
};