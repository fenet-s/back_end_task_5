const express=require('express');
const router=express.Router();
const projectController=require('../controllers/projectController');

router.get('/api/projects' ,projectController.getAll);
router.get('/api/projects/:id', projectController.getOne);
router.post('/api/projects',projectController.create);
router.delete('/api/projects/:id',projectController.remove);
router.patch('/api/projects/:id',projectController.update);

module.exports=router;