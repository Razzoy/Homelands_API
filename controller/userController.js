import express from "express";
import { userModel } from "../models/userModel.js";
import { Authorize } from "../utils/authUtils.js";

export const userController = express.Router();

//Route to list (READ)
userController.get("/users", Authorize , async (req, res) => {
  try {
    const data = await userModel.findAll({
      attributes: ["id", "firstname", "email", "is_active"],
    });

    if (!data || data.length === 0) {
      return res.json({ message: "No data found" });
    }

    res.json(data);
  } catch (error) {
    console.error(`Could not get user list: ${error}`);
  }
});

//Route to details (READ)
userController.get("/users/:id([0-9]*)", Authorize , async (req, res) => {
  try {
    const { id } = req.params;
    const data = await userModel.findOne({
      where: { id: id },
    });

    if (!data) {
      return res.json({ message: `Could not find user on id #${id}` });
    }
    res.json(data);
    console.log(data);
  } catch (error) {
    console.error(`Could not get user details: ${error}`);
  }
});

//Route to create (CREATE)
userController.post("/users", async (req, res) => {
  const { firstname, lastname, password, refresh_token, email, is_active } =
    req.body;

  if (
    !firstname ||
    !lastname ||
    !password ||
    !refresh_token ||
    !email ||
    !is_active
  ) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await userModel.create({
      firstname,
      lastname,
      password,
      refresh_token,
      email,
      is_active,
    });

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not create user: ${error.message}` });
  }
});

//Route to update (UPDATE)
userController.put("/users", Authorize , async (req, res) => {
  const {
    firstname,
    lastname,
    password,
    refresh_token,
    email,
    is_active,
    id,
  } = req.body;

  if (
    !id ||
    !firstname ||
    !lastname ||
    !password ||
    !refresh_token ||
    !email ||
    !is_active
  ) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await userModel.update(
      { id, firstname, lastname, password, refresh_token, email, is_active },
      { where: { id } }
    );

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not find user: ${error.message}` });
  }
});

//Route to delete (DELETE)
userController.delete("/users/:id([0-9]*)", Authorize , async (req, res) => {
  const { id } = req.params;

  const user = await userModel.findOne({
    where: { id },
  });

  if (id) {
    try {
      await user.destroy();

      res.status(200).send({
        message: `User from id: ${id}, has been deleted`,
      });
    } catch (error) {
      res.status(500).send({
        message: `Couldn't delete user from id: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Id is invalid",
    });
  }
});
