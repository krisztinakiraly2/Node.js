// should be run with: mocha testSortProjects.js --delay
// with code coverage: nyc mocha testSortProjects.js --delay

const sortProjects = require('../middleware/project/sortProjects');

(async () => 
{
  const { expect } = await import('chai');

  describe('sortProjects middleware', function () 
  {
    it('should sort projects', function (done) 
    {
      const mw = sortProjects ({});

      const req = {};
      const res = 
      {
        locals:
        {
          projects: 
          [
            { name: "test7", status: "Done"},
            { name: "test2", status: "To do"},
            { name: "test5", status: "In review"},
            { name: "test4", status: "In dev"},
            { name: "test8", status: "Done"},
            { name: "test1", status: "To do"},
            { name: "test3", status: "In dev"},
            { name: "test6", status: "In review"}
          ],
          statuses: 
          [
            { value: "To do", bgcolor: "#BCB2FF", textColor: "#6e5fc7" },
            { value: "In dev", bgcolor: "#99CDFD", textColor: "#105a9e" },
            { value: "In review", bgcolor: "#d67cb6", textColor: "#d1419e" },
            { value: "Done", bgcolor: "#8cd982", textColor: "#267f34" }
          ]
        }
      };

      mw(req, res, () => 
      {
        const sorted = res.locals.projects;

        const expectedOrder = [
          { name: "test1", status: "To do" },
          { name: "test2", status: "To do" },
          { name: "test3", status: "In dev" },
          { name: "test4", status: "In dev" },
          { name: "test5", status: "In review" },
          { name: "test6", status: "In review" },
          { name: "test7", status: "Done" },
          { name: "test8", status: "Done" }
        ];

        expect(sorted).to.deep.equal(expectedOrder);

        done();
      });
    });

    it('should fail bc of missing projects', function (done)
    {
      const mw = sortProjects ({});

      const req = {};
      const res = 
      {
        locals:
        {
          statuses: []
        }
      };

      mw(req, res, (err) => 
      {
        expect(err).to.be.an('error');
        expect(err.message).to.equal('Projects or statuses not loaded');
        done();
      });
    });

    it('should fail bc of missing statuses', function (done)
    {
      const mw = sortProjects ({});

      const req = {};
      const res = 
      {
        locals:
        {
          projects: []
        }
      };

      mw(req, res, (err) => 
      {
        expect(err).to.be.an('error');
        expect(err.message).to.equal('Projects or statuses not loaded');
        done();
      });
    });
  });
  run();
})();