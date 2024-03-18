import express from 'express';
import staticPath from 'shared/lib/staticPath';

import AuthController from '../controllers/auth';

const ViewRouter = express.Router();


ViewRouter.get("/login", (req, res) => {
    return res.sendFile(staticPath("./public/login.html"));
});

ViewRouter.use(AuthController.verifyAuthPage);

ViewRouter.get("/", (req, res) => {    
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/admin", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/notis", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/devices/:device_id", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs/new", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs/:org_id", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs/:org_id/members", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs/:org_id/settings", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs/:org_id/configfiles", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs/:org_id/devices", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs/:org_id/devices/:device_id", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs/:org_id/devices/:device_id/configfiles", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs/:org_id/dashboard", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs/:org_id/groups", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs/:org_id/groups/new", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs/:org_id/groups/:group_id", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs/:org_id/groups/:group_id/configfiles", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs/:org_id/groups/:group_id/members", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs/:org_id/groups/:group_id/settings", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs/:org_id/groups/:group_id/devices", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs/:org_id/groups/:group_id/devices/:device_id", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});

ViewRouter.get("/orgs/:org_id/groups/:group_id/devices/:device_id/configfiles", (req, res) => {
    res.sendFile(staticPath("./public/mainpage.html"));
});


export default ViewRouter;