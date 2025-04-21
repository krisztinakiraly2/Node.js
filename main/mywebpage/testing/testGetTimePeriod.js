// should be run with: mocha testGetTimePeriod.js --delay
// with code coverage: nyc mocha testGetTimePeriod.js --delay

const getTimePeriod = require('../middleware/timesheet/getTimePeriod');

(async () => 
{
  const { expect } = await import('chai');

  describe('getTimePeriod middleware', function () 
  {
    it('should find TimePeriod', function (done) 
    {
      const mw = getTimePeriod
      ({
        TimeModel: 
        {
          findById: (id) =>
          {
            return Promise.resolve
            ({
              _id: '680676966ded3e6f2da28f2c',
              project_name: '67fc26d04a90958982d882f4',
              start: "2025-04-21 17:00:00",
              end: "2025-04-21 18:00:00",
              notes: "Project meeting"
            });
          }
        }
      });

      const req = 
      {
        params:
        {
          timesheetid: '680676966ded3e6f2da28f2c'
        }
      };

      const res = 
      {
        locals: {}
      };

      mw(req, res, () => 
      {
        const foundTime = res.locals.time;

        const expectedTime =
        {
            _id: '680676966ded3e6f2da28f2c',
            project_name: '67fc26d04a90958982d882f4',
            start: "2025-04-21 17:00:00",
            end: "2025-04-21 18:00:00", 
            notes: "Project meeting"
        }

        expect(foundTime).to.be.eql(expectedTime);

        done();
      });
    });
    
    it('should not find time object', function (done) 
    {
      const mw = getTimePeriod
      ({
        TimeModel: {}
      });

      const req = 
      {
        params: {}
      };

      const res = 
      {
        locals: {}
      };

      mw(req, res, (err) => 
      {
        expect(err).to.be.undefined;
        done();
      });
    });

    it('should not find timeId', function (done) 
    {
      const mw = getTimePeriod
      ({
        TimeModel: 
        {
          findById: (id) =>
          {
            return Promise.resolve(null);
          }
        }
      });

      const req = 
      {
        params: 
        {
          timesheetid: '680676966ded3e6f2da28f2c'
        }
      };

      const res = 
      {
        locals: {}
      };

      mw(req, res, (err) => 
      {
        expect(err).to.be.an('error');
        expect(err.message).to.equal('Time entry not found');
        done();
      });
    });

    it('should not find TimeModel', function (done) 
    {
      const req = 
      {
        params: 
        {
          timesheetid: '680676966ded3e6f2da28f2c'
        }
      };

      const res = 
      {
        locals: {}
      };

      try
      {
        const mw = getTimePeriod ({});
      }
      catch(err)
      {
        expect(err).to.be.an.instanceof(TypeError);
        expect(err.message).to.include('TimeModel required');
        done();
      }
    });

    it('should call next with an error', function (done) 
    {
      const mw = getTimePeriod
      ({
          TimeModel: 
          {
            findById: (id) => Promise.reject(new Error('Database error'))
          }
      });
    
      const req = 
      {
        params: 
        {
          timesheetid: '680676966ded3e6f2da28f2c'
        }
      };
    
      const res = 
      {
        locals: {}
      };
    
      mw(req, res, (err) => 
      {
        expect(err).to.be.an('error');
        expect(err.message).to.equal('Database error');
        done();
      });
    });
    
    // Todo: requireOption is missing
  });

  run();
})();
