// Loads one specific timeperiod for the edit
// This is also used for checking before deleting a time period

module.exports = function (objectrepository) 
{
    return function (req, res, next) 
    {
        res.locals.time = 
        {
            timesheetid: '1',
            project_name: 'My important project',
            date: '2024-12-10',
            start: '10:30',
            end: '14:25',
            notes: 'Doing important stuff'
        };
        
        return next();
    };
};