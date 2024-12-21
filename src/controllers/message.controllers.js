import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloudniary from "../lib/cloudinary.js";



export const getUsersForSidebar = async(req,res)=>{
    try {
        const curUserId = req.user._id;
        const allUserExceptCur = await User.find({_id: {$ne:curUserId}}).select("-password");

        res.status(200).json(allUserExceptCur);

        
    } catch (error) { 
        console.log("Error in getUsersForSidebar:",error.message);
        res.status(500).json({message: "internal server error"});
        
    }
};


export const getMessages = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params ; 
        //in path parameter we have named it /:id thats why id
        //then remaing that to, userToChatId
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}, 
            ] 
        });

        res.status(200).json(messages); 

    } catch (error) {
        console.log("Error in getMessages:",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }

};


export const sendMessage = async(req,res) =>{
    try {
        const {text,image} = req.body;
        const {id: userToChatId} = req.params;
        const myId = req.user._id;

        let imgUrl;

        if(image){
            const UploadResponse = await cloudniary.uploader.upload(image);
            imgUrl = UploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId:myId,
            receiverId: userToChatId,
            text:text,
            image: imgUrl,
        });

        await newMessage.save(); //SAVE TO MOGO


        //TO DO : REAL ITME FUNCTIONALITY USING SOCKET.IO

        res.status(201).json(newMessage);
        
    } catch (error) {
        console.log("Error in sendMessages:",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};