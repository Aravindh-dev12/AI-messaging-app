import { Op } from "sequelize";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { io, getReceiverSocketId } from "../lib/socket.js";
import OpenAI from "openai";

// Get all users for sidebar except logged-in user
export const getUsersForSidebar = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { id: { [Op.ne]: req.user.id } },
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("getUsersForSidebar error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get chat messages between logged-in user and another user
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user.id;

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      },
      order: [["created_at", "ASC"]],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("getMessages error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Send a new message
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    const newMessage = await Message.create({ senderId, receiverId, text, image });

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) io.to(receiverSocketId).emit("newMessage", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("sendMessage error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Optional: send message to OpenAI LLM
export const sendLLMPrompt = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { id: receiverId } = req.params;
    const { text, image } = req.body;

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: "gpt-4o",
      input: text,
    });

    const newPrompt = await Message.create({ senderId, receiverId, text: `@ChatAI ${text}`, image });

    const newMessage = await Message.create({ senderId: receiverId, receiverId: senderId, text: response.output_text, image });

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newPrompt);
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json([newPrompt, newMessage]);
  } catch (error) {
    console.error("sendLLMPrompt error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
