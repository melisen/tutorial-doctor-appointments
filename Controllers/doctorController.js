import Doctor from "../models/DoctorSchema.js"

export const updateDoctor = async (req, res)=>{
const id = req.params.id;
try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, {$set:req.body}, {new:true});
    res.status(200).json({succes:true, message: 'Succesfully updated', data:updatedDoctor});
    //para hacer el update, se envía en body un objeto que solo contiene las claves-valor que se deseen modificar: ej. {"role":"doctor"}
    
} catch (error) {
    res.status(500).json({succes:false, message: 'failed tu update'});

}
}


export const deleteDoctor = async (req, res)=>{
const id = req.params.id;
try {
    const deleteDoctor = await Doctor.findByIdAndDelete(id);
    res.status(200).json({succes:true, message: 'Succesfully deleted'});

    
} catch (error) {
    res.status(500).json({succes:false, message: 'failed tu delete'});

}
}

export const getSingleDoctor = async (req, res)=>{
    const id = req.params.id;
    try {
        const doctor = await Doctor.findById(id);
        res.status(200).json({succes:true, message: 'Doctor found', data:doctor});
    
        
    } catch (error) {
        res.status(404).json({succes:false, message: 'No Doctor found'});
    
    }
    }

    export const getAllDoctors = async (req, res)=>{
        
        try {
            //filtrar: buscar doctor por nombre o especialidad
            //por default la propiedad isApproved está "pending"
            //$regex $options set to "i" --> case sensitive searching
            const {query} = req.query
            let doctors;
            if(query){
                doctors = await Doctor.find({
                    isApproved:"approved",
                    $or:[
                        {name: {$regex: query, $options: "i"}},
                        {specialization: {$regex: query, $options:"i"}}
                    ],
                }).select("-password")
            }else{
             // si no hay query, buscar todos los doctors pero que no envíe datos sensibles (contraseña)
                doctors = await Doctor.find({isApproved:"approved"}).select("-password");
            }

            res.status(200).json({succes:true, message: 'Doctors found', data:doctors});
        
        } catch (error) {
            res.status(404).json({succes:false, message: 'Not found'});
        }
    }