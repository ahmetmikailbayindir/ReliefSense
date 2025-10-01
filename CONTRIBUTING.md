# Contributing to ReliefSense

Thank you for your interest in contributing to ReliefSense! This project aims to support humanitarian agriculture in refugee camps and disaster zones.

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

* **Clear title and description**
* **Steps to reproduce** the issue
* **Expected vs actual behavior**
* **Screenshots** if applicable
* **Environment details** (OS, browser, Node version)

### 💡 Suggesting Enhancements

Enhancement suggestions are welcome! Please include:

* **Clear description** of the proposed feature
* **Use case** - how it helps humanitarian missions
* **Implementation ideas** if you have them

### 🔧 Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow existing code style** - we use ESLint and Prettier
3. **Write clear commit messages** (see format below)
4. **Test your changes** thoroughly
5. **Update documentation** if needed
6. **Add copyright header** to new files (see below)

#### Commit Message Format

```
<type>: <subject>

<body>

Copyright (c) 2025 ReliefSense & Ahmet Mikail Bayindir
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat: add Kurdish language support for UI

Implemented Kurdish (ku) translations for all UI components
with proper RTL text direction support.

Copyright (c) 2025 ReliefSense & Ahmet Mikail Bayindir
```

### 📝 Copyright Header for New Files

Add this header to all new source files:

**JavaScript/TypeScript:**
```javascript
/**
 * Copyright (c) 2025 ReliefSense & Ahmet Mikail Bayindir
 * SPDX-License-Identifier: MIT
 *
 * ReliefSense - Humanitarian Agriculture Platform
 * https://github.com/ahmetmikailbayindir/ReliefSense
 */
```

**Python:**
```python
# Copyright (c) 2025 ReliefSense & Ahmet Mikail Bayindir
# SPDX-License-Identifier: MIT
#
# ReliefSense - Humanitarian Agriculture Platform
# https://github.com/ahmetmikailbayindir/ReliefSense
```

**Solidity:**
```solidity
// SPDX-License-Identifier: MIT
// Copyright (c) 2025 ReliefSense & Ahmet Mikail Bayindir
// ReliefSense - Humanitarian Agriculture Platform
```

## Development Setup

### Prerequisites

* Node.js 18+
* Python 3.9+
* SQLite 3
* Git

### Installation

```bash
# Clone the repository
git clone https://github.com/ahmetmikailbayindir/ReliefSense.git
cd ReliefSense

# Install frontend dependencies
cd web
npm install

# Install backend dependencies
cd ../api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Running Locally

**Frontend:**
```bash
cd web
npm run dev
# Opens at http://localhost:5173
```

**Backend:**
```bash
cd api
python app.py
# API at http://localhost:5000
```

## Code Style Guidelines

### JavaScript/TypeScript

* Use **TypeScript** for new components
* Follow **ESLint** rules
* Use **functional components** with hooks
* Prefer **named exports** for components
* Write **JSDoc comments** for complex functions

### Python

* Follow **PEP 8** style guide
* Use **type hints** where applicable
* Write **docstrings** for all functions
* Keep functions under 50 lines

### CSS/Tailwind

* Use **Tailwind utility classes** where possible
* Group related classes logically
* Use **custom CSS** only when necessary

## Translation Contributions

We need help translating the UI! Languages currently supported:
- English (complete)
- Arabic (complete)
- French (complete)
- Spanish (complete)
- Turkish (complete)
- Kurdish (complete)

To add a new language:

1. Add language to `web/src/i18n/translations.ts`
2. Provide translations for all keys
3. Update `supportedLanguages` array
4. Test RTL support if applicable

## Testing

* **Manual testing** is currently the primary method
* Test on multiple browsers (Chrome, Firefox, Safari)
* Test mobile responsiveness
* Test offline functionality
* Test multi-language switching

## Documentation

* Update `README.md` for user-facing changes
* Update technical docs in `/docs` folder
* Add inline code comments for complex logic
* Update `IMPACT.md` if affecting metrics

## Humanitarian Context Considerations

When contributing, please consider:

* **Offline-first design** - features must work without internet
* **Low-bandwidth optimization** - minimize data transfer
* **Multi-language support** - UI must support 6+ languages
* **Accessibility** - consider users with limited tech literacy
* **Security** - protect sensitive refugee data
* **Low-resource environments** - optimize for Raspberry Pi

## Community

* **Discord:** (Coming soon)
* **Email:** ahmetmikailbayindir@protonmail.com
* **GitHub Discussions:** Use for Q&A and ideas

## Recognition

Contributors will be:
* Listed in `CONTRIBUTORS.md`
* Mentioned in release notes
* Recognized on the website (when launched)

## License

By contributing, you agree that your contributions will be licensed under the MIT License with the humanitarian use clause. See [LICENSE](LICENSE) for details.

---

**Thank you for helping make humanitarian agriculture technology accessible to those who need it most!**

Copyright (c) 2025 ReliefSense & Ahmet Mikail Bayindir. All rights reserved.
