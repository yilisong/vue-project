module.exports = (res, fs, file) => {
  fs.readFile(file, (err, file) => {
    if (err) {
      res.sendStatus(404)
    } else {
      res.send(file.toString())
    }
  })
}
