const express=require("express")
const router=express.Router()


const {getAllCases,getPlayersData,getArticleByCaseId,getOpponentData,getRound,getJudgeData}=require('../controllers/game')

router.get('/cases',getAllCases);
router.get('/:caseId/article',getArticleByCaseId)
router.post('/:caseId/round',getRound)
router.post('/:caseId/player',getPlayersData)
router.post('/:caseId/opponent',getOpponentData)
router.post('/:caseId/judge',getJudgeData)





module.exports=router