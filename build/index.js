"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_session_1 = __importDefault(require("cookie-session"));
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var passport_1 = __importDefault(require("passport"));
var authRoutes_1 = require("./routes/authRoutes");
var passport_2 = require("./services/passport");
var keys_1 = __importDefault(require("./config/keys"));
mongoose_1.default.connect(keys_1.default.mongoURI || '');
var app = express_1.default();
app.use(cookie_session_1.default({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys_1.default.cookieKey || '']
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Setup
passport_2.configurePassport();
// Routes
authRoutes_1.authRoutes(app);
// Start
var PORT = process.env.PORT || 4200;
app.listen(PORT, function () { return console.log("server is listening on port " + PORT); });
//prod
exports.default = {
    googleClientID: '',
    googleClientSecret: '',
    mongoURI: ''
};
