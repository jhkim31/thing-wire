"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const staticPath_1 = __importDefault(require("shared/lib/staticPath"));
const auth_1 = __importDefault(require("../controllers/auth"));
const ViewRouter = express_1.default.Router();
ViewRouter.get("/login", (req, res) => {
    return res.sendFile((0, staticPath_1.default)("./public/login.html"));
});
ViewRouter.use(auth_1.default.verifyAuthPage);
ViewRouter.get("/", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/admin", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/notis", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/devices/:device_id", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs/new", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs/:org_id", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs/:org_id/members", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs/:org_id/settings", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs/:org_id/configfiles", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs/:org_id/devices", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs/:org_id/devices/:device_id", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs/:org_id/devices/:device_id/configfiles", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs/:org_id/dashboard", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs/:org_id/groups", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs/:org_id/groups/new", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs/:org_id/groups/:group_id", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs/:org_id/groups/:group_id/configfiles", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs/:org_id/groups/:group_id/members", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs/:org_id/groups/:group_id/settings", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs/:org_id/groups/:group_id/devices", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs/:org_id/groups/:group_id/devices/:device_id", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
ViewRouter.get("/orgs/:org_id/groups/:group_id/devices/:device_id/configfiles", (req, res) => {
    res.sendFile((0, staticPath_1.default)("./public/mainpage.html"));
});
exports.default = ViewRouter;
//# sourceMappingURL=view.router.js.map