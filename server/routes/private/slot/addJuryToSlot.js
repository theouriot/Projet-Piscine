const slotController = require('../../../controllers/slotController');
const teacherController = require('../../../controllers/teacherController');

module.exports = async (req, res, next) => {
    try {

        const teacherId = req.query.idTeacher;
        const slotId = req.query.idSlot;

        if (await teacherController.getTeacherId(teacherId) === undefined) {
            return res.status(400).json({ error: 'Le teacher spécifié n\'existe pas.' });
        }

        const slot = await slotController.addJuryToSlot(slotId, teacherId);

        if (slot === undefined) {
            return res.status(400).json({ error: 'Le slot spécifié n\'existe pas.' });
        }

        // Le slot et le teacher existent, on créé les liens
        await slotController.addJuryToSlot(slotId, teacherId);
        await teacherController.addSlotToTeacher(teacherId, slotId);


    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: error.message });
    }
};
