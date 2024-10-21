import asyncHandler from 'express-async-handler';
import { Op, Sequelize } from 'sequelize';
import { ChatRoom, ChatRoomMember } from '../models/chatModel.js';
import User from '../models/userModel.js';

export const createOneOnOneChat = asyncHandler(async (req, res) => {
  try {
    const { user1_id, user2_number } = req.body;

    // Cek apakah user2 ada di database
    const user2_data = await User.findOne({
      where: {
        phone_number: user2_number
      }
    });

    if (!user2_data) {
      return res.status(404).json({ message: "This user doesn't have ChitChat account" });
    }

    // Cari apakah sudah ada ChatRoom yang berisi kedua user (user1 dan user2)
    const existingChatRoom = await ChatRoom.findOne({
      where: {
        is_group: false
      },
      include: [
        {
          model: ChatRoomMember,
          as: 'members',
          where: {
            user_id: { [Op.in]: [user1_id, user2_data.id] }
          }
        }
      ],
      group: ['chat_room.id'],
    });

    // Jika ChatRoom sudah ada, kembalikan response dengan room tersebut
    if (existingChatRoom) {
      return res.status(200).json({
        chatRoom: existingChatRoom,
        message: 'Chat room already exists'
      });
    }

    // Jika tidak ada, buat ChatRoom baru
    const newChatRoom = await ChatRoom.create({
      is_group: false
    });

    // Tambahkan user1 dan user2 ke ChatRoomMember
    await ChatRoomMember.bulkCreate([
      { chat_room_id: newChatRoom.id, user_id: user1_id },
      { chat_room_id: newChatRoom.id, user_id: user2_data.id }
    ]);

    res.status(201).json({
      chatRoom: newChatRoom,
      message: 'New chat room created and members added'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});
