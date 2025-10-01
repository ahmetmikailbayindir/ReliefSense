# ReliefSense Custom Domain Setup

## Point reliefense.ca to GitHub Pages

### 1. Configure DNS (at your domain registrar)

Add these DNS records:

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

Type: CNAME
Host: www
Value: ahmetmikailbayindir.github.io
```

### 2. Deploy with CNAME file

The CNAME file has been created in `/web/public/CNAME`

Rebuild and deploy:
```bash
cd web
npm run build
npm run deploy
```

### 3. Enable HTTPS in GitHub Settings

1. Go to: https://github.com/ahmetmikailbayindir/ReliefSense/settings/pages
2. Under "Custom domain", enter: `reliefense.ca`
3. Check "Enforce HTTPS" (may take 10-30 minutes to activate)

### 4. Verify

Visit: https://reliefense.ca (may take up to 24 hours for DNS propagation)

---

## Professional Email Setup

Consider setting up: contact@reliefense.ca

Free options:
- **Zoho Mail** (5GB free)
- **Migadu** ($19/year unlimited)
- **Email forwarding** to your existing email (if your registrar supports it)
