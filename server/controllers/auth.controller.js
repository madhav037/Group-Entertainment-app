import supabase from "../index.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req,res,next) => {
    const { name, email, password } = req.body

    const { data, error } = await supabase
    .from('user')
    .select('*')
    .or(`name.eq.${name},email.eq.${email}`)

    if (error) {
        res.status(500).json({"signup error" : error})
        return;
    }
    if (data.length !== 0) {
        res.status(409).send("user already exists")
        return;
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const { data: user, error: err } = await supabase
    .from('user')
    .insert({ name, email, password: hashedPassword })
    .select('name, email, id')

    if (err) {
        res.status(500).json({"signup error" : err})
        return;
    }

    console.log('sign up successfull');

    res.status(201).json(user)
}


export const signin = async (req,res,next) => {
    const { email, password } = req.body

    const { data, error } = await supabase
    .from('user')
    .select('email, password, id')
    .eq('email',email)
    .single()

    if (error) {
        res.status(500).json({"signin error" : error})
        return;
    }
    
    if (data === null) {
        res.status(404).send("user not found")
        return;
    }
    const validPassword = bcryptjs.compareSync(password, data.password)
    if (!validPassword) {
        res.status(401).send("incorrect password")
        return;
    }

    const token = jwt.sign({id : data.id}, process.env.JWT_SECRET)

    const { password: pass, ...user } = data

    console.log('sign in successfull');
    
    res.cookie("access_token", token, {
        httpOnly: true
    })
    .status(200)
    .json(user)
}

export const google = async (req,res,next) => {
    try {
        const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('email', req.body.email)
        .single()

        if (error) {
            res.status(500).json({"google error" : error})
            return;
        }

        if (data) {
            const token = jwt.sign({id : data.id}, process.env.JWT_SECRET)
            const { password: pass, ...user } = data
            res.cookie("access_token", token, {
                httpOnly: true
            })
            .status(200)
            .json(user)
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
            const { data: user, error: err } = await supabase
            .from('user')
            .insert({ name: req.body.name.split(" ").join("").toLowerCase() +
            Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPassword, profile_picture: req.body.photo })
            .select()

            if (err) {
                res.status(500).json({"google error" : err})
                return;
            }               

            const token = jwt.sign({id : user.id}, process.env.JWT_SECRET)
            const { password: pass, ...newUser } = user
            res.cookie("access_token", token, {
                httpOnly: true
            })
            .status(200)
            .json(newUser)
        }
    } catch (error) {
        res.status(500).json({"google error" : error})
    }
}

export const signout = async (req,res,next) => {
    try {
        res.clearCookie("access_token")
        res.status(200).send("signout successful")
    } catch (error) {
        res.status(500).json({"signout error" : error})
    }

    
}

export const getUser = async (req, res, next) => {
    const { data, error } = await supabase
    .from('user')
    .select('*')

    res.json(data);
}