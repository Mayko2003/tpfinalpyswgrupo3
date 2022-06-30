// import modules
const Anuncio = require("../models/anuncio");

// vars
const anuncioController = {};

// obtener anuncios --> para testing
anuncioController.getAnuncios = async(req,res)=>{
    try{
        const anuncios = await Anuncio.find();
        res.status(200).json(anuncios);
    }catch(error){
        res.status(500).json({
            message: error,
        });
    }
};

// crear anuncio
anuncioController.createAnuncio = async(req,res)=>{
    try{
        const anuncio = new Anuncio(req.body);
        await anuncio.save();
        res.status(200).json({
            message: "Anuncio guardado",
        });
    }catch(error){
        res.status(500).json({
            message: error,
        });
    }
};

// eliminar anuncio
anuncioController.deleteAnuncio = async(req,res)=>{
    try{
        await Anuncio.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Anuncio eliminado",
        });
    }catch(error){
        res.status(500).json({
            message: error,
        });
    }
};

// actualizar anuncio
anuncioController.updateAnuncio = async(req,res)=>{
    try {
        const id = req.params.id;
        await Anuncio.findOneAndUpdate({ _id: id }, req.body);
        res.status(200).json({
            message: "Anuncio actualizado",
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

// obtener segun area
/* anuncioController.getAnunciosArea = async(req,res)=>{
    try {
        const criteria = {"redactor.area":req.params.idArea};
        const anuncios = await Anuncio.find(criteria);
        res.status(200).json(anuncios);
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}; */


// export controller
module.exports = anuncioController;