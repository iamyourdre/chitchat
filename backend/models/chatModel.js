import { DataTypes } from "sequelize";
import connectDB from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import User from "./userModel.js";

// Definisikan model Chat terlebih dahulu
const Chat = connectDB.define('chat', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uuidv4(),
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  media: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: { 
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  sender_id: {  
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  }
}, {
  freezeTableName: true
});

// Definisikan model ChatRoom setelah Chat
const ChatRoom = connectDB.define('chat_room', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uuidv4(),
  },
  chat_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  is_group: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  last_chat: {  // Izinkan null untuk last_chat
    type: DataTypes.STRING,
    references: {
      model: Chat,
      key: 'id'
    },
    allowNull: true
  }
}, {
  freezeTableName: true
});

// Definisikan model ChatRoomMember
const ChatRoomMember = connectDB.define('chat_room_member', {
  user_id: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  chat_room_id: {
    type: DataTypes.STRING,
    references: {
      model: ChatRoom,
      key: 'id'
    },
    allowNull: false
  }
}, {
  freezeTableName: true
});

// Asosiasi ChatRoom dan Chat
ChatRoom.hasMany(Chat, { foreignKey: 'chat_room_id', as: 'chats' });
Chat.belongsTo(ChatRoom, { foreignKey: 'chat_room_id', as: 'chatRoom' });

// ChatRoom menyimpan last_chat
ChatRoom.belongsTo(Chat, { foreignKey: 'last_chat', as: 'lastChat' });

// Asosiasi User dan ChatRoom melalui ChatRoomMember
ChatRoom.belongsToMany(User, { through: ChatRoomMember, foreignKey: 'chat_room_id', as: 'members' });
User.belongsToMany(ChatRoom, { through: ChatRoomMember, foreignKey: 'user_id', as: 'chatRooms' });

// Asosiasi Chat dengan User (sender)
Chat.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
User.hasMany(Chat, { foreignKey: 'sender_id', as: 'chats' });

export { ChatRoom, ChatRoomMember, Chat };