module.exports = function (objectrepository) 
{
    return function (req, res, next) 
    {
        if (typeof res.locals.time === 'undefined') 
        {
            return next();
        }
        
        res.locals.time.deleteOne()
            .then(() => 
            {
                return res.redirect('/timesheet?status=time_delete_success');
            })
            .catch((err) => next(err));
    };
};