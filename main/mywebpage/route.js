const changeRoute = require('./middleware/common/changeRoute');
const getCurrentWeek = require('./middleware/common/getCurrentWeek');
const getSelectedWeek = require('./middleware/common/getSelectedWeek');
const render = require('./middleware/common/render');
const getStatus = require('./middleware/common/getStatus');
const getPriority = require('./middleware/common/getPriority');
const getTag = require('./middleware/common/getTag');
const saveStatus = require('./middleware/common/saveStatus');
const savePriority = require('./middleware/common/savePriority');
const saveTag = require('./middleware/common/saveTag');

const getTimePeriod = require('./middleware/timesheet/getTimePeriod');
const saveTimePeriod = require('./middleware/timesheet/saveTimePeriod');
const delTimePeriod = require('./middleware/timesheet/delTimePeriod');

const getAddedProject = require('./middleware/project/getAddedProject');
const getProject = require('./middleware/project/getProject');
const AddtoAddedProject = require('./middleware/project/AddToAddedProject');
const saveProject = require('./middleware/project/saveProject');
const delProject = require('./middleware/project/delProject');

module.exports = function (app) {
    const objRepo = {};

    app.get(
        '/',
        changeRoute(objRepo, '/timesheet')
    );

    app.get(
        '/timesheet',
        getCurrentWeek(objRepo),
        getAddedProject(objRepo),
        getTimePeriod(objRepo),
        render(objRepo, 'index')
    );

    app.use(
        '/timesheet/new',
        getProject(objRepo),
        saveTimePeriod(objRepo),
        render(objRepo, 'time-add')
    );

    app.use(
        '/timesheet/edit/:timesheetid',
        getTimePeriod(objRepo),
        getProject(objRepo),
        saveTimePeriod(objRepo),
        render(objRepo, 'time-edit')
    );

    app.get(
        '/timesheet/del/:timesheetid',
        getTimePeriod(objRepo),
        delTimePeriod(objRepo)
    );

    app.use(
        '/timesheet/add-project',
        getProject(objRepo),
        getSelectedWeek(objRepo),
        AddtoAddedProject(objRepo),
        render(objRepo,'time-project-add')
    );

    app.get(
        '/project',
        getProject(objRepo),
        render(objRepo, 'project')
    );
        
    app.use(
        '/project/new',
        getStatus(objRepo),
        getPriority(objRepo),
        getTag(objRepo),
        saveStatus(objRepo),
        savePriority(objRepo),
        saveTag(objRepo),
        saveProject(objRepo),
        render(objRepo, 'project-add')
    );
        
    app.use(
        '/project/edit/:projectid',
        getStatus(objRepo),
        getPriority(objRepo),
        getTag(objRepo),
        getProject(objRepo),
        saveStatus(objRepo),
        savePriority(objRepo),
        saveTag(objRepo),
        saveProject(objRepo),
        render(objRepo, 'project-edit')
    );
        
    app.get(
        '/project/del/:projectid',
        getTimePeriod(objRepo),
        getProject(objRepo),
        delProject(objRepo),
        render(objRepo, 'project-del')
    );
};