const Panel = require("../models/panelModel");
const factory = require("./handlerFactory");

// Basic CRUD operations
exports.getAllPanels = factory.getAll(Panel);
exports.getPanel = factory.getOne(Panel);
exports.createPanel = factory.createOne(Panel);
exports.updatePanel = factory.updateOne(Panel);
exports.deletePanel = factory.deleteOne(Panel);
