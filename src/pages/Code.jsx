import { useState } from 'react';
import { databases, DB_ID, COLLECTION_ID } from '../appwrite/config';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [code, setCode] = useState('');
  const [generatedURL, setGeneratedURL] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const trimmed = code.trim();

    // Check for valid HTML, CSS, or JS content
    const isHTML = /<\s*html[\s>]/i.test(trimmed);
    const isStyle = /<\s*style[\s>]/i.test(trimmed);
    const isScript = /<\s*script[\s>]/i.test(trimmed);
    const isTag = /<[^>]+>/g.test(trimmed);

    if (!(isHTML || isStyle || isScript || isTag)) {
      alert("Only valid HTML, CSS, or JavaScript code is allowed.");
      return;
    }

    if (trimmed.length < 20) {
      alert("The code is too short or not meaningful enough.");
      return;
    }

    const docId = nanoid(10);
    try {
      await databases.createDocument(DB_ID, COLLECTION_ID, docId, {
        code: trimmed,
      });
      const url = `${window.location.origin}/${docId}`;
      setGeneratedURL(url);
      // navigate(`/${docId}`); ← Optional: auto redirect
    } catch (error) {
      alert("Failed to create snippet. Check Appwrite config.");
      console.error(error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedURL);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,_#4b556320_1px,_transparent_1px),linear-gradient(to_bottom,_#4b556320_1px,_transparent_1px)] bg-[size:40px_40px] z-0" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Paste your <span className="bg-white text-black px-2 py-1 italic rounded">HTML</span> code
        </h1>

        <textarea
          className="w-full h-80 rounded-md bg-gray-900 text-white p-4 border border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`<html>\n  <head>\n    <style>body { color: red }</style>\n  </head>\n  <body>\n    Hello World\n  </body>\n</html>`}
        />

        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="mt-6 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 text-lg rounded-md font-semibold"
          >
            🔗 Generate Shareable Link
          </button>
        </div>

        {/* Generated URL Display */}
        {generatedURL && (
          <div className="mt-8 bg-gray-800 border border-gray-700 p-4 rounded-md flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-sm break-all">{generatedURL}</p>
            <button
              onClick={copyToClipboard}
              className="mt-2 md:mt-0 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-semibold"
            >
              📋 Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
