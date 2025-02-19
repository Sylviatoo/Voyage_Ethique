import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  pseudo: string;
  email: string;
  hashed_password: string;
};

class userRepository {
  readById(arg0: number) {
    throw new Error("Method not implemented");
  }
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from user");
    return rows as User[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );
    return rows[0] as User | undefined;
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where email = ?",
      [email],
    );
    return rows[0] as User;
  }

  async update(user: Omit<User, "hashed_password">) {
    const [result] = await databaseClient.query<Result>(
      "update user set email = ?, pseudo = ? where id = ?",
      [user.pseudo, user.email],
    );
    return result.affectedRows;
  }

  async create(user: Omit<User, "id">) {
    try {
      const query =
        "insert into user (pseudo, email, hashed_password) values (?, ?, ?)";
      const params = [user.pseudo, user.email, user.hashed_password];
      const [result] = await databaseClient.query<Result>(query, params);
      return result.insertId;
    } catch (error) {
      console.error("Erreur de l'ajout de l'utilisateur", error);
      throw error;
    }
  }
}

export default new userRepository();
