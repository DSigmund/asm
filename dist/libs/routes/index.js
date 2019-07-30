"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
// Import Routes
const channel_1 = __importDefault(require("./channel"));
const reports_1 = __importDefault(require("./reports"));
const router = express.Router();
router.use('/', channel_1.default);
router.use('/reports', reports_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map