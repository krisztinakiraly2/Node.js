// Delete a selected project

// This should delete all of the connecting time periods

module.exports = function (objectrepository) 
{
    return function (req, res, next) 
    {
        if (typeof res.locals.project === 'undefined') 
        {
            return next();
        }
        
        res.locals.project.deleteOne()
            .then(() => 
            {
                return res.redirect('/project?status=delete_success');
            })
                .catch((err) => 
                {
                    return next(err);
                });

    };
};