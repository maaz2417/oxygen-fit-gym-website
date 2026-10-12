# 🏋️ Oxygen Fit Gym - Website

A modern, responsive, and high-performance website built for **Oxygen Fit Gym**.

---

## 🌟 Key Features

1. **Gym Timings & Schedule**:
   - Live **"OPEN NOW / CLOSED"** status indicator that updates dynamically according to your actual operating hours.
   - Highlights today's schedule row automatically.
   - Peak vs. Quiet hours traffic tracker.
   - Special / Dedicated slot highlights (e.g. Ladies or private batches).

2. **Certified Instructors & Trainers**:
   - Trainer cards featuring specialties (Strength, Fat Loss, CrossFit, Rehab/Mobility).
   - Direct "Book Consultation" action buttons that trigger the free trial pass modal.
   - Instagram and Facebook profile links for each trainer.

3. **Facility & Amenities Showcase**:
   - Highlights free weights, cardio deck, functional/CrossFit turf, steam & sauna, InBody scans, and protein shake bar.

4. **Membership Plans & Pricing**:
   - 1-Day Pass, 1-Month Standard, 3-Month Pro (Most Popular), and Annual VIP tiers.

5. **Location, Contact & Social Links**:
   - Embedded Google Maps with one-click directions.
   - Direct click-to-call phone links.
   - Quick WhatsApp chat integration (including a floating WhatsApp action bubble).
   - Instagram, Facebook, and YouTube social link cards.
   - Interactive message and inquiry form with instant confirmation toast.

6. **Interactive Gym Photo Tester & Gallery**:
   - You can test your gym's photos directly in the browser by dragging and dropping them into the test banner!
   - Built-in slots ready for your actual gym pictures.

---

## 📸 How to Add Your Gym's Real Pictures

Whenever you are ready to put your real gym photos in:

### Method 1: Save the file in the images folder (Recommended)
1. Copy your gym photo into `assets/images/` and name it `gym-hero.jpg`.
2. In `index.html` (around Line 95), change the `src` attribute of the hero image to:
   ```html
   <img id="mainGymHeroImg" src="assets/images/gym-hero.jpg" alt="Oxygen Fit Gym">
   ```

### Method 2: Test live in browser right now!
- Open the website in your browser.
- Scroll to the **"Inside Oxygen Fit"** section.
- Click the dashed banner or drag and drop any picture from your computer to preview how it looks live on the page!

---

## ✏️ How to Customize Your Details

All details are clearly organized in [index.html](file:///home/maaz/Documents/Github/oxygen-fit-gym-website/index.html):

| Item | Where to update in `index.html` |
|---|---|
| **Phone Number** | Search for `+1 (234) 567-8900` and replace with your phone number |
| **WhatsApp Link** | Search for `https://wa.me/12345678900` and put your WhatsApp number with country code (e.g. `923001234567`) |
| **Instagram Link** | Search for `@oxygenfitgym` and change the URL to your Instagram profile |
| **Facebook Link** | Search for `Oxygen Fit Gym` in the social links section |
| **Gym Address** | Search for `124 Main Boulevard` and replace with your real location |
| **Operating Hours** | Update the schedule list in the `#timings` section |

To adjust the **Live Open/Closed time calculations**, edit the opening and closing hours in [js/main.js](file:///home/maaz/Documents/Github/oxygen-fit-gym-website/js/main.js#L18-L26).

---

## 🚀 How to View the Website Locally

You can simply double-click [index.html](file:///home/maaz/Documents/Github/oxygen-fit-gym-website/index.html) in your file manager to open it in any browser!

Or run a lightweight local server:
```bash
# Using Python
python3 -m http.server 8000

# Using Node / npx
npx serve .
```
Then visit `http://localhost:8000` in your browser.
