"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const httpResponse_1 = require("../utils/httpResponse");
const Schema_1 = require("./Schema");
const jwt_1 = require("./jwt");
const query_1 = require("./query");
const loginHandler = async (req, res) => {
    try {
        const { success: isValidRequestBody, data: parsedRequestBody, error: parsedRequestBodyError, } = Schema_1.LoginSchema.safeParse(req.body);
        if (!isValidRequestBody || !parsedRequestBody) {
            console.error(parsedRequestBodyError);
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request body" + parsedRequestBodyError);
        }
        const user = await (0, query_1.findUserByEmail)(parsedRequestBody.email);
        if (!user) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
        }
        const isPasswordValid = await bcrypt_1.default.compare(parsedRequestBody.password, user.password);
        if (!isPasswordValid) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid credentials");
        }
        const token = (0, jwt_1.createAuthToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "User logged in successfully",
            data: {
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                    profession: user.profession,
                    createdAt: user.createdAt,
                },
                token,
            },
        });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError) {
            return res.status(error.status).json({
                success: false,
                message: error.message,
            });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR),
        });
    }
};
exports.loginHandler = loginHandler;
//# sourceMappingURL=login.js.map