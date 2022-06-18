// import modules
const Rol = require('../models/rol');

// vars
const rolController = {};

// obtener roles
rolController.getRoles = async(req,res)=>{
    try{
        const personas = await Rol.find();
        res.status(200).json(personas);
    }catch(error){
        res.status(500).json({
            message: error
        })
    }
}
// crear rol
rolController.createRol = async(req,res)=>{
    try{
        const rol = new Rol(req.body);
        await rol.save(); 
        res.status(200).json({
            message: 'Rol guardado'
        })
    }catch(error){
        res.status(500).json({
            message: error
        })
    }
}
// eliminar rol
rolController.deleteRol = async(req,res)=>{
    try{
        await Rol.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Rol eliminado'
        })
    }catch(error){
        res.status(500).json({
            message: error
        })
    }
}
// actualizar rol
rolController.updateRol = async(req,res)=>{
    try{
        const id = req.params.id;
        await Rol.findOneAndUpdate({_id: id}, req.body);
        res.status(200).json({
            message: 'Rol actualizado'
        })
    }catch(error){
        res.status(500).json({
            message: error
        })
    }
}

// export controller
module.exports = rolController;