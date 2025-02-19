import * as argon2 from "argon2";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../user/userRepository";

const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userRepository.readByEmailWithPassword(req.body.email);
    if (!user) {
      res
        .status(401)
        .json({ message: "Email et/ou mot de passe incorrect(s)" });
      return;
    }

    if (!user.hashed_password) {
      res
        .status(422)
        .json({ message: "Utilisateur ou mot de passe incorrect" });
      return;
    }

    if (user == null) {
      res
        .status(422)
        .json({ message: "Utilisateur ou mot de passe incorrect" });
      return;
    }

    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password,
    );

    if (verified) {
      const { hashed_password, ...userWithoutHAshedPassword } = user;
      const myPayload: MyPayload = {
        sub: user.id.toString(),
      };

      const token = jwt.sign(myPayload, process.env.APP_SECRET as string, {
        expiresIn: "1h",
      });

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      });

      res.status(200).json({
        user: userWithoutHAshedPassword,
      });
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    console.error("Erreur dans le login :", err);

    next(err);
  }
};

const verifyToken: RequestHandler = (req, res, next) => {
  if (!req.cookies.auth_token) {
    res.status(401).json({ message: "Accès non autorisé, token manquant" });
    return;
  }

  try {
    const token = jwt.verify(
      req.cookies.auth_token,
      process.env.APP_SECRET as string,
    ) as MyPayload;
    res.json({ user: { id: token.sub } });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

const logout: RequestHandler = async (_, res, next) => {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashed_password = await argon2.hash(password, hashingOptions);
    req.body.hashed_password = hashed_password;
    req.body.password = undefined;
    next();
  } catch (err) {
    next(err);
  }
};

export default { login, hashPassword, verifyToken, logout };
