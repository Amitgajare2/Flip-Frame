# 🧪 React + Supabase HTML Hosting Platform

<!-- Tech stack -->
![React](https://img.shields.io/badge/React-🟦-61DAFB?logo=react&logoColor=white&label=)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&label=)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=white&label=)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white&label=)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white&label=)

![Stars](https://img.shields.io/github/stars/Amitgajare2/Flip-Frame?style=social)
![Forks](https://img.shields.io/github/forks/Amitgajare2/Flip-Frame?style=social)


A simple web app where authenticated users can paste their HTML code and get a live website link like:

```

demo.vercel.app/abc123

````

---

## 🚀 Features

- 🔐 User Signup/Login with Supabase Auth
- 🙋 Signup asks for Name, Email, Password
- 🧾 User dashboard shows their name and lets them host HTML
- 🌐 Public live preview pages via unique URLs
- 🔒 Only logged-in users can host pages
- ✅ Row-Level Security (RLS) enabled

---

## 🧩 Stack

- Frontend: **React.js**
- Styling: **Normal CSS**
- Backend: **Supabase** (Auth + DB + RLS)
- Routing: **React Router**
- Hosting: **Vercel** or Netlify

---

## 🛠 Supabase Setup

### 1. Create Project

- Go to [https://supabase.com/](https://supabase.com/) → New Project
- Note the **Project URL** and **Anon API Key**

---

### 2. Enable Auth

- Go to **Authentication → Settings**
- Disable "Confirm email" for instant login after signup (optional)

---

### 3. Create Tables

#### `profiles` Table

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text
);
````

#### `websites` Table

```sql
create table websites (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade,
  html text,
  created_at timestamp default current_timestamp
);
```

---

### 4. Enable RLS

Go to each table (`profiles`, `websites`) → Enable **Row Level Security**

#### RLS Policies for `profiles`

```sql
create policy "Users can manage their own profile"
on profiles
for all
using (auth.uid() = id);
```

#### RLS Policies for `websites`

```sql
create policy "Users can manage their own websites"
on websites
for all
using (auth.uid() = user_id);

-- Optional: public can view hosted sites by ID
create policy "Public can view hosted websites"
on websites
for select
using (true);
```

---

## ⚙️ Local Development

### 1. Clone the Repo

```bash
git clone https://github.com/Amitgajare2/Flip-Frame
cd Flip-Frame
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase Client

Create `src/supabase.js`:

```js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://YOUR_PROJECT.supabase.co';
const supabaseKey = 'YOUR_PUBLIC_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);
```

Replace `YOUR_PROJECT` and `YOUR_PUBLIC_ANON_KEY` with values from your Supabase dashboard.

---

### 4. Run the App

```bash
npm run dev
```

Visit `http://localhost:5173/` to see the app.

---

## 🧪 Pages Overview

| Route        | Description                        |
| ------------ | ---------------------------------- |
| `/`          | Home page with login/signup        |
| `/dashboard` | Logged-in user's dashboard         |
| `/:id`       | Public preview of hosted HTML code |

---

## 🛰 Deploy to Vercel (or Netlify)

### Vercel

1. Push to GitHub
2. Import to Vercel
3. Set environment variables (optional)
4. Deploy 🎉

### Netlify

1. Set `build` to `vite` (`npm run build`)
2. `publish` folder = `dist`
3. Add Redirect rule for React Router:

```txt
/* /index.html 200
```

---

## 📦 Dependencies

```bash
npm install @supabase/supabase-js react-router-dom uuid
```

---

## 📌 Notes

* Each site gets a random 8-char ID like `/gh32hdbs`
* Supabase RLS protects user data
* Add CSS, JS support or themes later

---

## 🧑‍💻 Author

Made by you ❤️



