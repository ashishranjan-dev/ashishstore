const notFound = (req, res) => res.status(404).json({
    status:false,
    error:"Route dosen't exist ",
    msg:'Please Check the Route again'
    
})

module.exports = notFound
