const request = require('supertest');
const _ = require('lodash');

const app = require('../app');

// mocking fetch is reaaaally long to set up so the tests assume the original api is responding the players JSON

describe('foobar API tests', () => {
  const agent = request.agent(app);

  it('any other call except players should response the GET method, with 200', done => {
    agent.get('/rogerestlemeilleur/').then(response => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });

  it('any other call except players should response the GET method, with 200', done => {
    agent.get('/rogerestlemeilleur/foo/bar').then(response => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });

  it('players should response a 200', done => {
    agent.get('/players/').then(response => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('players should response the players ordered by id', done => {
    agent.get('/players/').then(response => {
      expect(response.body[0].id).toBe(17);
      done();
    });
  });

  it('players/:playerId? with a negative value should return a 404', done => {
    agent.get('/players/-2').then(response => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });

  it('players/:playerId? with a string should return a 404', done => {
    agent.get('/players/foo').then(response => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });

  it('players/:playerId? with a correct id should return a player', done => {
    agent.get('/players/52').then(response => {
      const player = {
        id: 52,
        firstname: 'Novak',
        lastname: 'Djokovic',
        shortname: 'N.DJO',
        sex: 'M',
        country: {
          picture: 'https://i.e' + 'uro' + 'sp' + 'or' + 't.com/_iss_/geo/country/flag/medium/6944.png',
          code: 'SRB',
        },
        picture: 'https://i.eu' + 'ro' + 'sp' + 'or' + 't.com/_iss_/person/pp_clubteam/large/565920.jpg',
        data: {
          rank: 2,
          points: 2542,
          weight: 80000,
          height: 188,
          age: 31,
          last: [1, 1, 1, 1, 1],
        },
      };
      expect(response.statusCode).toBe(200);
      expect(_.isEqual(response.body, player)).toBe(true);
      done();
    });
  });
});
