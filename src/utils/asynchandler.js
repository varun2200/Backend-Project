// const asynchandler=(func)=> async(req,res,next)=>{
//     try {
//         return await func(req,res,next)
//     } catch (error) {
//         res.send(err.code||400).json({
//             success:false,
//             message:err.message
//         })
//     }
// }

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

export {asynchandler};