"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestDown = (req, res) => {
    const floor = req.param('floor');
    res.json({
        message: 'Hello World!',
        floor
    });
};
//# sourceMappingURL=request-down.js.map