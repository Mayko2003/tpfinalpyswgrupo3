// import modules
const { default: mongoose } = require("mongoose");
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

// obtener un anuncio
anuncioController.getAnuncio = async(req,res)=>{
    const anuncio = await Anuncio.findById(req.params.idAnuncio);
    res.status(200).json(anuncio);
}

// obtener un anuncio segun area encargado
anuncioController.getAnunciosAreaEncargado = async(req,res)=>{
    try {
        Anuncio.find({"estados.estado":req.params.estado}).populate({path:'redactor',match:{area:req.params.idArea}}).exec(function(err, anuncios) {
            anuncios = anuncios.filter(anuncio=>anuncio.redactor!=null);
            res.status(200).json(anuncios);
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

// obtener un anuncio segun persona(probado)
anuncioController.getMisAnuncios = async(req,res)=>{
    try {
        var criteria = {"redactor":req.params.idPersona};
        const anuncios = await Anuncio.find(criteria);
        res.status(200).json(anuncios);
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

// obtener anuncios vigentes por roles(probado)
anuncioController.getAnuncioByRoles = async(req,res)=>{
    try{
        const roles = req.body.roles;
        const fecha = req.body.fecha;
        var criteria = {"destinatarios":{$in:roles},"fechaSalidaVigencia":{'$gte':fecha}};
        const anuncios = await Anuncio.find(criteria);
        res.status(200).json(anuncios);
    }catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

// obtener anuncio por mes o año(probado maso)
anuncioController.obtenerAnunciosFecha = async(req,res)=>{
    try{
        const tipo = req.params.tipo;
        const valor = req.params.valor-1;
        var fromDate, toDate, criteria;
        if(tipo=="mes"){
            fromDate = new Date(new Date().getFullYear(),valor,1);
            toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 1);
            criteria = {"fechaSalidaVigencia":{'$gte':fromDate,'$lte':toDate}};
        }else if(tipo=="anio"){
            fromDate = new Date(valor+1,0,1);
            toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 11, 0);
            criteria = {"fechaSalidaVigencia":{'$gte':fromDate,'$lte':toDate}};
        }else{
            fromDate = new Date(new Date().getFullYear(),new Date().getMonth(),valor);
            toDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), valor+1);
            criteria = {"fechaSalidaVigencia":{'$gte':fromDate,'$lte':toDate}};
        }
        console.log(criteria);
        const anuncios = await Anuncio.find(criteria);
        res.status(200).json(anuncios);
    }catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

// obtener anuncio por rango de fechas(2022-10-02 ese formato)(probado maso)
anuncioController.obtenerAnunciosFechaRango = async(req,res)=>{
    try{
        const fechaInicio = req.body.fechaI;
        const fechaFinal = req.body.fechaF;
        var criteria = {fechaEntradaVigencia:{'$gte':fechaInicio},fechaSalidaVigencia:{'$lte':fechaFinal}};
        console.log(criteria);
        const anuncios = await Anuncio.find(criteria);
        res.status(200).json(anuncios);
    }catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

// busqueda de anuncio por tipoContenido(probado)
anuncioController.busquedaAnuncioTipoContenido = async(req,res)=>{
    try{
        console.log(req.params.tipo);
        var criteria = {"tipoContenido":req.params.tipo};
        const anuncios = await Anuncio.find(criteria);
        res.status(200).json(anuncios);
    }catch(error){
        res.status(500).json({
            message: error,
        });
    }
}

// obtener anuncios de un area que estan vigentes
anuncioController.getAnunciosArea = async(req,res)=>{
    try{
        const anuncios = await Anuncio.find({
            $and: [
                { "estados.estado": "autorizado"},
                { "estados.area": req.params.idArea }
            ]
        }).populate('destinatarios')

        res.status(200).json(anuncios);
    }catch(error){
        res.status(500).json({
            message: error,
        });
    }
}

// prueba de filtro avanzado
anuncioController.getAnuncioFiltro = async(req,res)=>{
    try{
        var fecha = new Date();
        const roles = req.query.roles;
        const tipoContenido = req.query.tipoContenido == '' ? null : req.query.tipoContenido;
        const estado = req.query.estado == '' ? null : req.query.estado;
        const redactor = req.query.redactor == '' ? null : req.query.redactor;
        const medioTransmision = req.query.medioTransmision == '' ? null : req.query.medioTransmision;
        const destinatarios = req.query.destinatarios == '' ? null : req.query.destinatarios;
        const fechaSalidaVigencia = req.query.fechaSalidaVigencia == '' ? null : req.query.fechaSalidaVigencia;
        const titulo = req.query.titulo == '' ? null : req.query.titulo;
        console.log(fechaSalidaVigencia);
        const criteria = {
            '$and': [
                {"destinatarios":{$in:roles},"fechaSalidaVigencia":{'$gte':fecha}},
                {"tipoContenido":tipoContenido == null ? /[a-zA-Z0-9]/ : tipoContenido},
                {"estados.estado":estado == null ? /[a-zA-Z0-9]/ : estado},
                {"redactor":redactor == null ? {'$exists':true}  : redactor},
                {"mediosTransmision":medioTransmision == null ?{'$in':/[a-zA-Z0-9]/} : medioTransmision},
                {"destinatarios": destinatarios == null ? {'$exists':true} : destinatarios},
                {"fechaSalidaVigencia":fechaSalidaVigencia == null ? {'$exists':true} : {'$eq':fechaSalidaVigencia}},
                {"titulo": titulo == null ? /[a-zA-Z0-9]/ : titulo}
            ]
        }
        console.log(criteria);
        const anuncios = await Anuncio.find(criteria);
        res.status(200).json(anuncios);
    }catch(error){
        res.status(500).json({
            message : error,
        })
    }
}
// export controller
module.exports = anuncioController;