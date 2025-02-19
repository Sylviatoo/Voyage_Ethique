import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

export interface Favorite {
  id: number;
  id_user: number;
  id_place: number;
}

class FavoriteRepository {
  async createFavorite(favorite: Favorite): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO favorite (id_user, id_place) VALUES (?, ?)",
      [favorite.id_user, favorite.id_place],
    );
    return result;
  }

  async deleteFavorite(favorite: Favorite): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM favorite WHERE id_user = ? AND id_place = ?",
      [favorite.id_user, favorite.id_place],
    );
    return result;
  }

  async findFavoritesByUserId(id_user: number): Promise<Rows> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT p.* FROM place p JOIN favorite f ON p.id = f.id_place WHERE f.id_user = ?",
      [id_user],
    );
    return rows;
  }
}

export default new FavoriteRepository();
