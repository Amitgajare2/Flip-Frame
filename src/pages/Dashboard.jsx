import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../supabase';
import { v4 as uuidv4 } from 'uuid';
import "./dashboard.css"
// import { WrapButton } from '../components/Btn';
import { CiLink } from "react-icons/ci";
import { MdDateRange } from "react-icons/md";

export default function Dashboard({ session }) {
  const [name, setName] = useState('');
  const [html, setHtml] = useState('');
  const [websites, setWebsites] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastSubmissionTime = useRef(0);

  // Rate limiting: Allow only 1 submission per 2 seconds
  const RATE_LIMIT_MS = 2000;

  // HTML validation function to prevent XSS
  const validateHtml = (htmlContent) => {
    const trimmed = htmlContent.trim();
    // Require HTML-like tags so plain text like "gsdgbnfunb" is rejected
    const hasHtmlLikeTag = /<\s*[a-zA-Z!\/?][^>]*>/.test(trimmed);
    if (!hasHtmlLikeTag) {
      throw new Error('Only HTML/CSS/JS code is allowed. Plain text is not accepted.');
    }

    // Check for size limit (100KB)
    if (htmlContent.length > 1000000000) {
      throw new Error('HTML content too large. Maximum size is 100KB.');
    }
    
    // Check for dangerous patterns (block only high-risk)
    const dangerousPatterns = [
      /\b(?:href|src)\s*=\s*["']\s*javascript:/gi,
      /\b(?:href|src)\s*=\s*["']\s*vbscript:/gi,
      /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
      /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
      /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi
    ];
    
    for (const pattern of dangerousPatterns) {
      if (pattern.test(htmlContent)) {
        throw new Error('HTML contains forbidden elements or attributes for security reasons.');
      }
    }
    
    // Check for excessive external links (potential spam)
    const externalLinks = (htmlContent.match(/https?:\/\//g) || []).length;
    if (externalLinks > 10) {
      throw new Error('Too many external links. Maximum allowed is 10.');
    }
    
    return true;
  };

  const fetchProfile = useCallback(async () => {
    const { data } = await supabase.from('profiles').select('name').eq('id', session.user.id).single();
    if (data) setName(data.name);
  }, [session.user.id]);

  const fetchWebsites = useCallback(async () => {
    const { data } = await supabase
      .from('websites')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });
    if (data) setWebsites(data);
  }, [session.user.id]);

  useEffect(() => {
    fetchProfile();
    fetchWebsites();
  }, [fetchProfile, fetchWebsites]);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const handleSubmit = async () => {
    setError('');
    
    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmissionTime.current < RATE_LIMIT_MS) {
      setError('Please wait a moment before submitting again.');
      return;
    }
    
    if (isSubmitting) {
      setError('Please wait, submission in progress...');
      return;
    }
    
    // Validate HTML content
    try {
      validateHtml(html);
    } catch (validationError) {
      setError(validationError.message);
      return;
    }
    
    if (!html.trim()) {
      setError('HTML code is empty.');
      return;
    }
    
    setIsSubmitting(true);
    lastSubmissionTime.current = now;
    
    try {
      if (editingId) {
        const { error } = await supabase
          .from('websites')
          .update({ html })
          .eq('id', editingId);
        if (!error) {
          setEditingId(null);
          setHtml('');
          fetchWebsites();
        } else {
          setError(error.message);
        }
      } else {
        if (websites.length >= 3) {
          setError('You can only host up to 3 websites.');
          return;
        }
        const id = uuidv4().slice(0, 8);
        const { error } = await supabase.from('websites').insert([
          {
            id,
            user_id: session.user.id,
            html
          }
        ]);
        if (!error) {
          setHtml('');
          fetchWebsites();
        } else {
          setError(error.message);
        }
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (site) => {
    setHtml(site.html);
    setEditingId(site.id);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('websites').delete().eq('id', id);
    if (!error) fetchWebsites();
  };

  return (
    <div className="dashboard-bg">
      <div className="grid-overlay" />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2 className="dashboard-title">Welcome, {name || session.user.email}</h2>
          <button className="dashboard-btn dashboard-logout-btn" onClick={logout}>Logout</button>
        </div>
        <div className="dashboard-card dashboard-form-card">
          <h3 className="dashboard-section-title">{editingId ? 'Edit Website' : 'Host New Website'}</h3>
          <textarea
            className="dashboard-textarea"
            placeholder="Paste your HTML code here"
            rows={10}
            value={html}
            onChange={(e) => setHtml(e.target.value)}
          />
          <div className="dashboard-form-actions">
            <button 
              className="dashboard-btn dashboard-action-btn" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : (editingId ? 'Update Website' : 'Host Website')}
            </button>
            {editingId && (
              <button className="dashboard-cancel-btn" onClick={() => {
                setHtml('');
                setEditingId(null);
              }}>Cancel</button>
            )}
          </div>
          {error && <p className="dashboard-error">{error}</p>}
        </div>
        <div className="dashboard-card dashboard-list-card">
          <h3 className="dashboard-section-title">Your Hosted Websites</h3>
          {websites.length === 0 && <p className="dashboard-empty">No hosted websites yet.</p>}
          <ul className="dashboard-list">
            {websites.map(site => (
              <li className="dashboard-list-item" key={site.id}>
                <div className="dashboard-link-row">
                  <span role="img" aria-label="link"><CiLink></CiLink></span>
                  <a className="dashboard-link" href={`/${site.id}`} target="_blank" rel="noreferrer">{window.location.origin}/{site.id}</a>
                </div>
                <div className="dashboard-meta-row">
                  <span role="img" aria-label="calendar"><MdDateRange /></span> <span>{new Date(site.created_at).toLocaleString()}</span>
                </div>
                <div className="dashboard-actions-row">
                  <button className="dashboard-edit-btn" onClick={() => handleEdit(site)}>Edit</button>
                  <button className="dashboard-delete-btn" onClick={() => handleDelete(site.id)}>Delete</button>
                </div>
                <hr className="dashboard-divider" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
