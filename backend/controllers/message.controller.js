import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { io, getReceiverSocketId } from '../socket/socket.js';

export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage.id);
      await conversation.save();
    }

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { id: userIdToChat } = req.params;
    const senderId = req.user.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userIdToChat] },
    }).populate('messages');
    if (!conversation) return res.status(200).json([]);
    return res.status(200).json(conversation.messages);
  } catch (error) {
    next(error);
  }
};
