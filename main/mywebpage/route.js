const changeRoute = require('./middleware/common/changeRoute');
const getCurrentWeek = require('./middleware/common/getCurrentWeek');
const getSelectedWeek = require('./middleware/common/getSelectedWeek');
const render = require('./middleware/common/render');
const getStatus = require('./middleware/common/getStatus');
const getPriority = require('./middleware/common/getPriority');
const requireOption = require('./middleware/common/requireOption')

const getTimePeriod = require('./middleware/timesheet/getTimePeriod');
const getTimePeriods = require('./middleware/timesheet/getTimePeriods');
const saveTimePeriod = require('./middleware/timesheet/saveTimePeriod');
const delTimePeriod = require('./middleware/timesheet/delTimePeriod');
const startTimer = require('./middleware/timesheet/startTimer');
const stopTimer = require('./middleware/timesheet/stopTimer');

const getProject = require('./middleware/project/getProject');
const getProjects = require('./middleware/project/getProjects');
const saveProject = require('./middleware/project/saveProject');
const delProject = require('./middleware/project/delProject');
const saveMsg = require('./middleware/common/getMsg');
const updateTotalTimes = require('./middleware/project/updateTotalTimes');
const sortProjects = require('./middleware/project/sortProjects');

const TimeModel = require('./models/time');
const ProjectModel = require('./models/project');
const getMsg = require('./middleware/common/getMsg');
const getColors = require('./middleware/common/getColors');

module.exports = function (app) {
    const objRepo = 
    {
        TimeModel: TimeModel,
        ProjectModel: ProjectModel
    };

    app.get(
        '/',
        changeRoute(objRepo, '/timesheet')
    );

    app.get(
        '/timesheet',
        getCurrentWeek(objRepo),
        saveMsg(objRepo),
        getProjects(objRepo),
        getTimePeriods(objRepo),
        render(objRepo, 'index')
    );

    app.use(
        '/timesheet/new',
        getProjects(objRepo),
        render(objRepo, 'time-add-edit')
    );

    app.use(
        '/timesheet/edit/:timesheetid',
        getProjects(objRepo),
        getCurrentWeek(objRepo),
        getTimePeriod(objRepo),
        render(objRepo, 'time-add-edit')
    );

    app.post(
        '/timesheet/save/:timesheetid?',
        getProjects(objRepo),
        getCurrentWeek(objRepo),
        getTimePeriods(objRepo),
        getTimePeriod(objRepo),
        saveTimePeriod(objRepo),
    );

    app.get(
        '/timesheet/del/:timesheetid',
        getTimePeriod(objRepo),
        delTimePeriod(objRepo)
    );

    app.use(
        '/stop_timer/:projectid',
        getProjects(objRepo),
        getCurrentWeek(objRepo),
        getTimePeriods(objRepo),
        getProject(objRepo),
        stopTimer(objRepo),
    );
    
    app.use(
        '/start_timer/:projectid',
        getProject(objRepo),
        startTimer(objRepo),
    );

    app.get(
        '/project',
        saveMsg(objRepo),
        getPriority(objRepo),
        getColors(objRepo),
        getStatus(objRepo),
        getProjects(objRepo),
        sortProjects(objRepo),
        getCurrentWeek(objRepo),
        updateTotalTimes(objRepo),
        render(objRepo, 'project')
    );
        
    app.get(
        '/project/new',
        getStatus(objRepo),
        getMsg(objRepo),
        getPriority(objRepo),
        getProjects(objRepo),
        (req, res) => 
        {
            const formData = req.session.formData || {};
            res.render('project-add-edit', { formData: formData });
        }
    );
        
    app.use(
        '/project/edit/:projectid',
        getStatus(objRepo),
        getMsg(objRepo),
        getPriority(objRepo),
        getProject(objRepo),
        getProjects(objRepo),
        render(objRepo, 'project-add-edit')
    );

    app.post(
        '/project/save/:projectid?',
        getProject(objRepo),
        getProjects(objRepo),
        saveProject(objRepo)
    );
        
    app.get(
        '/project/del/:projectid',
        getTimePeriod(objRepo),
        getProject(objRepo),
        delProject(objRepo)
    );
};