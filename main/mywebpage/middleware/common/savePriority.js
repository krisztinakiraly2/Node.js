// save the new priority to the database

module.exports = function (objectrepository) 
{
    return function (req, res, next) 
    {
        next();
    };
};