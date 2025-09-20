import express from "express";
import {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} from "../controllers/sweet.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getAllSweets)
  .post(protect, admin, addSweet);

router.get("/search", protect, searchSweets);

router.route("/:id")
  .put(protect, admin, updateSweet)
  .delete(protect, admin, deleteSweet);

router.post("/:id/purchase", protect, purchaseSweet);
router.post("/:id/restock", protect, admin, restockSweet);

export default router;
