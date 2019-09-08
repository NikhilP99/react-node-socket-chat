class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name) {
        var user = { id, name };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);

        if(user){
            this.users = this.users.filter(user => user.id !== id);
        }

        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    // getUserList(room) {
    //     var users = this.users.filter((user) => user.room === room);
    //     var namesArr = users.map(user => user.name);
    //     return namesArr
    // }

    verifyUserName(name) {
        var sameNamedUsers = this.users.filter((user) => user.name === name);
        return sameNamedUsers
    }

}

module.exports = { Users }
