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

  // removeUser(id) {
  //   for (let a=0; a<this.users.length; a++) {
  //     if (this.users[a].id === id) {
  //       return this.users.splice(a, 1)[0];
  //     }
  //   }
  // }

  removeUser(id) {
    let idx = this.users.findIndex(user => user.id === id);
    return idx !== -1 ? this.users.splice(idx, 1)[0] : undefined;
  }

  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  getUserList(room) {
    return this.users
      .filter((user) => user.room === room)
      .map(user => user.name);
  }

  getRoomList() {
    return Object.keys(this.users.reduce((lst, user) => {
      lst[user.room] = true;
      return lst;
    }, {}));
  }
}


module.exports = { Users };
