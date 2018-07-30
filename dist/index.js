"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = process.env.PORT || 3000;
app_1.default.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
process.on('uncaughtException', (err) => {
    console.log(`Uncaught Exception: ${err}`);
    process.exit(1);
});
//# sourceMappingURL=index.js.map