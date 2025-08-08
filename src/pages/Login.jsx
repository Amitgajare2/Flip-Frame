import { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import "./login.css" 
import { WrapButton } from '../components/Btn';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setErrorMsg('');
    if (!email || !password || (!isLogin && !name)) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErrorMsg(error.message);
      else navigate('/dashboard');
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setErrorMsg(error.message);
        return;
      }
      const userId = data.user?.id;
      if (userId) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({ id: userId, name });
        if (profileError) {
          console.error('Profile creation error:', profileError.message);
        }
      }
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-bg">
      <div className="grid-overlay" />
      <div className="login-card">
        <h1 className="login-title">{isLogin ? 'Login' : 'Sign Up'}</h1>
        {!isLogin && (
          <input
            className="login-input"
            placeholder="Full Name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        )}
        <input
          className="login-input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {errorMsg && <p className="login-error">{errorMsg}</p>}
        <WrapButton className="login-btn" onClick={handleSubmit}>
          {isLogin ? 'Login' : 'Sign Up'}
        </WrapButton>
        <p className="login-toggle-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button className="login-toggle-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
