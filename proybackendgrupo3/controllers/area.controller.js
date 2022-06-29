// import modules
const Area = require('../models/area');

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
            res.status(200).json(area)
        } catch (error) {
            res.status(500).json({
                message: error
            })
        }
    }
    // eliminar area
areaController.deleteArea = async(req, res) => {
        try {
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
        const area = await Area.findById(req.params.id).populate("roles");
        res.status(200).json(area.roles);
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}


// export controller
module.exports = areaController;