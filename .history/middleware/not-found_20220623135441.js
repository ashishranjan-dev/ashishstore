const notFound = (req, res) => res.status(404).json({
    status:false,
    msg:"Route dosen't exist "
})

module.exports = notFound
