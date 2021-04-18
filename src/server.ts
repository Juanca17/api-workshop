import express from "express";
import Vehicle from "./vehicleModel";
import mongoose from "mongoose";
require('dotenv').config()

const app = express();
const port: string | number = process.env.PORT || 5000;
const dburl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.792hr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(
  dburl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

const db = mongoose.connection;
db.on("error", (err) => {
  console.error(err);
});
db.on("open", () => {
  console.log("DB connected successfully");
});

const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({});
    res.status(200).send(vehicles);
  } catch (err) {
    res.status(400).send(err.message);
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  const { body } = req;
  const newVehicle = new Vehicle({ ...body });
  try {
    const vehicle = await newVehicle.save({});
    res.status(201).send(vehicle);
  } catch (err) {
    res.status(400).send(err.message);
    next(err);
  }
});
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const order = await Vehicle.findByIdAndUpdate(id, body, { new: true });
    res.status(200).send(order);
  } catch (err) {
    res.status(400).send("Can´t find that vehicle right now, try later");
  }
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept"
  );
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/vehicles", router);

app.listen(port, () => console.log(`Hosting at ${port}`));
