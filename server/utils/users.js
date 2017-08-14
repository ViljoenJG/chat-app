class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = {id, name, room};
    this.users.push(user);
    return user;
  }

  // removeUser(id) {
  //   let removed;
  //
  //   this.users = this.users.filter((user) => {
  //     if (user.id === id) { removed = user; }
  //     return user.id !== id
  //   });
  //
  //   return removed;
  // }

  removeUser(id) {
    for (let a=0; a<this.users.length; a++) {
      if (this.users[a].id === id) {
        return this.users.splice(a, 1)[0];
      }
    }
  }

  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  getUserList(room) {
    return this.users
      .filter((user) => user.room === room)
      .map(user => user.name);
  }
}


module.exports = { Users };
