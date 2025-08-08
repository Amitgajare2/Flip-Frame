import { useState, useEffect } from 'react';
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

  const fetchProfile = async () => {
    const { data } = await supabase.from('profiles').select('name').eq('id', session.user.id).single();
    if (data) setName(data.name);
  };

  const fetchWebsites = async () => {
    const { data } = await supabase
      .from('websites')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });
    if (data) setWebsites(data);
  };

  useEffect(() => {
    fetchProfile();
    fetchWebsites();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const handleSubmit = async () => {
    setError('');
    if (!html.trim()) {
      setError('HTML code is empty.');
      return;
    }
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
            <button className="dashboard-btn dashboard-action-btn" onClick={handleSubmit}>
              {editingId ? 'Update Website' : 'Host Website'}
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
