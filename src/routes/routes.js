const express = require('express');

const router = express.Router();
const control = require('../controllers/control.js');
const error = require('../controllers/errControl.js')


router.get('/', control.example);
router.get('/todo', control.list);
router.post('/todo', control.postTask);
router.get('/todo/:id', control.fetchTask);
router.patch('/todo/:id', control.editTask);
router.delete('/todo/:id', control.delTask);

router.post('/todo/:id', error.postId)
router.patch('/todo', error.patchñId)
router.delete('/todo', error.delñId)



module.exports = router;
