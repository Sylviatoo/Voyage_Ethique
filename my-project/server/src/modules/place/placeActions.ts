import type { RequestHandler } from "express";
import placeRepository from "./placeRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const places = await placeRepository.readAll();
    res.status(200).json(places);
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const placeId = Number.parseInt(req.params.id);
    const place = await placeRepository.read(placeId);

    if (place != null) {
      res.status(200).json({ place });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

export default { browse, read };
