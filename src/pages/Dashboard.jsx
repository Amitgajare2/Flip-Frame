import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../supabase';
import { v4 as uuidv4 } from 'uuid';
import "./dashboard.css"
import Footer from "../components/Footer";
// import { WrapButton } from '../components/Btn';
import { CiLink } from "react-icons/ci";
import { MdDateRange, MdOpenInNew, MdContentCopy, MdEdit, MdDelete } from "react-icons/md";

export default function Dashboard({ session }) {
  const [name, setName] = useState('');
  const [html, setHtml] = useState('');
  const [websites, setWebsites] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastSubmissionTime = useRef(0);
  const formRef = useRef(null);
  const [copiedId, setCopiedId] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

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
    if (htmlContent.length > 500 * 1024) {
      throw new Error('HTML content too large. Maximum size is 500KB.');
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

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type, message) => {
    const id = uuidv4();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), 2500);
  }, [removeToast]);

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
          addToast('success', 'Website updated successfully');
        } else {
          setError(error.message);
          addToast('error', error.message || 'Update failed');
        }
      } else {
        if (websites.length >= 3) {
          setError('You can only host up to 3 websites.');
          addToast('error', 'You can only host up to 3 websites');
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
          addToast('success', 'Website hosted successfully');
        } else {
          setError(error.message);
          addToast('error', error.message || 'Hosting failed');
        }
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
      addToast('error', 'Unexpected error, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (site) => {
    setHtml(site.html);
    setEditingId(site.id);
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;
    const id = confirmDeleteId;
    setConfirmDeleteId(null);
    const { error } = await supabase.from('websites').delete().eq('id', id);
    if (!error) {
      fetchWebsites();
      addToast('success', 'Website deleted');
    } else {
      addToast('error', error?.message || 'Delete failed');
    }
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyLink = async (id) => {
    const url = `${window.location.origin}/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1200);
      addToast('success', 'Link copied');
    } catch {
      addToast('error', 'Copy failed');
    }
  };

  const userDisplayName = name || session.user.email;
  const userInitials = (name || session.user.email)
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    const onDocClick = (e) => {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    const onEsc = (e) => {
      if (e.key === 'Escape') setIsUserMenuOpen(false);
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  return (
    <div className="dashboard-bg">
      <div className="grid-overlay" />
      <div className="toast-container" aria-live="polite" aria-atomic="true">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast--${t.type}`} onClick={() => removeToast(t.id)} role="status">
            {t.message}
          </div>
        ))}
      </div>
      <div className="dashboard-container">
        <nav className="navbar">
          <div className="navbar-left">
            <span className="navbar-logo">FlipFrame</span>
            <span className="navbar-sep" aria-hidden="true" />
            {/* <span className="navbar-title">Dashboard</span> */}
          </div>
          <div className="navbar-right" ref={userMenuRef}>
            <button
              className="navbar-avatar-btn"
              onClick={() => setIsUserMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={isUserMenuOpen}
            >
              <div className="navbar-avatar" aria-hidden="true">{userInitials}</div>
              <span className="navbar-username">{userDisplayName}</span>
            </button>
            {isUserMenuOpen && (
              <div className="navbar-menu" role="menu">
                <div className="navbar-userinfo">
                  <div className="navbar-avatar small" aria-hidden="true">{userInitials}</div>
                  <div className="navbar-usertext">
                    <span className="navbar-name">{name || session.user.email.split('@')[0]}</span>
                    <span className="navbar-email">{session.user.email}</span>
                  </div>
                </div>
                <button className="navbar-menu-item" role="menuitem" onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        </nav>
        {/* <p className="dashboard-subtitle">Manage and deploy your hosted HTML snippets with ease.</p> */}
        <div className="dashboard-grid">
          <div ref={formRef} className="dashboard-card dashboard-form-card">
            <h3 className="dashboard-section-title">{editingId ? 'Edit Website' : 'Host New Website'}</h3>
            <textarea
              className="dashboard-textarea"
              placeholder="Paste your HTML, CSS and JS here..."
              rows={14}
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              spellCheck={false}
            />
            <p className="dashboard-helper">We block dangerous tags for security. Max 3 hosted sites per account.</p>
            <div className="dashboard-form-actions">
              <button 
                className="dashboard-btn dashboard-action-btn" 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : (editingId ? 'Update Website' : 'Publish')}
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
            <div className="dashboard-list-titlebar">
              <h3 className="dashboard-section-title">Your Hosted Websites</h3>
              <span className="dashboard-count">{websites.length} / 3 used</span>
            </div>
            {websites.length === 0 && (
              <div className="dashboard-empty">
                <p>No hosted websites yet.</p>
                <button className="dashboard-btn dashboard-empty-cta" onClick={scrollToForm}>Host your first site</button>
              </div>
            )}
            <ul className="dashboard-list">
              {websites.map(site => (
                <li className="dashboard-list-item" key={site.id}>
                  <div className="dashboard-item-header">
                    <div className="dashboard-item-left">
                      <div className="dashboard-avatar">{site.id.slice(0,2).toUpperCase()}</div>
                      <div className="dashboard-item-main">
                        <div className="dashboard-link-row">
                          <span role="img" aria-label="link"><CiLink /></span>
                          <a className="dashboard-link" href={`/${site.id}`} target="_blank" rel="noreferrer">{window.location.origin}/{site.id}</a>
                          <a className="dashboard-open-link" href={`/${site.id}`} target="_blank" rel="noreferrer" title="Open in new tab"><MdOpenInNew /></a>
                        </div>
                        <div className="dashboard-meta-row">
                          <span className="dashboard-badge"><MdDateRange /> {new Date(site.created_at).toLocaleString()}</span>
                          <span className="dashboard-badge">{(((site.html || '').length) / 1024).toFixed(1)} KB</span>
                        </div>
                      </div>
                    </div>
                    <div className="dashboard-actions-row">
                      <button className="dashboard-icon-btn" title={copiedId === site.id ? 'Copied' : 'Copy link'} onClick={() => handleCopyLink(site.id)}>
                        <MdContentCopy />
                        <span>{copiedId === site.id ? 'Copied' : 'Copy'}</span>
                      </button>
                      <button className="dashboard-edit-btn" onClick={() => handleEdit(site)}>
                        <MdEdit />
                        <span>Edit</span>
                      </button>
                      <button className="dashboard-delete-btn" onClick={() => handleDelete(site.id)}>
                        <MdDelete />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Footer />
      </div>
      {confirmDeleteId && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <h4 className="modal-title">Delete this website?</h4>
            <p className="modal-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="dashboard-cancel-btn" onClick={() => setConfirmDeleteId(null)}>Cancel</button>
              <button className="dashboard-btn modal-danger" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
