import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type Place = {
  id: number;
  id_category: number;
  name: string;
  description: string;
  location: string;
  image_url: string;
  date: number;
};

class placeRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from place");
    return rows as Place[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from place where id = ?",
      [id],
    );
    return rows[0] as Place | undefined;
  }
}

export default new placeRepository();
