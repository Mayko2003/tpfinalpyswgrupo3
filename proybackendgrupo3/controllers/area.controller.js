// import modules
const Area = require('../models/area');
const Rol = require('../models/rol');
const Persona = require('../models/persona');
// vars
const areaController = {};

// obtener areas
areaController.getAreas = async(req, res) => {
        try {
            const areas = await Area.find().populate('roles', 'nombre');
            res.status(200).json(areas);
        } catch (error) {
            res.status(500).json({
                message: error
            })
        }
    }
    // crear area
areaController.createArea = async(req, res) => {
        try {
            const area = new Area(req.body);
            await area.save();
            res.status(200).json({
                message: 'Area Guardada',
                area: area
            })
        } catch (error) {
            res.status(500).json({
                message: error
            })
        }
    }
    // eliminar area
areaController.deleteArea = async(req, res) => {
        try {
            const area = await Area.findById(req.params.id);
            await Rol.deleteMany({ _id: { $in: area.roles } })
            await Area.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: 'Area eliminada'
            })
        } catch (error) {
            res.status(500).json({
                message: error
            })
        }
    }
    // actualizar area
areaController.updateArea = async(req, res) => {
    try {
        const id = req.params.id;
        await Area.findOneAndUpdate({ _id: id }, req.body);
        res.status(200).json({
            message: 'Area actualizada'
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

// obtener roles de area
areaController.getRoles = async(req, res) => {
    try {
        const area = await Area.findById(req.params.id).populate("roles", 'nombre');
        res.status(200).json(area.roles);
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

areaController.getEncargado = async(req, res) => {
    try {
        const IDarea = req.params.id;
        //find an person with the area and the roles include the rol
        const area = await Area.findById(IDarea).populate('roles');
        var encargado = ''
        area.roles.forEach(async(rol) => {
            if (rol.nombre == 'encargado' || rol.nombre == 'Encargado') {
                encargado = await Persona.findOne({ roles: { $in: rol } })
                console.log(encargado)
                res.status(200).json(encargado);
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

// export controller
module.exports = areaController;