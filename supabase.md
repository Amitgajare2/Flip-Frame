
# ⚙️ Supabase Setup Guide for Flip Frame

This guide helps you set up Supabase for the **Flip Frame** project – a live HTML hosting platform.

---

## ✅ What You'll Set Up

1. Supabase project
2. Auth for login/signup
3. `profiles` table to store user names
4. `websites` table to store hosted HTML code
5. RLS policies for secure access control

---

## 🧱 1. Create a Supabase Project

1. Go to [https://supabase.com/](https://supabase.com/)
2. Sign in and click **New Project**
3. Fill in:
   - Project Name
   - Password
   - Region
4. Click **Create Project**

---

## 🔑 2. Get Supabase Credentials

Once the project is created:

- Go to **Project Settings → API**
- Copy:
  - `Project URL` (aka `supabaseUrl`)
  - `anon public` key (aka `supabaseKey`)

Use these in your React project (`supabase.js`):

```js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
````

---

## 🔐 3. Enable Email Auth

1. Go to **Authentication → Providers**
2. Make sure **Email** provider is enabled
3. (Optional) Turn off **Confirm Email** for instant login

---

## 📁 4. Create Tables

Go to **Table Editor → New Table**

### Table: `profiles`

* `id` → `uuid` → Primary key → Default: `auth.uid()`
* `name` → `text`

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text
);
```

---

### Table: `websites`

* `id` → `text` (8-char unique string, like `ab12cd34`)
* `user_id` → `uuid` → Foreign key → references `auth.users(id)`
* `html` → `text`
* `created_at` → `timestamp` → default: `now()`

```sql
create table websites (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade,
  html text,
  created_at timestamp default current_timestamp
);
```

---

## 🔒 5. Enable Row-Level Security (RLS)

### Step-by-step:

* Go to `profiles` → Enable RLS → Add policy:

```sql
create policy "Users can manage their own profile"
on profiles
for all
using (auth.uid() = id);
```

---

* Go to `websites` → Enable RLS → Add policies:

```sql
create policy "Users can manage their own websites"
on websites
for all
using (auth.uid() = user_id);

-- (Optional) Allow anyone to view hosted sites
create policy "Public can view hosted websites"
on websites
for select
using (true);
```

---

## 💡 6. Optional Constraints (Enforced in frontend)

Limit each user to max 3 websites (not enforced by DB, enforced in frontend via count check).

---

## 🧪 Test It

Use Supabase's Table Editor or REST Explorer to insert a row and check if:

* Auth works
* You can only see your own data

---

## 🛡️ Summary of Tables

### ✅ `profiles`

| Field | Type      | Description                       |
| ----- | --------- | --------------------------------- |
| id    | uuid (PK) | same as user ID from `auth.users` |
| name  | text      | full name from signup form        |

### ✅ `websites`

| Field       | Type      | Description                 |
| ----------- | --------- | --------------------------- |
| id          | text (PK) | unique site ID (`abc123de`) |
| user\_id    | uuid      | who created it              |
| html        | text      | full HTML code              |
| created\_at | timestamp | auto-filled                 |

---

## 🧠 Tips

* Use `auth.uid()` in RLS for user-specific access
* You can explore `Storage` and `Functions` in Supabase later for:

  * Image uploads
  * Site previews
  * Analytics

