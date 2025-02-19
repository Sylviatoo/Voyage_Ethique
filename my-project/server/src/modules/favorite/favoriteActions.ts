import type { RequestHandler } from "express";
import favoriteRepository from "./favoriteRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.userId, 10);
    if (Number.isNaN(userId)) {
      res.status(400).json("Invalid user ID");
      return;
    }

    const favorites = await favoriteRepository.findFavoritesByUserId(userId);
    if (favorites.length === 0) {
      res.status(200).json({ favorites: [] });
      return;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.userId, 10);
    const placeId = Number.parseInt(req.params.placeId, 10);
    if (Number.isNaN(userId) || Number.isNaN(placeId)) {
      res.status(400).json("Invalid Id");
      return;
    }
    await favoriteRepository.createFavorite({
      id: 0,
      id_user: userId,
      id_place: placeId,
    });
    res.status(201).json("Favorite added");
  } catch (err) {
    res.status(500).json("Internal servor error");
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.userId, 10);
    const placeId = Number.parseInt(req.params.placeId, 10);
    if (Number.isNaN(userId) || Number.isNaN(placeId)) {
      res.status(400).json("Invalid ID");
      return;
    }
    await favoriteRepository.deleteFavorite({
      id: 0,
      id_user: userId,
      id_place: placeId,
    });
    res.status(200).json("Favorite removed");
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};

export default { read, add, remove };
