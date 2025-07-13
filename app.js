import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
dotenv.config();

// __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);// import.meta.url will contain the absolute path to the module, prefixed with file://. 
const __dirname = dirname(__filename);// extract the directory path from __filename which now consist  file URL (e.g., "file:///home/user/project/app.js"

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine and configure views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Import and use your main router
import router from './src/routes/portfolio.router.js';
app.use('/', router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});