const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg4MTAwMDM5LCJleHAiOjE1ODgxODY0Mzl9.zUo7RebQDYIMKJ91RcRMLCHUpYAqF1btm-7EjJLAMWo'

chai.use(chaiHttp);

describe('Tasks API Service', function () {
  it('should GET all tasks', function (done) {
    chai
      .request('http://localhost:3000')
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        done();
      });
  });

  it('should GET a single task', function (done) {
    const expected = [{
      id: 1,
      name: "I'm the first task!",
      created_date: '2020-03-24T05:09:49.000Z',
      status: 'completed',
    }, ];

    chai
      .request('http://localhost:3000')
      .get('/api/tasks/1')
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });

  it.skip('should POST a single task', function (done) {
    const newTask = {
      name: 'New test task!',
    };
    const expected = {
      message: 'Add task successfully!'
    };

    chai
      .request('http://localhost:3000')
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(newTask)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });
});