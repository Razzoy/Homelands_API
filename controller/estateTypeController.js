import express from "express";
import { estateTypeModel } from "../models/estateTypeModel.js";
import { Authorize } from "../utils/authUtils.js";

export const estateTypeController = express.Router();


//Route to list (READ)
estateTypeController.get("/estateTypes", async (req, res) => {
  try {
    const data = await estateTypeModel.findAll({
      attributes: ["id", "name"],
    });

    if (!data || data.length === 0) {
      return res.json({ message: "No data found" });
    }

    res.json(data);
  } catch (error) {
    console.error(`Could not get estateType list: ${error}`);
  }
});

//Route to details (READ)
estateTypeController.get("/estateTypes/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await estateTypeModel.findOne({
      where: { id: id },
      attributes: ["name"],
    });

    if (!data) {
      return res.json({ message: `Could not find estateType on id #${id}`});
    }
    console.log(data);
  } catch (error) {
    console.error(`Could not get estateType details: ${error}`);
  }
});


//Route to create (CREATE)
estateTypeController.post("/estateTypes", Authorize , async (req, res) => {
  const { name } = req.body;

  if ( !name ) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await estateTypeModel.create({
      name,
    });

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not create estateType: ${error.message}` });
  }
});

//Route to update (UPDATE)
estateTypeController.put("/estateTypes", Authorize , async (req, res) => {
  const { name, id } = req.body;

  if (!id || !name ) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await estateTypeModel.update(
      { id, name },
      { where: { id } }
    );

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not find estateType: ${error.message}` });
  }
});

//Route to delete (DELETE)
estateTypeController.delete("/estateTypes/:id([0-9]*)", Authorize , async (req, res) => {
  const { id } = req.params;

  const estateType = await estateTypeModel.findOne({
    where: { id },
  });

  if (id) {
    try {
      await estateType.destroy();

      res.status(200).send({
        message: `EstateType from id: ${id}, has been deleted`,
      });
    } catch (error) {
      res.status(500).send({
        message: `Couldn't delete estateType from id: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Id is invalid",
    });
  }
});
