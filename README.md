
# ⚡ Flip Frame – Instantly Share Live HTML Websites

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss)
![Appwrite](https://img.shields.io/badge/Appwrite-cloud-e535ab?logo=appwrite)


![Stars](https://img.shields.io/github/stars/Amitgajare2/Flip-Frame?style=social)
![Forks](https://img.shields.io/github/forks/Amitgajare2/Flip-Frame?style=social)



Paste your HTML code, generate a unique link, and preview it as a live website — all powered by React and Appwrite.

Live Example: [demo.vercel.app](https://demo.vercel.app) ← replace with your real link

---

## ✨ Features

- 🧠 Paste HTML and get a live preview
- 🔗 Shareable unique link (e.g. /abc123)
- 🤠 No backend or deploys needed
- 🔐 Appwrite-powered storage

---

## 🚀 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://https://github.com/Amitgajare2/Flip-Frame.git
cd Flip-Frame
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Tailwind CSS Setup (already configured)

If needed, verify vite.config.js:


### 4. Appwrite Setup

Create a project in Appwrite Cloud or self-hosted instance.

🗂️ Create:

* Project → SnapView (or any name)
* Database → html-db
* Collection → snippets

📄 Collection Fields:

| Field Name | Type   | Required |
| ---------- | ------ | -------- |
| code       | String | ✅ Yes    |

⚙️ Set these permissions:

* Document create: Role: any
* Document read: Role: any

✍️ In src/appwrite/config.js, update:

```js
client.setEndpoint('https://your-appwrite-endpoint')
      .setProject('your-project-id');

export const DB_ID = 'your-db-id';
export const COLLECTION_ID = 'your-collection-id';
```

✅ Done!

---

## 🧪 Run Locally

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

---


## 🛠 Tech Stack

* React.js + Vite
* Tailwind CSS
* Appwrite (Database)
* react-router-dom
* nanoid

