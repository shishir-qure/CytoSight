import fs from "fs";
import path from "path";

const uploadsDir = path.resolve("./public/uploads");
const metadataPath = path.resolve("./rag-metadata.json");

export default function handler(req, res) {
    const allFiles = fs.readdirSync(uploadsDir).filter(f => f.endsWith(".pdf"));

    let usedFiles = [];
    if (fs.existsSync(metadataPath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
        usedFiles = metadata.usedFiles || [];
    }

    res.status(200).json({ allFiles, usedFiles });
}