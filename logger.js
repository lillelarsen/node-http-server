module.exports = (req, res) => {
    res.on('finish', () => {
        let log = `${new Date().toISOString()} ${req.method} ${res.statusCode} ${res.statusMessage} ${req.url}`
        console.log(log);
    })
}