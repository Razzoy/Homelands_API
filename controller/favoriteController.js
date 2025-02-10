import express from "express";
import { favoriteModel } from "../models/favoriteModel.js";

export const favoriteController = express.Router();


//Route to list (READ)
favoriteController.get("/favorites", async (req, res) => {
  try {
    const data = await favoriteModel.findAll({
      attributes: ["id"],
    });

    if (!data || data.length === 0) {
      return res.json({ message: "No data found" });
    }

    res.json(data);
  } catch (error) {
    console.error(`Could not get favorite list: ${error}`);
  }
});

//Route to details (READ)
favoriteController.get("/favorites/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await favoriteModel.findOne({
      where: { id: id },
    });

    if (!data) {
      return res.json({ message: `Could not find favorite on id #${id}`});
    }
    console.log(data);
  } catch (error) {
    console.error(`Could not get favorite details: ${error}`);
  }
});


//Route to create (CREATE)
favoriteController.post("/favorites", async (req, res) => {
  const { user_id, estate_id } = req.body;

  if ( !user_id || !estate_id ) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await favoriteModel.create({
      user_id,
      estate_id,
    });

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not create favorite: ${error.message}` });
  }
});

//Route to update (UPDATE)
favoriteController.put("/favorites", async (req, res) => {
  const { user_id, estate_id, id } = req.body;

  if (!id || !user_id || !estate_id ) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await favoriteModel.update(
      { id, user_id, estate_id },
      { where: { id } }
    );

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not find favorite: ${error.message}` });
  }
});

//Route to delete (DELETE)
favoriteController.delete("/favorites/:id([0-9]*)", async (req, res) => {
  const { id } = req.params;

  const favorite = await favoriteModel.findOne({
    where: { id },
  });

  if (id) {
    try {
      await favorite.destroy();

      res.status(200).send({
        message: `Favorite from id: ${id}, has been deleted`,
      });
    } catch (error) {
      res.status(500).send({
        message: `Couldn't delete favorite from id: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Id is invalid",
    });
  }
});
