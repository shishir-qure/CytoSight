import fs from "fs";
import path from "path";
import multer from "multer";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";

const upload = multer({ dest: "./public/uploads" });
const metadataPath = path.resolve("./rag-metadata.json");
const combinedStorePath = "faiss-store/combined";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  return new Promise((resolve, reject) => {
    upload.single("file")(req, res, async (err) => {
      if (err) return reject(err);
      const file = req.file;
      if (!file) return reject("No file uploaded");

      const filePath = file.path;
      const originalName = file.originalname;

      try {
        // 1. Load and split PDF
        const loader = new PDFLoader(filePath);
        const rawDocs = await loader.load();
        const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
        const docs = await splitter.splitDocuments(rawDocs);

        const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });
        const newStore = await FaissStore.fromDocuments(docs, embeddings);

        // 2. Merge or create combined store
        let finalStore;
        if (fs.existsSync(`${combinedStorePath}/faiss.index`)) {
          const existing = await FaissStore.load(combinedStorePath, embeddings);
          await existing.mergeFrom(newStore);
          await existing.save(combinedStorePath);
          finalStore = existing;
        } else {
          await newStore.save(combinedStorePath);
          finalStore = newStore;
        }

        // 3. Update metadata
        let usedFiles = [];
        if (fs.existsSync(metadataPath)) {
          const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
          usedFiles = metadata.usedFiles || [];
        }

        if (!usedFiles.includes(originalName)) {
          usedFiles.push(originalName);
          fs.writeFileSync(metadataPath, JSON.stringify({ usedFiles }, null, 2));
        }

        resolve(
          res.status(200).json({
            message: "PDF uploaded and added to vector store",
            filename: originalName,
          })
        );
      } catch (error) {
        console.error("Upload processing failed:", error);
        reject(res.status(500).json({ error: "Failed to process PDF" }));
      }
    });
  });
};

export default handler;
