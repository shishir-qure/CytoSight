// Root: pages/api/ask.js
import { ChatOpenAI } from "langchain/chat_models/openai";
import { RetrievalQAChain } from "langchain/chains";
import { FaissStore } from "langchain/vectorstores/faiss";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export default async function handler(req, res) {
    const { question, patientContext } = req.body;

    try {
        const query = `You are a clinical assistant. Given the patient context and the question, give a structured answer in the following format:

### Suggested Action
<Short actionable recommendation>

### Reasoning
<Explain briefly why based on context and findings>

### Supporting Evidence
<Use bullet points to cite key retrieved book content with page numbers if available>

---

Patient context: ${patientContext}

Question: ${question}`

        const vectorStore = await FaissStore.load("./faiss-store/combined", new OpenAIEmbeddings());
        const retriever = vectorStore.asRetriever();
        const model = new ChatOpenAI({ temperature: 0.3 });

        const chain = RetrievalQAChain.fromLLM(model, retriever, {
            returnSourceDocuments: true,
        });

        const result = await chain.call({
            query: query,
        });

        const citations = result.sourceDocuments.map((doc) => ({
            pageContent: doc.pageContent.slice(0, 300),
            metadata: doc.metadata,
        }));

        res.status(200).json({ answer: result.text, citations });
    } catch (e) {
        console.error("Error in RAG pipeline:", e);
        res.status(500).json({ error: "Something went wrong." });
    }
}




