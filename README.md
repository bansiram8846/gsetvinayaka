# Vinayaka Festival 2026 – Gowtham Sai Elite Towers

Official community celebration portal and financial transparency register for **Vinayaka Festival 2026** at **Gowtham Sai Elite Towers Residents Welfare Association**.

A lightweight, zero-dependency static website built using purely **HTML5, CSS3, and Vanilla JavaScript**.

---

## 🌟 Key Features

1. **Festive & Modern Aesthetic**:
   - Designed with warm sacred crimson (`#93000b`), vibrant saffron (`#9d4300`), marigold gold (`#d97706`), and ivory ghee cream surfaces.
   - Modern digital typography pairing using **Outfit** (display headings) and **Plus Jakarta Sans** (body text).

2. **Interactive Hero Image Slideshow**:
   - Smooth animated photo carousel on the home section with auto-play, previous/next controls, and indicator dots.
   - Highlights the central Mandapam, eco-clay idol installation (donated by Praveen - Flat 201), daily evening aartis, and Maha Annadanam (booked by Mohan Rao - Flat 101).

3. **6 Days Festival Schedule**:
   - Day-by-day itinerary with real-time category filtering (**All Events**, **Pujas & Aarti**, **Cultural & Competitions**, **Special Highlights**).
   - Daily evening Maha Aarti at 07:30 PM.

4. **Puja Sankalpam & Maha Annadanam (With In-Browser Slot Updates)**:
   - **First Day Puja**: Praveen & Family (Flat 201) sitting for Prana Pratishtha; only 1 vacant slot remains for Day 1!
   - **Grand Maha Annadanam**: Saturday, 19 Sept 2026, booked and hosted by Mohan Rao & Family (Flat 101). Open voluntary sponsorship slots for remaining grocery items.
   - **Interactive Slot Booking / Updates**: Residents can click "Book Slot" or "Update" on any timing to assign their flat number, family name, and gotram directly from the UI with automatic local persistence.

5. **Celebration Gallery with Click-to-Enlarge Lightbox & Photo Sharing**:
   - Bento-style gallery grid of festival moments, including the sacred eco-clay Ganesha idol and Maha Annadanam community feast.
   - Fully responsive modal lightbox supporting keyboard navigation (`Escape` key) and backdrop clicks.
   - Community "Share Photo" feature allowing residents to upload celebration photos directly to the gallery.

6. **Devotee Contact & On-Site Helpdesk**:
   - Central Mandapam location details and daily evening seva coordination.

---

## 📁 Project Structure

```
├── index.html                  # Main static HTML entry point
├── style.css                   # Pure CSS stylesheet (colors, typography, responsive layout)
├── script.js                   # Festival data arrays, slot updater, and interactive logic
├── public/images/              # Festive images (eco-clay Ganesha, Maha Annadanam feast)
├── README.md                   # Documentation and customization guide
└── .github/
    └── workflows/
        └── deploy.yml          # GitHub Actions workflow for automatic GitHub Pages deployment
```

---

## ✏️ How to Edit Festival Data

All festival data is stored in simple, well-commented JavaScript objects and arrays at the top of `script.js`. You do not need any coding experience or backend to update them:

1. **Festival Basics & Dates**:
   - Edit the `festivalConfig` object in `script.js` to change the festival dates or tower details.

2. **Schedule Itinerary**:
   - Modify the `scheduleData` array in `script.js` to add, edit, or reorder events, timings, and venues.

3. **Sankalpam Slots & Annadanam Sponsors**:
   - Update `DEFAULT_YAJAMAN_SLOTS` and `DEFAULT_ANNADANAM_DONORS` in `script.js`, or simply update them live in the web browser using the "Book / Update Slot" modals.

4. **Gallery Images**:
   - Add new image URLs and captions in `DEFAULT_GALLERY_DATA` in `script.js` or upload via the "Share Photo" button.

---

## 🚀 Deploying to GitHub Pages

This project is built to work immediately on GitHub Pages without any build steps.

### Method 1: Automatic GitHub Actions (Recommended)
1. Push this repository to GitHub on the `main` branch.
2. In your GitHub repository, go to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your site!

### Method 2: Classic Branch Publishing
1. In your GitHub repository, go to **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
3. Choose the **main** branch and **/(root)** folder.
4. Click **Save**. Your site will be live at `https://<username>.github.io/<repository-name>/` in 1-2 minutes.

---

## 📜 License

Created for **Vinayaka Festival 2026 – Gowtham Sai Elite Towers Residents Welfare Association**. Free to use, adapt, and celebrate!
