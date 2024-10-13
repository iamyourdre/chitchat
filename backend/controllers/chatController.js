import { ChatRoom, ChatRoomMember, Chat } from '../models/chatModel.js';
import User from '../models/userModel.js';

// Menampilkan daftar ChatRoom yang user terlibat
export const getChatRoomsForUser = async (req, res) => {
  try {
    const { userId } = req.params; // Ambil userId dari request params atau req.user

    // Temukan semua ChatRoom yang melibatkan user ini
    const chatRooms = await ChatRoom.findAll({
      include: [{
        model: ChatRoomMember,
        where: { user_id: userId },
        include: {
          model: User,
          as: 'members'
        }
      }]
    });

    res.json(chatRooms);
  } catch (error) {
    console.error(error);
  }
};

// Membuat ChatRoom 1-on-1 atau grup
export const createChatRoom = async (req, res) => {
  try {
    const { phone_numbers, chat_name } = req.body; // Array phone_numbers untuk grup atau single untuk 1-on-1
    const isGroup = phone_numbers.length > 1;

    // Temukan semua user berdasarkan phone_number
    const users = await User.findAll({
      where: {
        phone_number: phone_numbers
      }
    });

    if (users.length !== phone_numbers.length) {
      return res.status(400).json({ message: 'Some users not found' });
    }

    // Buat ChatRoom
    const newChatRoom = await ChatRoom.create({
      chat_name: isGroup ? chat_name : null,
      is_group: isGroup
    });

    // Tambahkan users ke ChatRoomMember
    for (const user of users) {
      await ChatRoomMember.create({
        chat_room_id: newChatRoom.id,
        user_id: user.id
      });
    }

    res.status(201).json(newChatRoom);
  } catch (error) {
    console.error(error);
  }
};

// Menampilkan chat dalam ChatRoom tertentu
export const getChatsInRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    // Temukan semua chat dalam chat room ini
    const chats = await Chat.findAll({
      where: { chat_room_id: roomId },
      include: [{
        model: User,
        as: 'sender',
        attributes: ['id', 'name', 'profile_picture']
      }],
      order: [['createdAt', 'ASC']]
    });

    res.json(chats);
  } catch (error) {
    console.error(error);
  }
};

// Mengirim chat dalam ChatRoom
export const sendChat = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { text, media, sender_id } = req.body;

    // Pastikan user ada di ChatRoom
    const chatRoomMember = await ChatRoomMember.findOne({
      where: { chat_room_id: roomId, user_id: sender_id }
    });

    if (!chatRoomMember) {
      return res.status(403).json({ message: 'User not in chat room' });
    }

    // Kirim chat
    const newChat = await Chat.create({
      chat_room_id: roomId,
      text,
      media,
      sender_id
    });

    // Update last_chat di ChatRoom
    await ChatRoom.update(
      { last_chat: newChat.id },
      { where: { id: roomId } }
    );

    res.status(201).json(newChat);
  } catch (error) {
    console.error(error);
  }
};
