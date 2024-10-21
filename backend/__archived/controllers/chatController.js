import { ChatRoom, ChatRoomMember, Chat } from '../models/chatModel.js';
import Contact from '../models/contactModel.js';
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

export const createChatRoom = async (req, res) => {
  try {
    const { userId, myNumber, contactId, chatName, isGroup } = req.body;

    if(!isGroup){
      const searchContact = await Contact.findOne({
        where: {
          id: contactId,
          owner_id: userId
        }
      });
      const member = await User.findAll({
        where: {
          phone_number: [searchContact.contact_number, myNumber]
        }
      })
      const newChatRoom = await ChatRoom.create({
        chat_name: null,
        is_group: false
      });
      for(const m of member) {
        await ChatRoomMember.create({
          chat_room_id: newChatRoom.id,
          user_id: m.id
        });
      }
      return res.status(201).json(searchContact);
    }

    // const users = await User.findAll({
    //   where: {
    //     phone_number: phone_numbers
    //   }
    // });

    // if (users.length !== phone_numbers.length) {
    //   return res.status(400).json({ message: 'Some users not found' });
    // }

    // const newChatRoom = await ChatRoom.create({
    //   chat_name: isGroup ? chat_name : null,
    //   is_group: isGroup
    // });

    // // Tambahkan users ke ChatRoomMember
    // for (const user of users) {
    //   await ChatRoomMember.create({
    //     chat_room_id: newChatRoom.id,
    //     user_id: user.id
    //   });
    // }

  } catch (error) {
    console.error(error);
  }
};

export const getChatsInRoom = async (req, res) => {
  try {
    const { roomId, userId } = req.body;

    const chatRoomMember = await ChatRoomMember.findOne({
      where: { chat_room_id: roomId, user_id: userId }
    });
    if (!chatRoomMember) {
      return res.status(403).json({ message: 'User not in chat room' });
    }

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

export const sendChat = async (req, res) => {
  try {
    const { roomId, text, media, senderId } = req.body;

    const chatRoomMember = await ChatRoomMember.findOne({
      where: { chat_room_id: roomId, user_id: senderId }
    });
    if (!chatRoomMember) {
      return res.status(403).json({ message: 'User not in chat room' });
    }

    const newChat = await Chat.create({
      chat_room_id: roomId,
      text,
      media,
      sender_id: senderId
    });

    await ChatRoom.update(
      { last_chat: newChat.id },
      { where: { id: roomId } }
    );

    res.status(201).json(newChat);
  } catch (error) {
    console.error(error);
  }
};
