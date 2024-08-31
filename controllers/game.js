const caseModel=require('../models/json')
const {StatusCodes}=require('http-status-codes')
const notFoundError =require('../errors/not-found')

const getAllCases=async(req,res)=>{
        const cases=await caseModel.find({},{
            _id:1,
            name:1,
            "data.case.title":1,
            "data.case.description":1
        })
        const simplifiedCases=cases.map(caseItem=>({
            _id:caseItem._id,
            name:caseItem.name,
            title:caseItem.data.case.title,
            description: caseItem.data.case.description
        }))
        return res.status(StatusCodes.OK).json({cases:simplifiedCases})
}
const getArticleByCaseId = async (req, res) => {
      const caseData = await caseModel.findById(req.params.caseId);
      if (!caseData) {
        throw new notFoundError(`no case with id : ${req.params.caseId}`)
        // return res.status(404).json({ message: "Case not found" });
      }
      res.status(StatusCodes.OK).json(caseData.data.case.articles);
    
  };
const getRound=async(req,res)=>{
        const roundNo=req.body.roundNo
        const caseData=await caseModel.findById(req.params.caseId);
        if(!caseData){
            throw new notFoundError(`no case with id : ${req.params.caseId}`)
            // return res.status(404).json({ message:"case not found"})
        }
        return res.status(StatusCodes.OK).json(caseData.data.rounds[roundNo-1])

        
}

const getPlayersData=async(req,res)=>{
    const {roundNo,askedInfo}=req.body;

    const caseData=await caseModel.findById(req.params.caseId)
    const RoundData=await caseData.data.rounds[roundNo-1];  //getting round data
    const requested_options=await RoundData.player[askedInfo]

    res.status(StatusCodes.OK).json(requested_options)
}
const getOpponentData=async(req,res)=>{
    const {roundNo}=req.body;

    const caseData=await caseModel.findById(req.params.caseId)
    const RoundData=await caseData.data.rounds[roundNo-1];  //getting round data
    const requested_data=await RoundData.opponent

    res.status(StatusCodes.OK).json(requested_data)
}
const getJudgeData=async(req,res)=>{
    const {roundNo}=req.body;

    const caseData=await caseModel.findById(req.params.caseId)
    const RoundData=await caseData.data.rounds[roundNo-1];  //getting round data
    const requested_data=await RoundData.judge

    res.status(StatusCodes.OK).json(requested_data)
}

module.exports={
    getAllCases,
    getArticleByCaseId,
    getRound,getPlayersData,getOpponentData,getJudgeData
}