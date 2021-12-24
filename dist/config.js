"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONST_BYTES = exports.BYTES_PER_OUT = exports.BYTES_PER_IN = exports.FEE_PER_BYTE = exports.PORT = exports.NETWORK = void 0;
const dotenv = require("dotenv");
dotenv.config();
const env = require("env-var");
exports.NETWORK = env.get('NETWORK').required(true).asString();
exports.PORT = env.get('PORT').required(true).asInt();
exports.FEE_PER_BYTE = env.get('FEE_PER_BYTE').required(true).asInt();
exports.BYTES_PER_IN = env.get('BYTES_PER_IN').required(true).asInt();
exports.BYTES_PER_OUT = env.get('BYTES_PER_OUT').required(true).asInt();
exports.CONST_BYTES = env.get('CONST_BYTES').required(true).asInt();
//# sourceMappingURL=config.js.map