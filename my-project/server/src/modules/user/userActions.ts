import * as argon2 from "argon2";
import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.id);
    const user = await userRepository.read(userId);

    if (user != null) {
      res.status(200).json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const dbUser = await userRepository.read(Number(req.params.id));
    const user = {
      id: Number(req.params.id),
      pseudo: req.body.pseudo,
      email: req.body.email,
    };
    const affectedRows = await userRepository.update(user);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser = {
      pseudo: req.body.pseudo,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
    };
    const insertId = await userRepository.create(newUser);
    const response = await userRepository.read(insertId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, add, edit };
