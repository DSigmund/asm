"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const router = express.Router();
router.get('/week/:year/:kw', function (req, res) {
    try {
        res.json({});
    }
    catch (error) {
        res.status(500).json(error.toJSON());
    }
});
router.get('/month/:year/:month', function (req, res) {
    try {
        res.json({});
    }
    catch (error) {
        res.status(500).json(error.toJSON());
    }
});
router.get('/year/:year', function (req, res) {
    try {
        res.json({});
    }
    catch (error) {
        res.status(500).json(error.toJSON());
    }
});
exports.default = router;
//# sourceMappingURL=reports.js.map