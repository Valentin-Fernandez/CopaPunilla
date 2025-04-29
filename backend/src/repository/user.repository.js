import UsersDAO from '../DAO/users.DAO.js';

export default class UserRepository {
    static async createUser(username, password) {
        try {
            const newUser = await UsersDAO.createUser(username, password);
            if (!newUser) {
                throw new Error('Error al crear el usuario');
            }
            return newUser;
        } catch (error) {
            throw new Error(`Error al crear el usuario: ${error}`);
        }
    }

    static async getUserByUsername(username) {
        try {
            const user = await UsersDAO.getUserByUsername(username);
            return user;
        } catch (error) {
            throw new Error(`Error al obtener el usuario: ${error}`);
        }
    }
}
