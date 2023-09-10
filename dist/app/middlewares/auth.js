"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_helpers_1 = require("../../helpers/jwt-helpers");
const api_error_1 = __importDefault(require("../error/api-error"));
const http_status_1 = __importDefault(require("http-status"));
const auth = (...roles) => {
    return (req, res, next) => {
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                next("Invalid token!");
            }
            let token = authorization;
            const user = jwt_helpers_1.JwtHelpers.verifyToken(token);
            req.user = user;
            if (roles === null || roles === void 0 ? void 0 : roles.length) {
                if (!user.role || !roles.includes(user.role)) {
                    throw new api_error_1.default(http_status_1.default.FORBIDDEN, 'Forbidden!');
                }
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.default = auth;
