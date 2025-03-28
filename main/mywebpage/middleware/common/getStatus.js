// loads all of the existing statuses to a list
// this is need for the drop-down menu

module.exports = function (objectrepository) 
{
    return function (req, res, next) 
    {
        res.locals.statuses = 
        [
            { value: "To do", bgcolor: "#BCB2FF", textColor: "#6e5fc7" },
            { value: "In dev", bgcolor: "#99CDFD", textColor: "#105a9e" },
            { value: "In review", bgcolor: "#d67cb6", textColor: "#d1419e" },
            { value: "Done", bgcolor: "#8cd982", textColor: "#267f34" }
        ];
        return next();
    };
};