import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const login = async(req,res)=>{
    try {
        const{username,password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id,res);
        console.log("re");
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilepic:user.profilepic,
        });


    } catch (error) {
        console.log("error in login controller");
        res.status(500).json({error:"internal server error"});
    }
}

export const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logged out succesfully"});
    } catch (error) {
        console.log("error in logout controller");
        res.status(500).json({error:"internal server error"});
    }
}

export const signup = async(req,res)=>{
    try{
        const {fullName,username,password,confirmPassword,gender}= req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"passwords do not match"});
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"Username already exists"});
        }

        // HASH password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        
        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilepic: gender === "Male" ? boyProfilePic : girlProfilePic,

        });
        if(newUser){
            // Generate  token here
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                profilepic:newUser.profilepic,
            });
        }
        else{
            res.status(400).json({error:"Invalid user data"});
        }
    }
    catch(error){
        console.log("error in sign up controller");
        res.status(500).json({error:"internal server error"});
    }
}