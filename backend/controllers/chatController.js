import asyncHandler from 'express-async-handler';
import { Op, Sequelize } from 'sequelize';
import { Chat, ChatRoom, ChatRoomMember } from '../models/chatModel.js';
import User from '../models/userModel.js';

export const createOneOnOneRoom = asyncHandler(async (req, res) => {
  try {
    const { user1_id, user2_number } = req.body;

    const user2_data = await User.findOne({
      where: {
        phone_number: user2_number
      }
    });

    if (!user2_data) {
      return res.status(404).json({ message: "This user doesn't have ChitChat account" });
    }

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
          },
          attributes: { exclude: ['user_id'] },
          include: [
            {
              model: User,
              as: 'user_data',
              attributes: { exclude: ['id', 'password'] }
            }
          ],
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

    res.status(201).json(newChatRoom);

  } catch (error) {
    console.log(error);
  }
});

export const findRoomById = asyncHandler(async (req, res) => {
  try {
    const { room_id } = req.body;

    const chatRoom = await ChatRoom.findOne({
      where: {
        id: room_id
      },
      include: [
        {
          model: ChatRoomMember,
          as: 'members',
          attributes: { exclude: ['user_id'] },
          include: [
            {
              model: User,
              as: 'user_data',
              attributes: { exclude: ['id', 'password'] },
            }
          ],
        },
      ],
    });

    res.status(200).json(chatRoom);

  } catch (error) {
    console.log(error);
  }
});

export const listRoomByUser = asyncHandler(async (req, res) => {
  try {
    const { user_id } = req.body;

    const chatRoom = await ChatRoomMember.findAll({
      where: {
        user_id: user_id
      },
      include: [
        {
          model: ChatRoom,
          as: 'chat_room',
          include: [
            {
              model: Chat,
              as: 'last_chat_data'
            }
          ],
        },
      ],
    });

    res.status(200).json(chatRoom);

  } catch (error) {
    console.log(error);
  }
});


export const sendChat = asyncHandler(async (req, res) => {
  try {
    const { text, media, sender_id, chat_room_id } = req.body;

    const chat = await Chat.create({
      text: text,
      media: media || null,
      sender_id: sender_id,
      chat_room_id: chat_room_id
    });
    
    const chatRoom = await ChatRoom.update(
      {
        last_chat_id: chat.id
      },
      {
        where: {
          id: chat_room_id
        }
      }
    );    

    res.status(200).json(chat);

  } catch (error) {
    console.log(error);
  }
});

export const refreshChat = asyncHandler(async (req, res) => {
  try {
    const { chat_room_id, last_update } = req.body;

    const chat = await Chat.findAll({
      where: {
        chat_room_id: chat_room_id,
        createdAt: {
          [Sequelize.Op.gt]: new Date(last_update)
        }
      }
    });

    res.status(200).json(chat);

  } catch (error) {
    console.log(error);
  }
});