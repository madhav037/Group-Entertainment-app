import supabase from "../index.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const uploadProfilePicture = async (req, res, next) => {
    const token = req.cookies.access_token;

    const userdecoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = userdecoded.id;
    const file = req.file;
    const { data, error } = await supabase.storage
        .from("images")
        .upload(`user${id}/profilepicture`, file.buffer, {
            upsert: false,
            contentType: file.mimetype,
        });
    if (error) {
        res.status(500).json({ "upload error": error });
        return;
    }
    res.status(201).json(data);
}

export const getProfilePicture = async (req, res, next) => {
    const id = req.cookies.access_token;
    const { data, error } = await supabase.storage
        .from("images")
        .getPublicUrl(`user${id}/profilepicture`);
    if (error) {
        res.status(500).json({ "download error": error });
        return;
    }
    res.status(200).send(data);
}

export const getProfilePictureById = async (req, res, next) => {
    const id = req.params.id;
    const { data, error } = await supabase.storage
        .from("images")
        .getPublicUrl(`user${id}/profilepicture`);
    if (error) {
        res.status(500).json({ "download error": error });
        return;
    }
    res.status(200).send(data);
}

export const changePassword = async (req, res, next) => {
    const {name, password} = req.body;
    
    const {data, error} = await supabase
    .from('user')
    .select('name, email, id')
    .or(`name.eq.${name}`)
    .single()


    if (error) {
        res.status(500).json({"update error" : error})
        return;
    }
    if (data === null) {
        res.status(404).send("user not found")
        return;
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)
    const { err } = await supabase
    .from('user')
    .update({password: hashedPassword})
    .eq('name', name)

    if (err) {
        res.status(500).json({"update error" : err})
        return;
    }
    res.status(201).json("password updated")
}


export const addFriend = async (req, res, next) => {
    const { username, friendname } = req.body;
    const token = req.cookies.access_token;

    const userdecoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = userdecoded.id;
    let friendid;

    //check if friend exists
    try {
        const { data, error } = await supabase.
        from('user')
        .select('id')
        .eq('name', friendname)
        .single()

        if (error) {
            res.status(500).json({"add friend error" : error})
            return;
        }

        if (data === null) {
            res.status(404).send("friend not found")
            return;
        }
        friendid = data.id;

    }catch (err) {
        res.status(500).json({"add friend error" : err})
        return;
    }

    //get array from user
    try {
        const {data, error} = await supabase
        .from('user')
        .select('friends, id')
        .eq('name', username)
        .single()

        if (error) {
            res.status(500).json({"add friend error" : error})
            return;
        }

        let friendsList = data.friends
        if (friendsList === null) {
            friendsList = []
            friendsList.push(friendid)
        }else if (friendsList.includes(friendid)) {
            res.status(409).send("friend already added")
            return;
        }else {
            friendsList.push(friendid)
        }
        console.log(friendsList) //!1111111111111111111111111111111111
        //update array
        const {err} = await supabase
        .from('user')
        .update({friends: friendsList})
        .eq('id', userid)

        if (err) {
            res.status(500).json({"add friend error" : err})
            return;
        }

        res.status(201).json("friend added")
    }catch (err) {
        res.status(500).json({"add friend error" : err})
        return;
    }
}

export const getUser = async (req, res, next) => {
    const { data, error } = await supabase
    .from('user')
    .select('*')

    res.json(data);
}

export const getCurrentUser = async (req, res) => {
    const {data, error} = await supabase.auth.getUser()

    res.json(data);
}