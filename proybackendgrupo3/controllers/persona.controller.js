// import modules
const Persona = require("../models/persona");
const jwt = require("jsonwebtoken");
// vars
const personaController = {};

// obtener personas
personaController.getPersonas = async(req, res) => {
    try {
        const personas = await Persona.find().populate("roles", 'nombre').populate('area', 'nombre');
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
        }).populate('roles', 'nombre').populate('area', 'nombre roles');

        if (!persona) {
            res.status(400).json({
                message: "Usuario o contraseña incorrectos",
            });
        } else {
            token = jwt.sign({ id: persona._id }, "jwtsecret");
            res.status(200).json({
                persona: persona,
                token: token
            });
        }
    } catch (error) {
        (error);
        res.status(500).json({
            msj: "Error al obtener la persona",
        });
    }
};

personaController.getLoggedPersona = async(req, res) => {
    try {
        const persona = await Persona.findById(req.userid).populate('roles', 'nombre').populate('area', 'nombre roles');
        res.status(200).json(persona);
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

personaController.getPersonaById = async(req, res) => {
    try {
        const persona = await Persona.findById(req.params.id);
        res.status(200).json(persona);
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

personaController.getPersonasByArea = async(req, res) => {
        try {
            const personas = await Persona.find({ 'area': req.params.idArea });
            res.status(200).json(personas);
        } catch (error) {
            res.status(500).json({
                message: error,
            });
        }
    }
    // export controller
module.exports = personaController;