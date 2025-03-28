// When reloading the /timesheet it loads with the current week "selected"
// This mw adds the current date req body

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const today = new Date();
        let weekOffset = parseInt(req.query.weekOffset, 10) || 0; // Default is 0

        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + weekOffset * 7); // Adjust by weeks

        const dayOfWeek = currentDate.getDay();
        const startDiff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() + startDiff);

        const endDiff = (dayOfWeek === 0 ? 0 : 7) - dayOfWeek;
        const endOfWeek = new Date(currentDate);
        endOfWeek.setDate(currentDate.getDate() + endDiff);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        res.locals.currentWeek = 
        {
            year: startOfWeek.getFullYear(),
            month: monthNames[startOfWeek.getMonth()],
            start_month: startOfWeek.getMonth(),
            start_date: startOfWeek.getDate(),
            end_date: endOfWeek.getDate(),
            weekOffset
        };

        return next();
    };
};