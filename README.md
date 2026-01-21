# dark-pattern-detector-extension
Browser extension that detects dark patterns such as urgency pressure and deceptive consent practices on websites and alerts users in real time.



# AI-Powered Dark Pattern Detection Browser Extension

## 1. Project Overview

Modern websites often employ **dark patterns**—deceptive UI/UX techniques that manipulate users into actions they did not intend, such as accepting all cookies, sharing personal data, or subscribing unknowingly. These patterns are subtle, continuously evolving, and difficult for users to identify.

This project presents an **AI-powered browser extension** that detects dark patterns in real time using **Natural Language Processing (NLP)** and warns users *before* they interact with deceptive elements.

The solution focuses on **preventive cybersecurity and privacy protection**, empowering users to make informed decisions.

---

## 2. Problem Statement

Existing tools rely on static keyword rules and fail to adapt to new manipulation techniques. Users are often unaware that they are being nudged or coerced into consent.

There is a need for an **intelligent, adaptive, and real-time solution** that:

* Understands deceptive intent
* Works on dynamic websites
* Warns users before harm occurs

---

## 3. Proposed Solution

We developed a **browser extension backed by an AI analysis server** that:

1. Extracts consent-related UI text (buttons, popups, cookie banners)
2. Uses AI-based NLP intent analysis to classify dark patterns
3. Detects manipulation techniques such as:

   * Forced Action
   * Guilt Tripping
   * Hidden Choice
   * Privacy Zuckering
   * Sneaky Subscription
4. Alerts users in real time via the extension popup

The system is **adaptive**, **scalable**, and **ethically aligned** with privacy regulations.

---

## 4. System Architecture

**High-Level Flow:**

```
Webpage UI
   ↓
Content Script (real-time DOM monitoring)
   ↓
Suspicious Text Filtering
   ↓
AI Backend (NLP Intent Analysis)
   ↓
Dark Pattern Classification
   ↓
User Warning (Browser Extension Popup)
```

### Key Design Choices:

* **Hybrid approach**: rule-based filtering + AI analysis
* **Backend proxy**: protects API keys (cybersecurity best practice)
* **MutationObserver**: enables real-time detection on dynamic pages

---

## 5. Technologies Used

### Frontend (Browser Extension)

* JavaScript
* Chrome Extension Manifest v3
* HTML / CSS

### Backend (AI Server)

* Node.js
* Express.js
* OpenAI API (LLM for NLP analysis)
* dotenv (secure environment variables)

---

## 6. Dark Pattern Categories

The system detects and classifies the following dark patterns:

1. **Forced Action** – User cannot proceed without consent
2. **Guilt Tripping** – Emotional pressure to accept
3. **Hidden Choice** – Reject option is obscured
4. **Privacy Zuckering** – User unknowingly shares personal data
5. **Sneaky Subscription** – Misleading subscriptions or pre-checked options
⚠️ Sneaking Detected
⚠️ Sneaking Detected
⚠️ Sneaking Detected
⚠️ Sneaking Detected

---

## 7. Key Features

* ✅ AI-powered intent detection (not keyword-only)
* ✅ Real-time scanning using DOM mutation monitoring
* ✅ Preventive alerts before user interaction
* ✅ Secure backend with protected API keys
* ✅ Scalable for audits, compliance, and consumer protection

---

## 8. Security & Privacy Considerations

* API keys are **never exposed** in the browser extension
* Backend uses **environment variables** for secrets
* Only minimal UI text is sent for analysis
* No personal user data is stored

This design follows **secure-by-design principles**.

---

## 9. How to Run the Project

### Step 1: Start Backend Server

```bash
cd dark-pattern-backend
node server.js
```

Expected output:

```
Backend running at http://localhost:3000
```

### Step 2: Load Browser Extension

1. Open Chrome → `chrome://extensions`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the extension folder containing `manifest.json`

### Step 3: Test

* Visit websites with cookie banners
* Or modify button text to:

  ```
  Accept all cookies to continue
  ```
* Open the extension popup to see AI detection

---

## 10. Sample Output

```
Dark Pattern: Yes
Category: Forced Action
Risk Level: High
Reason: User is forced to accept cookies to proceed
```

---

## 11. Impact & Use Cases

* Promotes ethical web design
* Encourages transparency and digital trust
* Reduces large-scale data exploitation
* Can be extended into:

  * UX compliance auditing tool
  * Regulatory enforcement aid
  * Consumer protection software

---

## 12. Future Enhancements

* On-page visual highlighting of dark patterns
* User feedback loop to improve detection
* Offline ML model (no external API)
* Dashboard for regulatory audits
* Support for multiple languages

---

## 13. Conclusion

This project demonstrates how **AI and cybersecurity principles** can be combined to proactively protect users from deceptive digital practices. By focusing on **prevention rather than reaction**, the solution aligns with modern privacy, ethics, and user safety requirements.

---

**Developed as part of a Cybersecurity & AI initiative focused on ethical technology and user protection.**


![WhatsApp Image 2026-01-21 at 2 25 34 PM](https://github.com/user-attachments/assets/2cfb0497-22b6-45d1-bce6-f554c9a93546)


<img width="1906" height="983" alt="image" src="https://github.com/user-attachments/assets/c1e974f7-493c-4fcf-a110-0145003352e8" />
⚠️ Forced Action Detected
