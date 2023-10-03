import User from "../models/UserSchema.js"

export const updateUser = async (req, res)=>{
const id = req.params.id;
try {
    const updatedUser = await User.findByIdAndUpdate(id, {$set:req.body}, {new:true});
    res.status(200).json({succes:true, message: 'Succesfully updated', data:updatedUser});
    //para hacer el update, se envía un objeto que solo contiene las claves-valor que se deseen modificar: ej. {"role":"doctor"}
    
} catch (error) {
    res.status(500).json({succes:false, message: 'failed tu update', data:updatedUser});

}
}


export const deleteUser = async (req, res)=>{
const id = req.params.id;
try {
    const updatedUser = await User.findByIdAndDelete(id);
    res.status(200).json({succes:true, message: 'Succesfully deleted'});

    
} catch (error) {
    res.status(500).json({succes:false, message: 'failed tu delete'});

}
}

export const getSingleUser = async (req, res)=>{
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json({succes:true, message: 'User found', data:user});
    
        
    } catch (error) {
        res.status(404).json({succes:false, message: 'No user found'});
    
    }
    }

    export const getAllUsers = async (req, res)=>{
        const id = req.params.id;
        try {
            //buscar todos los usuarios pero que no envíe datos sensibles (contraseña)
            const users = await User.find({}).select("-password");
            res.status(200).json({succes:true, message: 'Users found', data:users});
        
            
        } catch (error) {
            res.status(404).json({succes:false, message: 'Not found'});
        
        }
        }