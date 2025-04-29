import User from '../models/users.model.js';

export default class UsersDAO {
    static async createUser(username, password) {
        const newUser = User.create({ username, password });
        return newUser;
    }

    static async getUserByUsername(username) {
        const user = await User.findOne({ username });
        return user;
    }
}
