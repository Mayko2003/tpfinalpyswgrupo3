// import modules
const { default: mongoose } = require("mongoose");
const Anuncio = require("../models/anuncio");

// vars
const anuncioController = {};

// obtener anuncios --> para testing
anuncioController.getAnuncios = async(req, res) => {
    try {
        const anuncios = await Anuncio.find().populate({ path: 'redactor', select: 'nombre apellido' }).populate({ path: 'estados.area', select: 'nombre' });;
        res.status(200).json(anuncios);
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

// crear anuncio
anuncioController.createAnuncio = async(req, res) => {
    try {
        const anuncio = new Anuncio(req.body);
        await anuncio.save();
        res.status(200).json({
            id: anuncio._id,
            message: "Anuncio guardado",
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

// eliminar anuncio
anuncioController.deleteAnuncio = async(req, res) => {
    try {
        await Anuncio.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Anuncio eliminado",
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

// actualizar anuncio
anuncioController.updateAnuncio = async(req, res) => {
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
anuncioController.getAnuncio = async(req, res) => {
    const anuncio = await Anuncio.findById(req.params.idAnuncio);
    res.status(200).json(anuncio);
}

// obtener un anuncio segun area encargado de acuerdo al estado
anuncioController.getAnunciosAreaEncargado = async(req, res) => {
    try {
        const anuncios = await Anuncio.find({ '$or': [{ "estados": { '$elemMatch': { 'estado': req.params.estado, 'area': req.params.idArea } } }] }).populate('redactor', 'nombre apellido').populate('destinatarios', 'nombre');
        res.status(200).json(anuncios);
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

// obtener un anuncio segun persona
anuncioController.getMisAnuncios = async(req, res) => {
    try {
        var criteria = { "redactor": req.params.idPersona };
        const anuncios = await Anuncio.find(criteria).populate({ path: 'redactor', select: 'nombre apellido' }).populate({ path: 'estados.area', select: 'nombre' });
        res.status(200).json(anuncios);
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

// obtener anuncios vigentes por roles
anuncioController.getAnuncioByRoles = async(req, res) => {
    try {
        const roles = req.body.roles;
        const fecha = req.body.fecha;
        const area = req.body.area;
        var criteria = { "destinatarios": { $in: roles }, "fechaSalidaVigencia": { '$gte': fecha }, "estados": { '$elemMatch': { 'estado': 'autorizado', 'area': area } } };
        const anuncios = await Anuncio.find(criteria).populate({ path: 'redactor', select: 'nombre apellido' }).populate({ path: 'estados.area', select: 'nombre' });
        res.status(200).json(anuncios);
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

// obtener anuncio por mes o año
anuncioController.obtenerAnunciosFecha = async(req, res) => {
    try {
        const tipo = req.params.tipo;
        const valor = req.params.valor - 1;
        var fromDate, toDate, criteria;
        if (tipo == "mes") {
            fromDate = new Date(new Date().getFullYear(), valor, 1);
            toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 1);
            criteria = { "fechaSalidaVigencia": { '$gte': fromDate, '$lte': toDate } };
        } else if (tipo == "anio") {
            fromDate = new Date(valor + 1, 0, 1);
            toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 11, 0);
            criteria = { "fechaSalidaVigencia": { '$gte': fromDate, '$lte': toDate } };
        } else {
            fromDate = new Date(new Date().getFullYear(), new Date().getMonth(), valor);
            toDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), valor + 1);
            criteria = { "fechaSalidaVigencia": { '$gte': fromDate, '$lte': toDate } };
        }
        const anuncios = await Anuncio.find(criteria);
        res.status(200).json(anuncios);
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

// obtener anuncio por rango de fechas
anuncioController.obtenerAnunciosFechaRango = async(req, res) => {
    try {
        const fechaInicio = req.body.fechaI;
        const fechaFinal = req.body.fechaF;
        const area = req.body.area;
        var criteria = { fechaEntradaVigencia: { '$gte': fechaInicio }, fechaSalidaVigencia: { '$lte': fechaFinal }, "estados.area": area, "estados.estado": 'autorizado' };
        const anuncios = await Anuncio.find(criteria).populate('destinatarios');
        res.status(200).json(anuncios);
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

// busqueda de anuncio por tipoContenido(probado)
anuncioController.busquedaAnuncioTipoContenido = async(req, res) => {
    try {
        var criteria = { "tipoContenido": req.params.tipo };
        const anuncios = await Anuncio.find(criteria);
        res.status(200).json(anuncios);
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

// obtener anuncios de un area que estan vigentes
anuncioController.getAnunciosArea = async(req, res) => {
    try {
        const anuncios = await Anuncio.find({
            $and: [
                { "estados.estado": "autorizado" },
                { "estados.area": req.params.idArea }
            ]
        }).populate('destinatarios')

        res.status(200).json(anuncios);
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

// prueba de filtro avanzado
anuncioController.getAnuncioFiltro = async(req, res) => {
        try {
            var fecha = new Date();
            const area = req.query.area;
            const tipoContenido = req.query.tipoContenido == '' ? null : req.query.tipoContenido;
            const estado = req.query.estado == '' ? null : req.query.estado;
            const redactor = req.query.redactor == '' ? null : req.query.redactor;
            const medioTransmision = req.query.medioTransmision == '' ? null : req.query.medioTransmision;
            const destinatarios = req.query.destinatarios == '' ? null : req.query.destinatarios;
            const fechaSalidaVigencia = req.query.fechaSalidaVigencia == '' ? null : req.query.fechaSalidaVigencia;
            const fechaEntradaVigencia = req.query.fechaEntradaVigencia == '' ? null : req.query.fechaEntradaVigencia;
            const titulo = req.query.titulo == '' ? null : new RegExp(`${req.query.titulo}`);
            const criteria = {
                '$and': [
                    { "fechaSalidaVigencia": { '$gte': fecha }, "estados": { '$elemMatch': { 'estado': { '$ne': 'editar' }, 'area': area } } },
                    { "tipoContenido": tipoContenido == null ? /[a-zA-Z0-9]/ : tipoContenido },
                    { "estados": { '$elemMatch': { 'estado': estado == null ? /[a-zA-Z0-9]/ : estado, 'area': area } } },
                    { "redactor": redactor == null ? { '$exists': true } : redactor },
                    { "mediosTransmision": medioTransmision == null ? { '$in': /[a-zA-Z0-9]/ } : medioTransmision },
                    { "destinatarios": destinatarios == null ? { '$exists': true } : destinatarios },
                    {
                        '$and': [{ "fechaSalidaVigencia": fechaSalidaVigencia == null ? { '$exists': true } : { '$lte': fechaSalidaVigencia } },
                            { "fechaEntradaVigencia": fechaEntradaVigencia == null ? { '$exists': true } : { '$gte': fechaEntradaVigencia } }
                        ]
                    },
                    { "titulo": titulo == null ? /[a-zA-Z0-9]/ : titulo }
                ]
            }
            const anuncios = await Anuncio.find(criteria).populate('redactor', 'nombre apellido').populate('destinatarios');
            res.status(200).json(anuncios);
        } catch (error) {
            res.status(500).json({
                message: error,
            })
        }
    }
    // export controller
module.exports = anuncioController;