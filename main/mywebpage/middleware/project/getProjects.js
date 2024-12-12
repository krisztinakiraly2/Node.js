// list all the existing projects

module.exports = function (objectrepository) 
{
    return function (req, res, next) 
    {
        res.locals.projects =
        [
            {
                projectid: '1',
                name: 'My important project',
                status: 'In dev',
                priority: 'Low',
                tags: ['Group1', 'Group2'],
                tracked_time: '12h 12m',
                description: 'Important description'
            },
            {
                projectid: '2',
                name: 'Project 2',
                status: 'In dev',
                priority: 'Medium',
                tags: [],
                tracked_time: '0h 0m',
                description: 'Important description'
            },
        ]
        
        return next();
    };
};