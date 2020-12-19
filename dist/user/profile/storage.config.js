"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
exports.storage = multer_1.diskStorage({
    destination: "../client/assets/uploads",
    filename: (req, file, callback) => {
        callback(null, generateFilename(file));
    }
});
function generateFilename(file) {
    return `${Date.now()}.${path_1.extname(file.originalname)}`;
}
//# sourceMappingURL=storage.config.js.map