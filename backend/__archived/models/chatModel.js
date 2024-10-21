import { DataTypes } from "sequelize";
import connectDB from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import User from "./userModel.js";

// Definisikan model dulu (tanpa relasi)
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
  last_chat_id: { // Mereferensi chat terakhir
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'chat', // Nama tabel yang direferensikan
      key: 'id',
    },
  }
}, {
  freezeTableName: true
});

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
  }
}, {
  freezeTableName: true
});

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
  sender_id: {  // Mereferensi sender (User)
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

// 1. ChatRoom memiliki banyak ChatRoomMember
ChatRoom.hasMany(ChatRoomMember, { foreignKey: 'chat_room_id' });
ChatRoomMember.belongsTo(ChatRoom, { foreignKey: 'chat_room_id' });

// 2. ChatRoomMember mereferensi User
ChatRoomMember.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(ChatRoomMember, { foreignKey: 'user_id' });

// 3. ChatRoom memiliki banyak Chat
ChatRoom.hasMany(Chat, { foreignKey: 'chat_room_id' });
Chat.belongsTo(ChatRoom, { foreignKey: 'chat_room_id' });

// 4. ChatRoom memiliki referensi ke Chat terakhir (last_chat)
ChatRoom.belongsTo(Chat, { as: 'last_chat', foreignKey: 'last_chat_id' });

// 5. Chat memiliki referensi ke sender (User)
Chat.belongsTo(User, { foreignKey: 'sender_id' });
User.hasMany(Chat, { foreignKey: 'sender_id' });

export { ChatRoom, ChatRoomMember, Chat };
