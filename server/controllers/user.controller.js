import supabase from "../index.js";
// import multer from 'multer';

// const upload = multer().single("file");
export const uploadProfilePicture = async (req, res, next) => {
    const id = req.cookies.access_token;
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