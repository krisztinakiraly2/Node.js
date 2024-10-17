// When adding a project to a specific week it need to know which one
// This mw passes the selected weeks date

module.exports = function (objectrepository) 
{
    return function (req, res, next) 
    {
        next();
    };
};