const expect = require('expect');
const { describe, it } = require('mocha');

const { Users } = require('./users');

let seedUsers = [{
  id: '1',
  name: 'Sam',
  room: 'Room One'
}, {
  id: '2',
  name: 'Jen',
  room: 'Room Two'
}, {
  id: '3',
  name: 'Mike',
  room: 'Room One'
}];

describe('Users class', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    seedUsers.forEach(user => users.users.push(user));
  });

  it('should add a new user', () => {
    let users = new Users();
    const user = {
      id: '123',
      name: 'TestSuite',
      room: 'My test room'
    };

    let result = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
    expect(result).toInclude(user);
  });

  it('should return names of users in Room One', () => {
    let userList = users.getUserList('Room One');
    expect(userList).toEqual(['Sam', 'Mike']);
  });

  it('should return names of users in Room Two', () => {
    let userList = users.getUserList('Room Two');
    expect(userList).toEqual(['Jen']);
  });

  it('should remove a user', () => {
    let result = users.removeUser(seedUsers[0].id);
    expect(result).toInclude(seedUsers[0]);
    expect(users.users.length).toBe(2);
  });

  it('should NOT remove user if id is invalid', () => {
    let result = users.removeUser('7');
    expect(result).toNotExist();
    expect(users.users.length).toBe(3)
  });

  it('should find user', () => {
    let result = users.getUser(seedUsers[1].id);
    expect(result).toInclude(seedUsers[1])
  });

  it('should NOT find user if id is invalid', () => {
    let result = users.getUser('8');
    expect(result).toNotExist();
  });
})
