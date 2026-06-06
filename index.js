const express = require('express');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.MONGO_DB || 'qr_codes_plovdiv';

const qrCodeTemplatePath = path.join(__dirname, 'views', 'code.html');
const page404_path = path.join(__dirname, 'views', '404.html');
const home_path = path.join(__dirname, 'views', 'home.html');

app.use(express.static(path.join(__dirname, 'public')));

async function renderTemplate(item) {
    const template = await fs.promises.readFile(qrCodeTemplatePath, 'utf8');
    return template.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (match, key) => {
        return item[key] != null ? item[key] : '';
    });
}

async function startServer() {
    const client = new MongoClient(mongoUri);

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('items');

    app.get('/:id', async (req, res) => {
        const { id } = req.params;
        const item = await collection.findOne({ id });

        if (!item) {
            return res.status(404).sendFile(page404_path);
        }

        const html = await renderTemplate(item);
        res.send(html);
    });

    app.get('/', (req, res) => {
        res.sendFile(home_path);
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
