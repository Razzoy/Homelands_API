import express from "express";
import { cityModel } from "../models/cityModel.js";
import { Authorize } from "../utils/authUtils.js";

export const cityController = express.Router();




//Route to list (READ)
cityController.get("/cities", async (req, res) => {
  try {
    const data = await cityModel.findAll({
      attributes: ["id", "zipcode", "name"],
    });

    if (!data || data.length === 0) {
      return res.json({ message: "No data found" });
    }

    res.json(data);
  } catch (error) {
    console.error(`Could not get city list: ${error}`);
  }
});

//Route to details (READ)
cityController.get("/cities/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cityModel.findOne({
      where: { id: id },
      attributes: ["zipcode", "name"],
    });

    if (!data) {
      return res.json({ message: `Could not find city on id #${id}`});
    }
    console.log(data);
  } catch (error) {
    console.error(`Could not get city details: ${error}`);
  }
});


//Route to create (CREATE)
cityController.post("/cities", Authorize , async (req, res) => {
  const { zipcode, name } = req.body;

  if ( !zipcode || !name ) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await cityModel.create({
      zipcode,
      name,
    });

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not create city: ${error.message}` });
  }
});

//Route to update (UPDATE)
cityController.put("/cities", Authorize , async (req, res) => {
  const { zipcode, name, id } = req.body;

  if (!id || !zipcode || !name ) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await cityModel.update(
      { id, zipcode, name },
      { where: { id } }
    );

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not find city: ${error.message}` });
  }
});

//Route to delete (DELETE)
cityController.delete("/cities/:id([0-9]*)", Authorize , async (req, res) => {
  const { id } = req.params;

  const city = await cityModel.findOne({
    where: { id },
  });

  if (id) {
    try {
      await city.destroy();

      res.status(200).send({
        message: `City from id: ${id}, has been deleted`,
      });
    } catch (error) {
      res.status(500).send({
        message: `Couldn't delete city from id: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Id is invalid",
    });
  }
});
