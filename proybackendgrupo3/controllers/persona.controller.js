// import modules
const Persona = require("../models/persona");

// vars
const personaController = {};

// obtener personas
personaController.getPersonas = async(req, res) => {
    try {
        const personas = await Persona.find().populate("roles").populate("area");
        res.status(200).json(personas);
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};
// crear persona
personaController.createPersona = async(req, res) => {
    try {
        const persona = new Persona(req.body);
        await persona.save();
        res.status(200).json({
            message: "Persona guardada",
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};
// eliminar persona
personaController.deletePersona = async(req, res) => {
    try {
        await Persona.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Persona eliminada",
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

// actualizar persona
personaController.updatePersona = async(req, res) => {
    try {
        const id = req.params.id;
        await Persona.findOneAndUpdate({ _id: id }, req.body);
        res.status(200).json({
            message: "Persona actualizada",
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

personaController.loginPersona = async(req, res) => {
    try {
        const username = req.body.username,
            password = req.body.password;
        const persona = await Persona.findOne({
            $and: [{ nombreUsuario: username }, { contrasenia: password }],
        }).populate('roles');
        res.status(200).json(persona);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            msj: "Error al obtener la persona",
        });
    }
};

// export controller
module.exports = personaController;