// Sort projects by status order first, then alphabetically by name

module.exports = function () 
{
    return function (req, res, next) 
    {
        if (!res.locals.projects || !res.locals.statuses) 
        {
            return next(new Error("Projects or statuses not loaded"));
        }

        // Create a mapping of status values to their order
        const statusOrder = res.locals.statuses.map(s => s.value);

        res.locals.projects.sort((a, b) => 
        {
            const statusA = statusOrder.indexOf(a.status);
            const statusB = statusOrder.indexOf(b.status);

            if (statusA === statusB) 
            {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            }
            return statusA - statusB;
        });

        return next();
    };
};
