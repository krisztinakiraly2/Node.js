module.exports = function (objectrepository) 
{
    const requireOption = require('../common/requireOption');
    
    return function (req, res, next) 
    {
        res.locals.colors = 
        [
            { value: "Purple", bgcolor: "#BCB2FF", textColor: "#6e5fc7" },
            { value: "Blue", bgcolor: "#99CDFD", textColor: "#105a9e" },
            { value: "Pink", bgcolor: "#d67cb6", textColor: "#d1419e" },
            { value: "Green", bgcolor: "#8cd982", textColor: "#267f34" },
            { value: "Red", bgcolor: "#FFCDD2", textColor: "#B71C1C" },
            { value: "Yellow", bgcolor: "#FFF9C4", textColor: "#F57F17" },
            { value: "Orange", bgcolor: "#FFE0B2", textColor: "#E65100" },
            { value: "Turquoise", bgcolor: "#B2EBF2", textColor: "#006064" },
            { value: "Teal", bgcolor: "#80CBC4", textColor: "#004D40" },
            { value: "Brown", bgcolor: "#D7CCC8", textColor: "#4E342E" },
            { value: "Gray", bgcolor: "#CFD8DC", textColor: "#37474F" },
            { value: "Indigo", bgcolor: "#C5CAE9", textColor: "#303F9F" },
            { value: "Lime", bgcolor: "#F0F4C3", textColor: "#827717" },
            { value: "Cyan", bgcolor: "#B2EBF2", textColor: "#006064" }
        ];
        return next();
    };
};