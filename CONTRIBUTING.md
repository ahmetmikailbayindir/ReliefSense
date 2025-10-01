# Contributing to ReliefSense

Thank you for your interest in contributing to ReliefSense! This humanitarian open-source project supports food security in refugee camps and disaster zones through accessible IoT agriculture technology.

## 🌍 Our Mission

ReliefSense aligns with the **UN Sustainable Development Goals (SDGs)**:
- **SDG 2**: Zero Hunger - Increasing food production in vulnerable communities
- **SDG 13**: Climate Action - Water conservation and sustainable agriculture
- **SDG 17**: Partnerships for the Goals - Open-source collaboration

We follow **ESG (Environmental, Social, Governance)** principles and welcome contributors who share these values.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Contribution Guidelines](#contribution-guidelines)
- [Community & Support](#community--support)

---

## 📜 Code of Conduct

All contributors must follow our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to providing a welcoming, inclusive environment for everyone.

**Key Principles:**
- Respectful communication
- Inclusive language
- Focus on humanitarian impact
- Zero tolerance for harassment

---

## 🤝 How to Contribute

### 🐛 Report Bugs

1. **Check existing issues** - avoid duplicates
2. **Use issue templates** (when available)
3. **Provide details:**
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment: OS, browser, Node/Python version

**Example:**
```
Title: Language selector dropdown hidden on mobile Safari

Steps to reproduce:
1. Open reliefense.ca on iPhone Safari
2. Tap language selector globe icon
3. Dropdown appears but is cut off

Expected: Dropdown should be fully visible
Actual: Only top 2 languages visible

Environment: iOS 17.2, Safari, iPhone 14
```

### 💡 Suggest Features

**Before suggesting:**
- Check GitHub Discussions for similar ideas
- Consider humanitarian use cases
- Think about offline functionality

**When suggesting:**
- Describe the feature clearly
- Explain how it helps humanitarian missions
- Provide implementation ideas (optional)
- Consider ESG/SDG alignment

### 🔧 Submit Pull Requests

**Process:**

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR-USERNAME/ReliefSense.git
   cd ReliefSense
   git remote add upstream https://github.com/ahmetmikailbayindir/ReliefSense.git
   ```

2. **Create Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # OR
   git checkout -b fix/bug-description
   ```

3. **Make Changes**
   - Follow code style guidelines (below)
   - Add copyright headers to new files
   - Write clear commit messages

4. **Test Thoroughly**
   - Test on multiple browsers
   - Test mobile responsiveness
   - Test offline functionality
   - Test language switching

5. **Commit with Conventional Commits**
   ```bash
   git commit -m "feat: add Farsi language support

   Implemented Farsi (fa) translations for all UI components
   with proper RTL text direction support.

   Closes #123

   Copyright (c) 2025 ReliefSense & Ahmet Mikail Bayindir"
   ```

6. **Push & Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub.

**PR Checklist:**
- [ ] Code follows style guidelines
- [ ] Added copyright headers to new files
- [ ] Updated documentation (if needed)
- [ ] Tested on multiple browsers
- [ ] Passes all checks (linting, build)
- [ ] Linked to related issue (if applicable)

---

## 💻 Development Setup

### Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 18+ | Frontend development |
| npm | 8+ | Package management |
| Python | 3.11+ | Backend API |
| SQLite | 3+ | Database |
| Git | 2.30+ | Version control |

### Installation

```bash
# 1. Clone repository
git clone https://github.com/ahmetmikailbayindir/ReliefSense.git
cd ReliefSense

# 2. Frontend setup
cd web
npm install
npm run dev  # Starts dev server at http://localhost:5173

# 3. Backend setup (new terminal)
cd api
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py  # Starts API at http://localhost:5000
```

### Project Structure

```
ReliefSense/
├── web/                  # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── contexts/    # React Context (i18n, state)
│   │   ├── i18n/        # Translations
│   │   └── App.tsx      # Main app
│   └── package.json
├── api/                 # Python Flask backend
│   ├── app.py          # Main API
│   ├── init_db.sql     # Database schema
│   └── requirements.txt
├── blockchain/          # Smart contracts
│   ├── contracts/      # Solidity files
│   └── deploy.js       # Deployment script
└── docs/               # Documentation
```

---

## 📐 Contribution Guidelines

### Code Style

#### JavaScript/TypeScript

**Rules:**
- Use TypeScript for all new components
- Follow ESLint configuration
- Use functional components with hooks
- Prefer named exports
- Add JSDoc comments for complex logic

**Example:**
```typescript
/**
 * Copyright (c) 2025 ReliefSense & Ahmet Mikail Bayindir
 * SPDX-License-Identifier: MIT
 */

import React from 'react'

/**
 * Calculates water savings based on sensor data
 * @param baseline - Baseline water usage in liters
 * @param current - Current water usage in liters
 * @returns Percentage of water saved
 */
export const calculateWaterSavings = (
  baseline: number,
  current: number
): number => {
  return ((baseline - current) / baseline) * 100
}
```

#### Python

**Rules:**
- Follow PEP 8 style guide
- Use type hints
- Write docstrings (Google style)
- Keep functions under 50 lines

**Example:**
```python
# Copyright (c) 2025 ReliefSense & Ahmet Mikail Bayindir
# SPDX-License-Identifier: MIT

from typing import List, Dict

def get_sensor_readings(sensor_id: str) -> List[Dict[str, any]]:
    """
    Retrieve sensor readings from database.

    Args:
        sensor_id: Unique identifier for the sensor

    Returns:
        List of sensor reading dictionaries with timestamp and value

    Raises:
        ValueError: If sensor_id is invalid
    """
    # Implementation
    pass
```

#### Solidity

**Rules:**
- Follow Solidity style guide
- Include NatSpec comments
- Use latest stable version (0.8.x)

**Example:**
```solidity
// SPDX-License-Identifier: MIT
// Copyright (c) 2025 ReliefSense & Ahmet Mikail Bayindir

pragma solidity ^0.8.0;

/**
 * @title HarvestVerification
 * @notice Records harvest data on blockchain for transparency
 * @dev Implements immutable harvest tracking
 */
contract HarvestVerification {
    // Implementation
}
```

### Commit Message Format

We use **Conventional Commits**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, no logic change)
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance (dependencies, build)

**Examples:**
```bash
feat(i18n): add Swahili language support

docs: update deployment guide for custom domains

fix(api): resolve CORS issue on sensor endpoint

chore: upgrade React to 18.3
```

### Testing Requirements

**Before submitting PR:**
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari (if available)
- [ ] Tested mobile responsiveness (viewport)
- [ ] Tested offline mode (network tab)
- [ ] Tested language switching (all 6 languages)
- [ ] Verified no console errors

### Documentation Updates

**When to update docs:**
- Adding new features → Update README.md
- Changing API → Update API docs
- Adding dependencies → Update installation guide
- Changing deployment → Update DEPLOYMENT_GUIDE.md
- Affecting metrics → Update IMPACT.md

---

## 🌍 Humanitarian Context Guidelines

### Design Principles

1. **Offline-First**
   - All features must work without internet
   - Use local storage and SQLite
   - Implement sync when connectivity available

2. **Low-Bandwidth**
   - Minimize image sizes
   - Lazy load components
   - Use efficient data formats

3. **Accessibility**
   - Support RTL languages (Arabic, Kurdish)
   - Use semantic HTML
   - Ensure keyboard navigation
   - Test with screen readers

4. **Security & Privacy**
   - No tracking or analytics
   - Encrypt sensitive data
   - Follow GDPR/UNHCR data protection

5. **Resource-Efficient**
   - Optimize for Raspberry Pi 4
   - Minimize CPU/memory usage
   - Support older browsers

### ESG Compliance

**Environmental:**
- Energy-efficient code
- Optimize for solar-powered deployments
- Reduce data transfer (carbon footprint)

**Social:**
- Inclusive design (6+ languages)
- Support vulnerable communities
- Open-source knowledge sharing

**Governance:**
- Transparent decision-making
- Clear licensing (MIT + Humanitarian)
- Security vulnerability reporting

---

## 🌐 Translation Contributions

**Current languages:**
- ✅ English (en)
- ✅ Arabic (ar) - RTL
- ✅ French (fr)
- ✅ Spanish (es)
- ✅ Turkish (tr)
- ✅ Kurdish (ku) - RTL

**Needed languages:**
- Swahili (sw) - East Africa
- Farsi (fa) - Iran/Afghanistan
- Urdu (ur) - Pakistan
- Somali (so) - Horn of Africa

**How to add translations:**

1. Edit `web/src/i18n/translations.ts`
2. Add language to `supportedLanguages`:
   ```typescript
   {
     code: 'sw',
     name: 'Kiswahili',
     flag: '🇹🇿',
     isRTL: false
   }
   ```
3. Add all translation keys
4. Test language switching
5. Submit PR with screenshots

---

## 🏆 Recognition

**Contributors receive:**
- Name in CONTRIBUTORS.md
- Credit in release notes
- Contributor badge (when available)
- LinkedIn recommendation (upon request)
- Priority access to deployment opportunities

---

## 🆘 Community & Support

### Get Help

- 💬 **GitHub Discussions** - Q&A, ideas, general discussion
- 🐛 **GitHub Issues** - Bug reports, feature requests
- 📧 **Email** - ahmetmikailbayindir@protonmail.com
- 📚 **Documentation** - Full docs in `/docs` folder

### Communication Channels

- **Response time:** 24-48 hours
- **Language:** English (translate.google.com welcome!)
- **Timezone:** EST (UTC-5)

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the **MIT License with Humanitarian Use Clause**.

See [LICENSE](LICENSE) for full details.

---

## 🙏 Thank You

Every contribution—code, documentation, translations, feedback—helps bring food security to vulnerable communities worldwide.

**Together, we're making humanitarian agriculture technology accessible to those who need it most.**

---

**Copyright © 2025 ReliefSense & Ahmet Mikail Bayindir. All rights reserved.**
