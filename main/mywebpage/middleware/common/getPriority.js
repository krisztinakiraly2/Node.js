// loads all of the existing priorities to a list
// this is need for the drop-down menu

module.exports = function (objectrepository) {
    return function (req, res, next) {
        // Define priorities with both background color (bgcolor) and text color (text-color)
        res.locals.priorities = [
            { value: "Low", bgcolor: "#8cd982", textColor: "#267f34" },
            { value: "Medium", bgcolor: "#c5d982", textColor: "#7e7921" },
            { value: "High", bgcolor: "#d98282", textColor: "#501212" }
        ];
        return next();
    };
};