import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import DOMPurify from 'dompurify';

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
        // Sanitize HTML to prevent XSS attacks
        const sanitizedHtml = DOMPurify.sanitize(data.html, {
          ALLOWED_TAGS: [
            'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'span', 'img', 'a', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th',
            'thead', 'tbody', 'br', 'hr', 'strong', 'em', 'b', 'i', 'u',
            'blockquote', 'pre', 'code', 'section', 'article', 'header', 'footer',
            'nav', 'aside', 'main', 'figure', 'figcaption'
          ],
          ALLOWED_ATTR: [
            'href', 'src', 'alt', 'title', 'class', 'id', 'style',
            'width', 'height', 'target', 'rel', 'data-*'
          ],
          FORBID_TAGS: [
            'script', 'iframe', 'object', 'embed', 'form', 'input', 'textarea',
            'select', 'button', 'meta', 'link', 'style', 'noscript'
          ],
          FORBID_ATTR: [
            'onerror', 'onload', 'onclick', 'onmouseover', 'onmouseout',
            'onfocus', 'onblur', 'onchange', 'onsubmit', 'onkeydown',
            'onkeyup', 'onkeypress', 'onabort', 'onbeforeunload'
          ]
        });
        
        setHtml(sanitizedHtml);
      }
    };

    loadWebsite();
  }, [id]);

  if (error) return <h2>{error}</h2>;
  if (!html) return <h2>Loading...</h2>;

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <iframe
        srcDoc={html}
        sandbox="allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        allow="fullscreen"
        referrerPolicy="no-referrer"
        style={{ 
          width: '100%', 
          height: '100%', 
          border: 'none',
          backgroundColor: 'white'
        }}
        title="Preview"
        loading="lazy"
        importance="low"
      />
    </div>
  );
}
