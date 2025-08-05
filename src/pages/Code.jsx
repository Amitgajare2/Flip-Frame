import { useState } from 'react';
import { databases, DB_ID, COLLECTION_ID } from '../appwrite/config';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const docId = nanoid(10);
    try {
      await databases.createDocument(DB_ID, COLLECTION_ID, docId, {
        code,
      });
      navigate(`/${docId}`);
    } catch (error) {
      alert("Failed to create snippet. Check Appwrite config.");
      console.error(error);
    }
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
          placeholder="<html>\n  <body>\n    Hello World\n  </body>\n</html>"
        />

        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="mt-6 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 text-lg rounded-md font-semibold"
          >
            🔗 Generate Shareable Link
          </button>
        </div>
      </div>
    </div>
  );
}
