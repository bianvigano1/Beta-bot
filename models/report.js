const mongoose = require("mongoose")
const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    reson: String,
    rUsername: String,
    rID: String,
    time: String

});


module.exports = mongoose.model("Reports", reportSchema);