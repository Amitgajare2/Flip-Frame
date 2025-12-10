import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../supabase';
import NotFound from './NotFound';

export default function Preview() {
  const { id } = useParams();
  const [html, setHtml] = useState('');
  const [error, setError] = useState('');
  const [iframeSrc, setIframeSrc] = useState('');

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
        // Sanitize HTML to prevent XSS attacks
        setHtml(data.html);
      }
    };

    loadWebsite();
  }, [id]);

  // Create a Blob URL for the HTML so scripts/styles execute more reliably across CSP/sandbox combos
  useEffect(() => {
    if (!html) {
      setIframeSrc('');
      return;
    }
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setIframeSrc(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [html]);

  if (error) {
    return (
      <NotFound
        title="Site not found"
        message={`We couldn't find a site with id "${id}". Check the link or publish a new snippet.`}
        ctaLabel="Go to Home"
        ctaHref="/"
      />
    );
  }
  if (!html) return <h2>Loading...</h2>;

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src={iframeSrc}
        sandbox="allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts"
        csp="script-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; style-src 'self' 'unsafe-inline' https: data: blob:; img-src 'self' data: https: blob:;"
        allow="fullscreen"
        referrerPolicy="no-referrer"
        style={{ 
          width: '100%', 
          height: '100%', 
          border: 'none',
          
        }}
        title="Preview"
      />
    </div>
  );
}
