"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const node_process_1 = require("node:process");
exports.prisma = new client_1.PrismaClient({
    datasourceUrl: node_process_1.env.DATABASE_URL,
    transactionOptions: {
        timeout: 20000,
    },
});
exports.default = exports.prisma;
//# sourceMappingURL=prisma.js.map