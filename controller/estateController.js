import express from "express";
import { estateModel } from "../models/estateModel";

export const estateController = express.Router();

estateController.get("/estates", async (req, res) => {
  try {
    const data = await estateModel.findAll({
      attributes: [
        "id",
        "address",
        "price",
        "num_rooms",
        "num_floors",
        "floor_space",
        "ground_space",
        "basement_space",
        "year_of_construction",
        "city_id",
        "type_id",
        "energy_label_id",
      ],
    });

    if (!data || data.length === 0) {
      return res.json({ message: "No data found" });
    }

    res.json(data);
  } catch (error) {
    console.error(`Could not get estate list: ${error}`);
  }
});

estateController.get("/estates/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await estateModel.findOne({
      where: { id: id },
    });

    if (!data || data.length === 0) {
      return res.json({ message: `Could not find estate on id #${id}` });
    }
  } catch (error) {
    console.error(`Could not get estate details: ${error}`);
  }
});

estateController.post("/estates", async (req, res) => {
  const {
    address,
    price,
    payput,
    gross,
    net,
    cost,
    num_rooms,
    num_floors,
    floor_space,
    ground_space,
    basement_space,
    year_of_construction,
    year_rebuilt,
    description,
    floorplan,
    num_clicks,
    city_id,
    type_id,
    energy_label_id,
  } = req.body;

  if (
    !address ||
    !price ||
    !payput ||
    !gross ||
    !net ||
    !cost ||
    !num_rooms ||
    !num_floors ||
    !floor_space ||
    !ground_space ||
    !basement_space ||
    !year_of_construction ||
    !year_rebuilt ||
    !description ||
    !floorplan ||
    !num_clicks ||
    !city_id ||
    !type_id ||
    !energy_label_id
  ) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await estateModel.create({
      address,
      price,
      payput,
      gross,
      net,
      cost,
      num_rooms,
      num_floors,
      floor_space,
      ground_space,
      basement_space,
      year_of_construction,
      year_rebuilt,
      description,
      floorplan,
      num_clicks,
      city_id,
      type_id,
      energy_label_id,
    });

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not create estate: ${error.message}` });
  }
});

estateController.put("/estates", async (req, res) => {
  const {
    id,
    address,
    price,
    payput,
    gross,
    net,
    cost,
    num_rooms,
    num_floors,
    floor_space,
    ground_space,
    basement_space,
    year_of_construction,
    year_rebuilt,
    description,
    floorplan,
    num_clicks,
    city_id,
    type_id,
    energy_label_id,
  } = req.body;

  if (
    !id ||
    !address ||
    !price ||
    !payput ||
    !gross ||
    !net ||
    !cost ||
    !num_rooms ||
    !num_floors ||
    !floor_space ||
    !ground_space ||
    !basement_space ||
    !year_of_construction ||
    !year_rebuilt ||
    !description ||
    !floorplan ||
    !num_clicks ||
    !city_id ||
    !type_id ||
    !energy_label_id
  ) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await estateModel.update(
      {
        id,
        address,
        price,
        payput,
        gross,
        net,
        cost,
        num_rooms,
        num_floors,
        floor_space,
        ground_space,
        basement_space,
        year_of_construction,
        year_rebuilt,
        description,
        floorplan,
        num_clicks,
        city_id,
        type_id,
        energy_label_id,
      },
      { where: { id } }
    );

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not find estate: ${error.message}` });
  }
});

estateController.delete("/estates/:id([0-9]*)", async (req, res) => {
    const { id } = req.params;

    const estate = await estateModel.findOne({
        where: { id },
    })

    if (id) {
        try {
            await estate.destroy();

            res.status(200).send({
                message: `Estate from id: ${id}, has been deleted`,
            })
        } catch (error) {
            res.status(500).send({
                message: `Couldn't delete estate from id: ${error.message}`,
            });
        }
    } else {
        res.status(400).send({
            message: "Id is invalid",
        });
    }
})
