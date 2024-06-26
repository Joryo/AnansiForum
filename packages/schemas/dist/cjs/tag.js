"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTags = exports.UpdateTag = exports.CreateTag = void 0;
const z = require("nestjs-zod/z");
const pagination_1 = require("./pagination");
const isHexColor = (value) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
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
exports.GetTags = z.object(Object.assign(Object.assign({}, pagination_1.PaginationSchema.shape), { orderBy: z.enum(['name']).optional().default('name').describe('Order by'), order: z.enum(['asc', 'desc']).optional().default('asc').describe('Order') }));
//# sourceMappingURL=tag.js.map