import express from "express"
import {Authenticate, Authorize } from "../utils/authUtils.js"

export const authController = express.Router();

authController.post("/login", (req, res) => {
    Authenticate(req, res);
});

authController.get("/authorize", Authorize, (res, req, next) => {
    res.setEncoding({ message: "You are logged in"})
})