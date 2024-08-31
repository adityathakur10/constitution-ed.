const {StatusCodes} =require('http-status-codes')


const errorHandlerMiddleware= (err,req,res,next)=>{
    let customError={
        StatusCodes : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg : err.message || 'something went wrong , try again later'
    }

// console.log('hello from error')
    return res.status(customError.StatusCodes).json({msg:customError.msg})
}

module.exports=errorHandlerMiddleware;