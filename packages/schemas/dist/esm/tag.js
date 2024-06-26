"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTags = exports.UpdateTag = exports.CreateTag = void 0;
var z = require("nestjs-zod/z");
var pagination_1 = require("./pagination");
var isHexColor = function (value) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
};
exports.CreateTag = z.object({
    name: z.string().describe('Name of the tag'),
    color: z
        .string()
        .refine(isHexColor, {
        message: 'Color must be a valid hexadecimal color code.',
    })
        .describe('Color of the tag'),
});
exports.UpdateTag = exports.CreateTag.extend({});
exports.GetTags = z.object(__assign(__assign({}, pagination_1.PaginationSchema.shape), { orderBy: z.enum(['name']).optional().default('name').describe('Order by'), order: z.enum(['asc', 'desc']).optional().default('asc').describe('Order') }));
