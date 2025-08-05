import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { databases, DB_ID, COLLECTION_ID } from '../appwrite/config';

export default function Preview() {
  const { codeId } = useParams();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const res = await databases.getDocument(DB_ID, COLLECTION_ID, codeId);
        setCode(res.code);
      } catch (err) {
        setCode(`<h1 style="color:red">Code not found</h1>`);
      } finally {
        setLoading(false);
      }
    };
    fetchCode();
  }, [codeId]);

  if (loading) return <p className="p-6">Loading preview...</p>;

  return (
    <iframe
      title="Live Preview"
      srcDoc={code}
      sandbox="allow-scripts allow-same-origin"
      className="w-full h-screen border-0"
    />
  );
}
