const { Router } = require('express');
const NotesController = require('../controllers/notes.controller');
const validateRequestMiddleware = require('../middlewares/validateRequest.middleware');

const addNotesSchema = require('../schemas/add-notes.schema');
const updateNotesSchema = require('../schemas/update-notes.schema');

const router = Router();

router.get('/:id', NotesController.getById);
router.get('/keyset', NotesController.keysetPaginate);

router.post('/', validateRequestMiddleware(addNotesSchema), NotesController.add);
router.put('/:id', validateRequestMiddleware(updateNotesSchema),  NotesController.update);

router.delete('/:id', NotesController.delete);

module.exports = router;
