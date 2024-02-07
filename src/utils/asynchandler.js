const asynchandler=(func)=> async(req,res,next)=>{
    try {
        await func(req,res,next)
    } catch (error) {
        res.send(err.code||400).json({
            success:false,
            message:err.message
        })
    }
}

export {asynchandler};