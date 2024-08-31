const {StatusCodes}=require('http-status-codes')
const CustomAPIError=require('./custom-api')


class notFoundError extends CustomAPIError{
    constructor(message){
        super(message);
        this.StatusCode=StatusCodes.NOT_FOUND;
    }
}

module.exports=notFoundError