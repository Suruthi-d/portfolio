# Suruthi D — UI/UX Designer Portfolio

A clean, professional portfolio built with HTML, CSS & JavaScript. Ready to deploy on GitHub Pages in minutes.

---

## 🚀 Deploy to GitHub Pages (Step-by-Step)

### Step 1 — Create a GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click **"New"** (green button) to create a new repository
3. Name it exactly: `portfolio` (or `your-username.github.io` for a root URL)
4. Set it to **Public**
5. Click **"Create repository"**

### Step 2 — Upload Your Files
1. In your new repo, click **"uploading an existing file"**
2. Drag and drop all three files:
   - `index.html`
   - `style.css`
   - `script.js`
3. Click **"Commit changes"**

### Step 3 — Enable GitHub Pages
1. Go to your repo → **Settings** tab
2. Scroll to **"Pages"** in the left sidebar
3. Under **"Branch"**, select `main` and `/ (root)`, then click **Save**
4. Wait ~60 seconds, then visit:
   ```
   https://your-username.github.io/portfolio
   ```

That's it — your portfolio is live! 🎉

---

## 📸 Adding Your Photo

**Option A — Drag & Drop (in browser)**
Open `index.html` in a browser and simply **drag your photo** onto the placeholder box. The photo will appear instantly (for preview only; you still need to do Option B for the live site).

**Option B — Permanent (for live site)**
1. Save your photo as `photo.jpg` inside the `portfolio` folder
2. Open `index.html` in any text editor
3. Find this section (around line 58):
   ```html
   <div class="photo-frame">
     <div class="photo-placeholder">
       ...
     </div>
   </div>
   ```
4. Replace it with:
   ```html
   <div class="photo-frame">
     <img src="photo.jpg" alt="Suruthi D" style="width:100%;height:100%;object-fit:cover;" />
   </div>
   ```
5. Upload both `index.html` and `photo.jpg` to GitHub

---

## 📁 File Structure

```
portfolio/
├── index.html     ← Main page (all sections)
├── style.css      ← All styles & responsive design
├── script.js      ← Animations, mobile menu, photo upload
└── README.md      ← This guide
```

---

## ✏️ Customizing

| What to change | Where to find it |
|---|---|
| GitHub URL | Search `yourusername` in `index.html` |
| Profile summary | `#about` section in `index.html` |
| Add a new project | Copy a `project-card` div in `index.html` |
| Change accent color | `--accent` in `:root` in `style.css` |

---

Made with ♥ for Suruthi D's UI/UX Design Interview
