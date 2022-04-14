import express from "express";
import Debug from "debug";
import { MongoClient } from "mongodb";
import sessions from "../data/sessions.json" assert { type: "json" };

const adminRouter = express.Router();
const debug = Debug("app")("app:adminRouter");

adminRouter.route("/").get((req, res) => {
  const url =
    "mongodb+srv://nhoktenz:Hell0tenZ22@globomantics.0aqb1.mongodb.net?retryWrites=true&w=majority";
  const dbName = "louglobomantics";
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("Connected to the mongo DB");

      const db = client.db(dbName);

      const response = await db.collection("sessions").insertMany(sessions);
      res.json(response);
    } catch (error) {
      debug(error.stack);
    }
  })();
});

export default adminRouter;
