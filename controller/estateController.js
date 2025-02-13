import express from "express";
import { estateModel } from "../models/estateModel.js";
import { estateTypeModel } from "../models/estateTypeModel.js";
import { energyLabelModel } from "../models/energyLabelModel.js";
import { cityModel } from "../models/cityModel.js";
import { imageModel } from "../models/imageModel.js";
import { estateImageRelModel } from "../models/estateImageRelModel.js";
import { Authorize } from "../utils/authUtils.js";

export const estateController = express.Router();

estateModel.belongsTo(estateTypeModel, {
  foreignKey: {
    allowNull: false,
  },
});

estateModel.belongsTo(energyLabelModel, {
  foreignKey: {
    allowNull: false,
  },
});

estateModel.belongsTo(cityModel, {
  foreignKey: {
    allowNull: false,
  },
});

//many to many relations
estateModel.belongsToMany(imageModel, { through: estateImageRelModel });
imageModel.belongsToMany(estateModel, { through: estateImageRelModel });

estateTypeModel.hasMany(estateModel);
energyLabelModel.hasMany(estateModel);
cityModel.hasMany(estateModel);

estateController.get("/estates", async (req, res) => {
  try {
    const data = await estateModel.findAll({
      include: [
        {
          model: estateTypeModel,
          attributes: ["id", "name"],
        },
        {
          model: energyLabelModel,
          attributes: ["id", "name"],
        },
        {
          model: cityModel,
          attributes: ["id", "name", "zipcode"],
        },
        {
          model: imageModel,
          attributes: ["id", "filename", "author", "description"],
        },
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
      include: [
        {
          model: estateTypeModel,
          attributes: ["id", "name"],
        },
        {
          model: energyLabelModel,
          attributes: ["id", "name"],
        },
        {
          model: cityModel,
          attributes: ["id", "name", "zipcode"],
        },
        {
          model: imageModel,
          attributes: ["id", "filename", "author", "description"],
        },
      ],
    });

    if (!data || data.length === 0) {
      return res.json({ message: `Could not find estate on id #${id}` });
    }
  } catch (error) {
    console.error(`Could not get estate details: ${error}`);
  }
});

estateController.post("/estates", Authorize, async (req, res) => {
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
    estate_type_id: type_id,
    energy_label_id,
    image_id,
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
    !energy_label_id ||
    !image_id
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
      image_id,
    });

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not create estate: ${error.message}` });
  }
});

estateController.put("/estates", Authorize, async (req, res) => {
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
    estate_type_id: type_id,
    energy_label_id,
    image_id,
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
    !energy_label_id ||
    !image_id
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
        image_id,
      },
      { where: { id } }
    );

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not find estate: ${error.message}` });
  }
});

estateController.delete("/estates/:id([0-9]*)", Authorize, async (req, res) => {
  const { id } = req.params;

  const estate = await estateModel.findOne({
    where: { id },
  });

  if (id) {
    try {
      await estate.destroy();

      res.status(200).send({
        message: `Estate from id: ${id}, has been deleted`,
      });
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
});
