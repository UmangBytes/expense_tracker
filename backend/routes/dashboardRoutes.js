const {Router}=require('express');
const {protect}=require('../middleware/authMiddleware');
const {getDashboardData}=require('../controllers/dashboardController')

const router=Router();


router.get('/',protect,getDashboardData);

module.exports=router;