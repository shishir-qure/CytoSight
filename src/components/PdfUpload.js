
import { useState, useEffect } from "react";

export default function PdfUpload({ onClose }) {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [files, setFiles] = useState([]);
    const [usedFiles, setUsedFiles] = useState([]);

    useEffect(() => {
        fetch("/api/list-pdfs")
            .then(res => res.json())
            .then(data => {
                setFiles(data.allFiles);
                setUsedFiles(data.usedFiles);
            });
    }, []);


    const handleUpload = async () => {
        if (!file) return;

        setStatus("Uploading...");

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            const data = await res.json();
            setStatus("✅ Upload complete!");
            setUploadedFiles((prev) => [...prev, data.filename]);
            setFile(null); // clear file input
        } else {
            setStatus("❌ Upload failed.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-900 w-[90vw] max-w-xl p-6 rounded-2xl shadow-2xl relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white text-2xl"
                >
                    &times;
                </button>

                {/* Title */}
                <h1 className="text-3xl font-bold text-center mb-6 text-teal-700 dark:text-teal-300">
                    🩺 Qure Clinical PDF Upload
                </h1>

                {/* Used Files Section */}
                {usedFiles.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Available PDFs</h2>
                        <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
                            {usedFiles.map((file, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-center justify-between px-3 py-2 rounded bg-gray-50 dark:bg-gray-800 shadow-sm"
                                >
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{file}</span>
                                    <span className="text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                                        Used in RAG
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* File Input */}
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mb-4 w-full border border-gray-300 rounded px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
                />

                {/* Upload Button */}
                <button
                    onClick={handleUpload}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded w-full font-medium transition"
                >
                    Upload and Vectorize
                </button>

                {/* Upload Status */}
                {status && (
                    <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
                        {status.startsWith("✅") && (
                            <span className="text-green-600 dark:text-green-400">✅</span>
                        )}
                        {status}
                    </p>
                )}

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold dark:text-white">📁 Uploaded PDFs:</h2>
                        <ul className="list-disc list-inside text-teal-600 mt-2 space-y-1">
                            {uploadedFiles.map((file, idx) => (
                                <li key={idx}>
                                    <a
                                        href={`/uploads/${file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline"
                                    >
                                        {file}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>

    );
}
