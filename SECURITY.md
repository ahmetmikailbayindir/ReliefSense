# Security Policy

## Supported Versions

ReliefSense is currently in active development. Security updates are provided for:

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Given the humanitarian nature of this project and its potential deployment in sensitive environments (refugee camps, conflict zones), we take security seriously.

### Reporting Process

1. **Email:** ahmetmikailbayindir@protonmail.com
2. **Subject:** `[SECURITY] Brief description`
3. **Include:**
   - Type of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

### What to Expect

- **Response time:** Within 48 hours
- **Initial assessment:** Within 7 days
- **Fix timeline:** Depends on severity (see below)

### Severity Levels

**Critical (fix within 24-48 hours):**
- Remote code execution
- Data breach exposing refugee information
- Authentication bypass

**High (fix within 1 week):**
- SQL injection
- XSS vulnerabilities
- Unauthorized data access

**Medium (fix within 2 weeks):**
- CSRF vulnerabilities
- Information disclosure
- Denial of service

**Low (fix within 1 month):**
- Security misconfigurations
- Missing security headers
- Rate limiting issues

## Security Considerations for Humanitarian Use

### Data Protection

ReliefSense handles sensitive information about vulnerable populations. We implement:

- **Local-first data storage** - Data stays on local devices by default
- **Encrypted backups** - All backup data is encrypted
- **Minimal data collection** - Only collect necessary information
- **No third-party analytics** - No tracking or external services

### Deployment Security

For field deployments:

- **Change default credentials** immediately
- **Use HTTPS/TLS** for all network communication
- **Restrict network access** to authorized devices
- **Regular updates** - Keep system and dependencies updated
- **Physical security** - Secure hardware in locked facilities

### Known Limitations

Current security limitations:

1. **Demo version** uses mock data (no real security risks)
2. **Blockchain** contracts are on testnet (not production-ready)
3. **Authentication** system not yet implemented (planned for v1.0)
4. **Encryption** for offline data storage (planned for v1.0)

## Responsible Disclosure

We follow responsible disclosure practices:

1. **Private notification** to maintainers
2. **Coordinated fix** development and testing
3. **Public disclosure** after fix is deployed
4. **Credit** to reporter (unless anonymity requested)

## Security Best Practices for Contributors

When contributing code:

- **Never commit secrets** (API keys, passwords, tokens)
- **Validate all inputs** from users and sensors
- **Use parameterized queries** for database operations
- **Sanitize outputs** to prevent XSS
- **Follow principle of least privilege**
- **Keep dependencies updated**

## Compliance

ReliefSense aims to comply with:

- **GDPR** - Data protection for EU residents
- **UNHCR Data Protection Policy** - Refugee data handling
- **ICRC Data Protection Rules** - Humanitarian data standards

## Security Audits

- **Last audit:** Not yet conducted
- **Planned audit:** Before v1.0 production release
- **Third-party review:** Seeking volunteers with humanitarian tech experience

## Contact

For security concerns: ahmetmikailbayindir@protonmail.com

For general inquiries: Use GitHub Issues

---

**Copyright (c) 2025 ReliefSense & Ahmet Mikail Bayindir. All rights reserved.**
