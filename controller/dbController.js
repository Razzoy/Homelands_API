import express from "express";
import sequelize from "../config/sequelizeConfig.js";
import { cityModel } from "../models/cityModel.js";
import { energyLabelModel } from "../models/energyLabelModel.js";
import { estateImageRelModel } from "../models/estateImageRelModel.js";
import { estateModel } from "../models/estateModel.js";
import { estateTypeModel } from "../models/estateTypeModel.js";
import { favoriteModel } from "../models/favoriteModel.js";
import { imageModel } from "../models/imageModel.js";
import { reviewModel } from "../models/reviewModel.js";
import { staffModel } from "../models/staffModel.js";
import { userModel } from "../models/userModel.js";
import { seedFromCsv } from "../utils/seedUtils.js";

export const dbController = express.Router();

dbController.get("/sync", async (req, res) => {
  try {
    const result = await sequelize.sync({ force: true });
    res.send("Database successfully synchronized");
  } catch (error) {
    console.error(`Synchronization error: ${error}`);
  }
});

dbController.get("/seedfromcsv", async (req, res) => {
  try {
    // Indsæt data fra CSV filer til de respektive modeller
        await seedFromCsv("user.csv", userModel);
    await seedFromCsv("city.csv", cityModel);
    await seedFromCsv("energy-label.csv", energyLabelModel);
    await seedFromCsv("estate-image-rel.csv", estateImageRelModel);
    await seedFromCsv("estate-type.csv", estateTypeModel);
    await seedFromCsv("estate.csv", estateModel);
    await seedFromCsv("image.csv", imageModel);
    await seedFromCsv("favorite.csv", favoriteModel);
    await seedFromCsv("review.csv", reviewModel);
    await seedFromCsv("staff.csv", staffModel);




    // Send succes respons
    res.send({ message: "Seeding completed" });
  } catch (err) {
    // Fejlhåndtering med respons
    res.status(500).json({ error: err.message });
  }
});
