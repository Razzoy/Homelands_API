import express from "express";
import { reviewModel } from "../models/reviewModel.js";

export const reviewController = express.Router();

//Route to list (READ)
reviewController.get("/reviews", async (req, res) => {
  try {
    const data = await reviewModel.findAll({
      attributes: ["id", "subject", "comment"],
    });

    if (!data || data.length === 0) {
      return res.json({ message: "No data found" });
    }

    res.json(data);
  } catch (error) {
    console.error(`Could not get review list: ${error}`);
  }
});

//Route to details (READ)
reviewController.get("/reviews/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await reviewModel.findOne({
      where: { id: id },
    });

    if (!data) {
      return res.json({ message: `Could not find review on id #${id}` });
    }
    console.log(data);
  } catch (error) {
    console.error(`Could not get review details: ${error}`);
  }
});

//Route to create (CREATE)
reviewController.post("/reviews", async (req, res) => {
  const { subject, comment, num_stars, date, estate_id, user_id, is_active } =
    req.body;

  if (
    !subject ||
    !comment ||
    !num_stars ||
    !date ||
    !estate_id ||
    !user_id ||
    !is_active
  ) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await reviewModel.create({
      subject,
      comment,
      num_stars,
      date,
      estate_id,
      user_id,
      is_active,
    });

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not create review: ${error.message}` });
  }
});

//Route to update (UPDATE)
reviewController.put("/reviews", async (req, res) => {
  const {
    subject,
    comment,
    num_stars,
    date,
    estate_id,
    user_id,
    is_active,
    id,
  } = req.body;

  if (
    !id ||
    !subject ||
    !comment ||
    !num_stars ||
    !date ||
    !estate_id ||
    !user_id ||
    !is_active
  ) {
    return res.json({ message: "Missing required data" });
  }

  try {
    const result = await reviewModel.update(
      { id, subject, comment, num_stars, date, estate_id, user_id, is_active },
      { where: { id } }
    );

    res.status(201).json(result);
  } catch (error) {
    return res.json({ message: `Could not find review: ${error.message}` });
  }
});

//Route to delete (DELETE)
reviewController.delete("/reviews/:id([0-9]*)", async (req, res) => {
  const { id } = req.params;

  const review = await reviewModel.findOne({
    where: { id },
  });

  if (id) {
    try {
      await review.destroy();

      res.status(200).send({
        message: `Review from id: ${id}, has been deleted`,
      });
    } catch (error) {
      res.status(500).send({
        message: `Couldn't delete review from id: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Id is invalid",
    });
  }
});
