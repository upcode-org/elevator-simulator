"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const request_1 = require("./routeHandlers/request");
const app = express();
const router = express.Router();
router.get('/request/:direction/:floor', request_1.request);
app.use(bodyParser.json());
app.use('/', router);
// add route-not-found;
// add error-handler;
exports.default = app;
//# sourceMappingURL=app.js.map