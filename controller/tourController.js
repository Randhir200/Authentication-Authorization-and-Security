exports.getAlldata = async (req, res, next) => {
    res.status(200).json({
        status: 'Success',
        message: 'Serve all data'
    })
}