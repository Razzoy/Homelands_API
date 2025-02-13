import express from "express";
import { staffModel } from "../models/staffModel.js";
import { Authorize } from "../utils/authUtils.js";

export const staffController = express.Router();

//Route to list (READ)
staffController.get("/staffs", async (req, res) => {
  try {
    const data = await staffModel.findAll({
      attributes: ["id", "firstname", "position", "email"],
    });

    if (!data || data.length === 0) {
      return res.json({ message: "No data found" });
    }

    res.json(data);
  } catch (error) {
    console.error(`Could not get staff list: ${error}`);
  }
});

//Route to details (READ)
staffController.get("/staffs/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await staffModel.findOne({
      where: { id: id },
    });

    if (!data) {
      return res.json({ message: `Could not find staff on id #${id}` });
    }
    console.log(data);
  } catch (error) {
    console.error(`Could not get staff details: ${error}`);
  }
});

//Route to create (CREATE)
staffController.post("/staffs", Authorize , async (req, res) => {
  const { firstname, lastname, position, phone, email, image } =
    req.body;

  if (
    !firstname ||
    !lastname ||
    !position ||
    !phone ||
    !email ||
    !image
  ) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await staffModel.create({
      firstname,
      lastname,
      position,
      phone,
      email,
      image,
    });

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not create staff: ${error.message}` });
  }
});

//Route to update (UPDATE)
staffController.put("/staffs", Authorize , async (req, res) => {
  const {
    firstname,
    lastname,
    position,
    phone,
    email,
    image,
    id,
  } = req.body;

  if (
    !id ||
    !firstname ||
    !lastname ||
    !position ||
    !phone ||
    !email ||
    !image
  ) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await staffModel.update(
      { id, firstname, lastname, position, phone, email, image },
      { where: { id } }
    );

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not find staff: ${error.message}` });
  }
});

//Route to delete (DELETE)
staffController.delete("/staffs/:id([0-9]*)", Authorize , async (req, res) => {
  const { id } = req.params;

  const staff = await staffModel.findOne({
    where: { id },
  });

  if (id) {
    try {
      await staff.destroy();

      res.status(200).send({
        message: `Staff from id: ${id}, has been deleted`,
      });
    } catch (error) {
      res.status(500).send({
        message: `Couldn't delete staff from id: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Id is invalid",
    });
  }
});
