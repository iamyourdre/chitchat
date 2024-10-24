import { DataTypes } from "sequelize";
import connectDB from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import User from "./userModel.js";

// Definisikan model ChatRoom
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
  last_chat_id: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'chat',
      key: 'id',
    },
  }
}, {
  freezeTableName: true
});

// Definisikan model ChatRoomMember
const ChatRoomMember = connectDB.define('chat_room_member', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uuidv4(),
  },
  chat_room_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: ChatRoom,
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  }
}, {
  freezeTableName: true
});

// Definisikan model Chat
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
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  chat_room_id: {  // Mereferensi chat room
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: ChatRoom,
      key: 'id'
    }
  }
}, {
  freezeTableName: true
});

// RELASI ANTAR MODEL
// Relasi antara ChatRoom dan ChatRoomMember
ChatRoom.hasMany(ChatRoomMember, {
  foreignKey: 'chat_room_id',
  as: 'members'  // Alias relasi
});

ChatRoomMember.belongsTo(ChatRoom, {
  foreignKey: 'chat_room_id',
  as: 'chat_room' // Alias relasi balik
});

// Relasi antara ChatRoomMember dan User
ChatRoomMember.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user_data' // Alias relasi ke User
});

// Relasi antara Chat dan ChatRoom
Chat.belongsTo(ChatRoom, {
  foreignKey: 'chat_room_id',
  as: 'chat_room_data'  // Alias relasi ke ChatRoom
});

// Relasi antara Chat dan User
Chat.belongsTo(User, {
  foreignKey: 'sender_id',
  as: 'sender_data'  // Alias relasi ke User
});

// Relasi antara ChatRoom dan Chat untuk last_chat_id
ChatRoom.belongsTo(Chat, {
  foreignKey: 'last_chat_id',
  as: 'last_chat_data'  // Alias untuk last chat
});

export { ChatRoom, ChatRoomMember, Chat };