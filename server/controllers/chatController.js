import Chat from "../models/Chat.js";

//API controller for new chat
export const createChat = async (req, res) => {
    try {
        const userId = req.user._id;

        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
            userName: req.user.name
        }

        await Chat.create(chatData);
        res.json({success: true, message: "New chat created successfully"});
    } catch (error) {
        res.json({success: false, message: "Failed to create chat"});
    }
}

//Api controller for getting all chats
export const getAllChats = async (req, res) => {
    try {
        const userId = req.user._id;

        const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });
        res.json({ success: true, chats });
    } catch (error) {
        res.json({ success: false, message: "Failed to retrieve chats" });
    }
}

//Api controller to delete a chats
export const deleteChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const {chatId} = req.body;

        await Chat.deleteOne({ _id: chatId, userId });
        res.json({ success: true, message: "Chat deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: "Failed to delete chat" });
    }
}
