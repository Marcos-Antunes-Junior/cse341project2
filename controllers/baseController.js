const baseController = {}

baseController.buildHome = async function (req, res) {
res.send('Hello! This is the employee API. Access the API documentation: https://cse341project2-bkgg.onrender.com/api-docs/');
}

module.exports = baseController;