# Domain Strategy for ReliefSense

**Domain:** reliefense.ca
**Owner:** Ahmet Mikail Bayindir
**Date:** September 30, 2025

---

## 🎯 Recommended Domain Structure

### Option A: Subdomain Approach (Recommended)

```
reliefense.ca                    → Foundation/Organization website
├── www.reliefense.ca           → Same as above (redirect)
├── app.reliefense.ca           → Platform demo/application
├── docs.reliefense.ca          → Documentation site
├── blog.reliefense.ca          → Updates and news
└── api.reliefense.ca           → API endpoint (when deployed)
```

**Advantages:**
- Professional separation of concerns
- Foundation website can be static/simple
- Platform demo separate from marketing site
- Easy to manage with DNS CNAME records

**Current Status:**
- ❌ Not configured yet
- ⏳ Waiting for DNS setup

### Option B: Path-Based Approach

```
reliefense.ca                    → Foundation/Organization website
├── reliefense.ca/demo          → Platform demo
├── reliefense.ca/docs          → Documentation
├── reliefense.ca/blog          → Updates
└── reliefense.ca/api           → API endpoint
```

**Advantages:**
- Single domain, easier SEO
- Simpler DNS setup (one A record)

**Disadvantages:**
- Harder to separate static site from app
- GitHub Pages doesn't support path routing well

---

## 📋 Recommended Setup

### Phase 1: Current State (GitHub Pages)

**Keep current demo at GitHub URL:**
```
https://ahmetmikailbayindir.github.io/ReliefSense/
```

**Remove CNAME file temporarily:**
```bash
rm web/public/CNAME
```

**Why:** Let's set up the foundation website first, then configure subdomains properly.

### Phase 2: Foundation Website Setup

**Create foundation website at reliefense.ca:**

**Content:**
```
Homepage
├── Mission & Vision
├── About the Platform
├── Impact Metrics
├── Team
├── Partners (seeking)
├── Contact
└── [Try Demo Button] → app.reliefense.ca (or GitHub Pages for now)
```

**Technology Options:**

1. **Static Site Generators** (Recommended)
   - Hugo (fast, simple)
   - Jekyll (GitHub Pages native)
   - 11ty (flexible)

2. **Website Builders** (Easiest)
   - Webflow (professional, free tier)
   - Carrd (simple, $19/year)
   - GitHub Pages + custom HTML

3. **Simple HTML/CSS** (Full control)
   - Create basic landing page
   - Host on GitHub Pages or Netlify

### Phase 3: DNS Configuration

**Once foundation site is ready:**

**A Records (point to GitHub Pages):**
```
Type: A
Host: @
Value: 185.199.108.153

Type: A
Host: @
Value: 185.199.109.153

Type: A
Host: @
Value: 185.199.110.153

Type: A
Host: @
Value: 185.199.111.153
```

**CNAME Records (subdomains):**
```
Type: CNAME
Host: www
Value: ahmetmikailbayindir.github.io

Type: CNAME
Host: app
Value: ahmetmikailbayindir.github.io

Type: CNAME
Host: docs
Value: ahmetmikailbayindir.github.io
```

---

## 🌐 URL Structure Proposal

### Current URLs (Temporary)

| Resource | Current URL |
|----------|-------------|
| **Platform Demo** | https://ahmetmikailbayindir.github.io/ReliefSense/ |
| **GitHub Repo** | https://github.com/ahmetmikailbayindir/ReliefSense |
| **Documentation** | GitHub README.md |
| **Foundation Site** | Not yet created |

### Future URLs (After Setup)

| Resource | Future URL | Hosting |
|----------|------------|---------|
| **Foundation Website** | https://ahmetmikailbayindir.github.io/ReliefSense | GitHub Pages / Netlify |
| **Platform Demo** | https://app.reliefense.ca | GitHub Pages |
| **Documentation** | https://docs.reliefense.ca | GitHub Pages / GitBook |
| **Blog** | https://blog.reliefense.ca | Medium / Ghost |
| **GitHub Repo** | https://github.com/ahmetmikailbayindir/ReliefSense | GitHub |
| **API (when deployed)** | https://api.reliefense.ca | VPS / Cloud |

---

## 🎨 Foundation Website Content Plan

### Homepage Sections

**Hero Section:**
```
🌱 ReliefSense
Bringing Food Security to Refugee Communities Through Smart Agriculture

[Try Demo] [Read Documentation] [Support the Mission]

✅ GDPR Compliant  ✅ ESG Aligned  ✅ Open Source
```

**Mission Statement:**
```
ReliefSense transforms humanitarian agriculture through accessible
IoT technology, providing refugee camps and displaced communities
with the tools to achieve food security.

Aligned with 11 UN Sustainable Development Goals
```

**Key Metrics:**
```
$1,055           97%              150,000
Per Site         Cost Savings     Target Beneficiaries
Cost             vs Commercial    (Year 3)
```

**Platform Features:**
```
[Icon] Offline-First         [Icon] Multi-Language
[Icon] Blockchain Verified   [Icon] IoT Sensors
[Icon] Education Modules     [Icon] Open Source
```

**Call to Action:**
```
🤝 Partner With Us
We're seeking partnerships with NGOs, universities, and humanitarian
organizations to pilot ReliefSense in refugee camps.

[Contact Us] [View Documentation] [GitHub Repository]
```

**Footer:**
```
© 2025 ReliefSense & Ahmet Mikail Bayindir
Licensed under MIT with Humanitarian Use Clause

[Privacy Policy] [Security] [ESG Compliance] [Contact]
```

---

## 🛠️ Quick Setup: Simple Foundation Page

### Option 1: Single HTML Page on GitHub Pages

Create a separate repository: `ReliefSense-Website`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ReliefSense - Humanitarian Agriculture Platform</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>🌱 ReliefSense</h1>
        <p>Humanitarian Agriculture Platform</p>
    </header>

    <main>
        <section class="hero">
            <h2>Bringing Food Security to Refugee Communities</h2>
            <a href="https://ahmetmikailbayindir.github.io/ReliefSense/" class="cta">Try Demo</a>
            <a href="https://github.com/ahmetmikailbayindir/ReliefSense" class="cta-secondary">GitHub</a>
        </section>

        <section class="mission">
            <!-- Mission content -->
        </section>

        <section class="features">
            <!-- Features grid -->
        </section>

        <section class="contact">
            <!-- Contact form -->
        </section>
    </main>

    <footer>
        <p>© 2025 ReliefSense & Ahmet Mikail Bayindir</p>
    </footer>
</body>
</html>
```

### Option 2: Use Carrd.co (Simplest)

**Cost:** Free tier or $19/year Pro
**Time:** 30 minutes
**Steps:**
1. Sign up at carrd.co
2. Choose "Landing Page" template
3. Customize content
4. Point reliefense.ca domain to Carrd
5. Done!

---

## 📝 Immediate Action Items

### Step 1: Remove CNAME from Demo (Now)
```bash
cd /home/cannabisense/reliefsense/web/public
rm CNAME
git add .
git commit -m "chore: remove CNAME temporarily until foundation site ready"
git push origin main
```

### Step 2: Update All URLs in Documentation (Now)
```
Replace: https://ahmetmikailbayindir.github.io/ReliefSense
With: https://ahmetmikailbayindir.github.io/ReliefSense/
```

Files to update:
- README.md
- IMPACT.md
- PROJECT_SUMMARY.md
- ESG_COMPLIANCE.md
- COMPLIANCE_CLAIMS.md

### Step 3: Create Foundation Website (This Week)
Choose one:
- [ ] Option A: Simple HTML page on new GitHub repo
- [ ] Option B: Carrd.co landing page
- [ ] Option C: Hugo/Jekyll static site

### Step 4: Configure DNS (After Foundation Site Ready)
- [ ] Add A records for reliefense.ca
- [ ] Add CNAME for app.reliefense.ca
- [ ] Test DNS propagation (24-48 hours)
- [ ] Enable HTTPS

---

## 🎯 Recommended Approach

**My recommendation:**

1. **Now:** Fix URLs to use GitHub Pages link
2. **This Week:** Create simple Carrd.co foundation website
3. **Next Week:** Point reliefense.ca to Carrd
4. **Week After:** Set up app.reliefense.ca subdomain for demo
5. **Later:** Migrate to custom static site when you have time

**This way:**
- ✅ Foundation website looks professional
- ✅ Demo platform accessible via subdomain
- ✅ Clean separation of marketing vs product
- ✅ Easy to manage and update

---

## 💡 LinkedIn Strategy

**Update your posts to:**

```
🌍 ReliefSense - Humanitarian Agriculture Platform

Open-source project bringing food security to refugee communities

✅ GDPR Compliant
✅ ESG Aligned (11 UN SDGs)
✅ Open Source (MIT License)

📊 $1,055 deployment cost vs $35,000 commercial alternatives

🔗 Demo: https://ahmetmikailbayindir.github.io/ReliefSense/
🔗 Foundation: reliefense.ca (coming soon)
🔗 GitHub: github.com/ahmetmikailbayindir/ReliefSense

Seeking partnerships with NGOs for pilot deployment

#humanitarian #opensource #ESG #UNSDG #foodsecurity
```

---

**Want me to help you:**
1. Remove CNAME and fix all URLs now?
2. Create a simple HTML foundation page?
3. Set up Carrd.co account?

Let me know what you prefer!

---

**Copyright © 2025 ReliefSense & Ahmet Mikail Bayindir. All rights reserved.**
