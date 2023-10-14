const baseController = {}

baseController.buildHome = async function (req, res) {
res.send('Hello! This is the employee API.');
}

module.exports = baseController;