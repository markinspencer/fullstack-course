"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
exports.authRoutes = function (app) {
    app.get('/auth/google', passport_1.default.authenticate('google', {
        scope: ['profile', 'email']
    }));
    app.get('/auth/google/callback', passport_1.default.authenticate('google'));
    app.get('/api/logout', function (req, res) {
        req.logout();
        res.send(req.user);
    });
    app.get('/api/current_user', function (_a, res) {
        var user = _a.user;
        res.send(user);
    });
};
