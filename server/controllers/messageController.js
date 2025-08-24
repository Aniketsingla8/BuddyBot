import openai from "../configs/openai.js";
import axios from "axios";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import imagekit from "../configs/imageKit.js";

//Text-based AI chat message controller
export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId, prompt } = req.body;

    //Check Credits
    if(req.user.credits < 1) {
        return res.json({ success: false, message: "Insufficient credits" });
    }

    // Find the chat and add the message
    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.json({ success: false, message: "Chat not found" });
    }

    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    const {choices} = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = {...choices[0].message, timestamp: Date.now(), isImage: false};

    res.json({ success: true, reply });

    chat.messages.push(reply);
    await chat.save();
    await User.updateOne({_id: userId}, { $inc: { credits: -1 } });

  } catch (error) {
    res.json({ success: false, message: "Failed to process message" });
  }
};

//Image Generation Message Controller
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        //Check Credits
        if(req.user.credits < 2) {
            return res.json({ success: false, message: "Insufficient credits" });
        }

        const {prompt, chatId, isPublished} = req.body;

        // Find the chat and add the message
        const chat = await Chat.findOne({ _id: chatId, userId });
        if (!chat) {
            return res.json({ success: false, message: "Chat not found" });
        }

        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false,
        });

        //Encode the prompt
        const encodedPrompt = encodeURIComponent(prompt);

        //Construct Image Kit AI generation URL
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/buddybot/${Date.now()}.png?tr=w-800,h-800`;

        //Trigger generation by fetching from ImageKit
        const aiImageResponse = await axios.get(generatedImageUrl, {responseType: 'arraybuffer'});

        //Convert to Base64
        const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data, 'binary').toString('base64')}`;

        //Convert To ImageKit Media Library
        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: "buddybot"
        });

        const reply = {
            role: "assistant",
            content: uploadResponse.url,
            timestamp: Date.now(),
            isImage: true,
            isPublished
        }
        
        res.json({ success: true, reply });

        chat.messages.push(reply);
        await chat.save();
        await User.updateOne({_id: userId}, { $inc: { credits: -2 } });

    } catch (error) {
        res.json({ success: false, message: "Failed to process message" });
    }
}