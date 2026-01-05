import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("API is running");
});

export default routes;