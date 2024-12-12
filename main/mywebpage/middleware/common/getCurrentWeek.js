// When reloading the /timesheet it loads with the current week "selected"
// This mw adds the current date req body

module.exports = function (objectrepository) 
{
    return function (req, res, next) 
    {
        const today = new Date();
        const dayOfWeek = today.getDay(); // Day of the week (0-6, Sunday-Saturday)

        // Calculate the offset for Monday (start of the week)
        const startDiff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; 
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() + startDiff); // Adjust to the start of the week
        
        // Get the current month (1-based) and month abbreviation
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const currentMonthAbbr = monthNames[today.getMonth()];
        
        // Calculate the offset for Sunday (end of the week)
        const endDiff = 6 - dayOfWeek;
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + endDiff); // Adjust to Sunday

        // Store the result in res.locals.currentWeek
        res.locals.currentWeek = {
            month: currentMonthAbbr,
            start_date: startOfWeek.getDate(), // Get the day of the month (e.g., 2 for "Sept 2")
            end_date: endOfWeek.getDate() // Get the day of the month (e.g., 9 for "Sept 9")
        };

        return next();
    };
};