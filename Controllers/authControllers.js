import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

//al momento de registrar un usuario, según sea un paciente o doctor lo guarda en la colección correspondiente
const generateToken = (user)=>{
    return jwt.sign({id:user._id, role: user.role}, process.env.JWT_SECRET_KEY, {
        expiresIn:'15d'
    })
    //en terminal generar secret key por promera vez:
    //crypto.randomBytes(256).toString('base64')
    //copiar la secret key y pegarla en .env en  JWT_SECRET_KEY=
    //no me funcionó el comando y puse un número inventado en el .env
}


export const register = async (req, res)=>{
    const {email, password, name, role} = req.body;


    try {
        let user = null;
        if(role == 'patient'){
            user = await User.findOne({email})
            
        }else if(role == 'doctor'){
            user = await Doctor.findOne({email})
        }

        //check if user exists
        if(user){
            res.status(400).json({message: 'user already exists'})
        }
        

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if(role == 'patient'){
            user = new User({
                name,
                email,
                password: hashPassword,
                role
            })
        }        

        if(role == 'doctor'){
            user = new Doctor({
                name,
                email,
                password: hashPassword,
                role
            })
           
        }

        await user.save()

        res.status(200).json({success:true, message:'User succesfully created'});


    } catch (err) {
                res.status(500).json({success:false, message:'Internal server error, try again'});

    }
    
}

export const login = async(req, res)=>{
    const {email} = req.body;
    try {
        let user = null;
        //buscar el user en ambas colecciones
        const patient = await User.findOne({email});
        const doctor = await Doctor.findOne({email});
        //si encontramos un paciente o un doctor con ese email, el user se convierte en él
        if(patient){
            user= patient
        }
        if(doctor){
            user=doctor
        }

        //check if user exists or not
        if(!user){
            res.status(400).json({message: 'User nor found'})
        }

        //compare password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordMatch){
            res.status(400).json({status: false, message: 'Incorrect Password'})
        }

        //get authentication token
        const token = generateToken(user)

        const {password, role, appointments, ...rest} = user._doc

        res.status(200).json({status: true, message: 'Succesful Login', token, data:{...rest}, role})

    } catch (err) {
        res.status(500).json({status: false, message: 'Failed to login'})

    }
}

