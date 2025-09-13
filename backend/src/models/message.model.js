import { DataTypes } from "sequelize";
import sequelize from "../lib/db.js";
import User from "./user.model.js";

const Message = sequelize.define(
  "Message",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    senderId: { type: DataTypes.INTEGER, allowNull: false, field: "sender_id", references: { model: User, key: "id" } },
    receiverId: { type: DataTypes.INTEGER, allowNull: false, field: "receiver_id", references: { model: User, key: "id" } },
    text: { type: DataTypes.TEXT },
    image: { type: DataTypes.STRING },
  },
  { tableName: "messages", timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);

User.hasMany(Message, { foreignKey: "senderId", as: "sentMessages" });
User.hasMany(Message, { foreignKey: "receiverId", as: "receivedMessages" });

export default Message;
