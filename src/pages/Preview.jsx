import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

export default function Preview() {
  const { id } = useParams();
  const [html, setHtml] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWebsite = async () => {
      const { data, error } = await supabase
        .from('websites')
        .select('html')
        .eq('id', id)
        .single();

      if (error) {
        setError('Website not found');
      } else {
        setHtml(data.html);
      }
    };

    loadWebsite();
  }, [id]);

  if (error) return <h2>{error}</h2>;
  if (!html) return <h2>Loading...</h2>;

  return (
    <iframe
      srcDoc={html}
      style={{ width: '100vw', height: '100vh', border: 'none' }}
      title="Preview"
    />
  );
}
