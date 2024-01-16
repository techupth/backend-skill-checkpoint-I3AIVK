import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const questionRouter = Router();

//create question
questionRouter.post("/", async (req, res) => {
  const collection = db.collection("questions");
  const questionData = { ...req.body };
  await collection.insertOne(questionData);

  return res.json({ message: "Question has been created successfully" });
});

//get all question
questionRouter.get("/", async (req, res) => {
  const collection = db.collection("questions");
  const question = await collection.find({}).toArray();

  return res.json({ data: question });
});

//get each question, search by questionId
questionRouter.get("/:questionId", async (req, res) => {
  const collection = db.collection("questions");
  const questionId = new ObjectId(req.params.questionId);
  const question = await collection.find({ _id: questionId }).toArray();

  return res.json({ data: question });
});

//edit question
questionRouter.put("/:questionId", async (req, res) => {
  const collection = db.collection("questions");
  const questionId = new ObjectId(req.params.questionId);
  const newQuestionData = { ...req.body };
  await collection.updateOne({ _id: questionId }, { $set: newQuestionData });

  return res.json({ message: "Question has been edited successfully " });
});

//delete question
questionRouter.delete("/:questionId", async (req, res) => {
  const collection = db.collection("questions");
  const questionId = new ObjectId(req.params.questionId);

  await collection.deleteOne({ _id: questionId });

  return res.json({ message: "Question has been deleted successfully" });
});

export default questionRouter;
