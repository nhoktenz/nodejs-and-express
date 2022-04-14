import express from "express";
import sessions from "../data/sessions.json" assert { type: "json" };
import { MongoClient } from "mongodb";
import Debug from "debug";

const debug = Debug("app");
const debug2 = Debug("app:sessionsRouter");

const sessionRouter = express.Router();

sessionRouter.route("/").get((req, res) => {
  const url =
    "mongodb+srv://tenz:x1ozJ86cGubTqbm6@globomatics.0aqb1.mongodb.net/globomantics?retryWrites=true&w=majority";
  const dbName = "globomantics";
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("Connected to the mongo DB");

      const db = client.db(dbName);

      const sessions = await db.collection("sessions").find().toArray();

      res.render("sessions", {
        sessions,
      });
    } catch (error) {
      debug(error.stack);
    }
  })();
});
sessionRouter.route("/:id").get((req, res) => {
  const id = req.params.id;
  res.render("session", {
    session: sessions[id],
  });
});

export default sessionRouter;
