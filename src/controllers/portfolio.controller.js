import blogs from '../utils/blogsData.js';
import experiences from '../utils/projectsData.js';
import sendEmail from '../utils/emailsender.js';
import dotenv from "dotenv";
dotenv.config();
export const getHomePage = (req, res) => {
    res.render('index', {
        blogs: blogs,
        experiences: experiences
    });
};

export const getAboutPage = (req, res) => {
    res.render('about');
};

export const getProjectsPage = (req, res) => {
    res.render('projects', {
        experiences: projectsData
    });
};

export const getContactPage = (req, res) => {
    res.render('contact');
};

export const sendEnquiry = async (req, res) => { // Renamed from submitEnquiry
    const { name, email, subject, message } = req.body;

    // Basic server-side validation
    if (!name || !email || !message) {
        return res.status(400).render('contact', { error: 'Please fill in all required fields.' });
    }

    try {
        const emailSubject = subject ? `New Enquiry: ${subject}` : `New Enquiry from ${name}`;
        const emailHtml = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `;

        const result = await sendEmail({
            from: email, // Sender's email (from the form)
            to: process.env.RECEIVING_EMAIL, // Your email address to receive enquiries
            subject: emailSubject,
            html: emailHtml
        });

        if (result.success) {
            res.render('success', { message: 'Your enquiry has been sent successfully! I will get back to you soon.' });
        } else {
            console.error('Failed to send email:', result.error);
            res.status(500).render('contact', { error: 'Failed to send your enquiry. Please try again later.' });
        }
    } catch (error) {
        console.error('Error in sendEnquiry controller:', error);
        res.status(500).render('contact', { error: 'An unexpected error occurred. Please try again.' });
    }
}