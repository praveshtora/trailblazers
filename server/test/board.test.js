import request from 'supertest';
import { mock, stub } from 'sinon';
import 'sinon-mongoose';
import server from '../app';
import database from '../config/database';
import Board from '../models/boardModel';
import * as helpers from '../utils/helpers';

// const boardMock = {
//   lifeCycles: ['to-do', 'in-porgress', 'complete'],
//   issues: [
//     {
//       _doc: {
//         title: 'Creat Repo',
//         lifeCycle: 'to-do',
//         comments: ['5cf5973060e08a863a9cf46f'],
//         id: 1002,
//       },
//       title: 'Creat Repo',
//       lifeCycle: 'to-do',
//       comments: ['5cf5973060e08a863a9cf46f'],
//       id: 1002,
//     },
//   ],
//   name: 'amazon',
//   members: [],
//   id: 74,
//   __v: 0,
// };

// const expectedResponse = {
//   isSuccess: true,
//   message: '',
//   data: {
//     lifeCycles: {
//       'to-do': {
//         issues: [
//           {
//             comments: 1,
//             title: 'Creat Repo',
//             lifeCycle: 'to-do',
//             id: 1002,
//           },
//         ],
//       },
//       'in-porgress': {
//         issues: [],
//       },
//       complete: {
//         issues: [],
//       },
//     },
//   },
// };

describe('Get Board details got Kanban test', () => {
  afterAll(() => {
    server.close();
    database.disconnectDB();
  });

  const id = 200;

  it('should throw Bad request if board id not present', (done) => {
    const findUser = stub(helpers, 'validateUserInBoard').returns(true);
    const board = mock(Board);
    board
      .expects('findOne')
      .chain('populate')
      .resolves(null);
    request(server)
      .get(`/board/${id}`)
      .expect(400, {
        isSuccess: false,
        message: 'Oops! Board not found',
      })
      .end((err) => {
        board.restore();
        findUser.restore();
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  it('should throw Bad request if board id not number', (done) => {
    request(server)
      .get('/board/seven')
      .expect(400, {
        isSuccess: false,
        message: 'Invalid request to get board details!',
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  // it('should send data if boardId found', (done) => {
  //   const findUser = stub(helpers, 'validateUserInBoard').returns(true);
  //   const board = mock(Board);
  //   board
  //     .expects('find')
  //     .withArgs({ id: 200 }, 'lifeCycles issues name')
  //     .chain('populate')
  //     .withArgs('issues', 'title  lifeCycle comments id created_at dueDate')
  //     .resolves([boardMock]);
  //   request(server)
  //     .get(`/board/${id}  `)
  //     .expect(200, { ...expectedResponse })
  //     .end((err) => {
  //       findUser.restore();
  //       board.restore();
  //       if (err) return done(err);

  //       return done();
  //     });
  // });
});
