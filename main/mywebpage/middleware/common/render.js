// it renders the requested page

module.exports = function (objectrepository, viewName) 
{
    return function (req, res) 
    {
        res.render(viewName);
        //res.send();
    };
};