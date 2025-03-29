const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Time = db.model
    ('Time',
        {
            //timesheetid: Number,
            project_name: 
                {
                  type: Schema.Types.ObjectId,
                  ref: 'Project'  
                },
            start: String,
            end: String,
            notes: String,
        }
    );

module.exports = Time;