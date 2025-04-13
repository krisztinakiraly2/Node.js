// if the /project is called from a project edit or delete show that it was succesful
module.exports = function (objectrepository) 
{
    return function (req, res, next) 
    {
        const status = req.query.status;

        switch(status)
        {
            case 'project_save_success': res.locals.successMessage = 'Project successfully created!'; break;
            case 'project_edit_success': res.locals.successMessage = 'Project successfully edited!'; break;
            case 'project_delete_success': res.locals.successMessage = 'Project successfully deleted!'; break;

            case 'time_save_success': res.locals.successMessage = 'Time entry successfully created!'; break;
            case 'time_edit_success': res.locals.successMessage = 'Time entry successfully edited!'; break;
            case 'time_delete_success': res.locals.successMessage = 'Time entry successfully deleted!'; break;

            case 'project_name_existing': res.locals.myerror = "Project name already existing!"; break;

            case 'time_missing_input': res.locals.myerror = "Missing required fields!"; break;
            case 'time_end_is_before_start': res.locals.myerror = "Ending time can't be earlier than starting time"; break;
            case 'time_duration_too_much': res.locals.myerror = "Duration can only be less than 24 hours"; break;
        }
        
        return next();
    };
};
