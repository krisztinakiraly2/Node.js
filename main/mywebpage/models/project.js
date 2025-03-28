const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Project = db.model
    ('Project',
        {
            //projectid: Number,
            name: String,
            status: String,
            priority: String,
            tags: [String],
            tracked_time: Number, //Stored in sec
            description: String,
            time_entries:
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Time'
                },
        }
    );

module.exports = Project;