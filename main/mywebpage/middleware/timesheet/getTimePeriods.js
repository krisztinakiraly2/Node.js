// Loads all of the time periods that was made on the 
// selected week, the connecting project must be added 
// to the view

module.exports = function (objectrepository) 
{
    return function (req, res, next) 
    {
        res.locals.times =
        [
            {
                timesheetid: '1',
                project_name: 'My important project',
                date: '2024-12-10',
                start: '10:30',
                end: '14:55',
                has_note: 'true'
            },
            {
                timesheetid: '2',
                project_name: 'My important project',
                date: '2024-12-12',
                start: '10:00',
                end: '16:42',
                has_note: 'false'
            },
            {
                timesheetid: '4',
                project_name: 'My important project',
                date: '2024-12-15',
                start: '13:05',
                end: '14:10',
                has_note: 'true'
            }
        ]

        return next();
    };
};