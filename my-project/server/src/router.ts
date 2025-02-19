import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import authActions from "./modules/auth/authActions";
import favoriteActions from "./modules/favorite/favoriteActions";
// Define item-related routes
import placeActions from "./modules/place/placeActions";
import userActions from "./modules/user/userActions";

router.get("/api/places", placeActions.browse);
router.get("/api/places/:id", placeActions.read);
router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users/", authActions.hashPassword, userActions.add);
router.get("/api/verify-auth", authActions.verifyToken);
router.post("/api/users/login", authActions.login);
router.post("/api/users/logout", authActions.logout, userActions.edit);

router.use(authActions.verifyToken);

router.get("/api/favorites/:userId", favoriteActions.read);
router.post("/api/favorites/:userId/:placeId", favoriteActions.add);
router.delete("/api/favorites/:userId/:placeId", favoriteActions.remove);
/* ************************************************************************* */

export default router;
