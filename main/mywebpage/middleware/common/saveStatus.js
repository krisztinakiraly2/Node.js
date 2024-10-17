// save the new status to the database

module.exports = function (objectrepository) 
{
    return function (req, res, next) 
    {
        next();
    };
};