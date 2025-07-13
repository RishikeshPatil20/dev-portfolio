import express from "express";
import {
    getHomePage,
    getAboutPage,
    getProjectsPage,
    getContactPage,
    sendEnquiry
} from '../controllers/portfolio.controller.js';

const router = express.Router();

router.get("/", getHomePage);
router.get("/about", getAboutPage);
router.get("/projects", getProjectsPage);
router.get("/contact", getContactPage);
router.post("/submit-enquiry", sendEnquiry);

export default router;