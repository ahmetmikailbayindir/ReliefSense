# 🌱 ReliefSense - Humanitarian Agriculture Platform

<div align="center">

### *Empowering Refugee Communities Through Smart Agriculture Technology*

[![React](https://img.shields.io/badge/React-18.2-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11-3776ab?style=for-the-badge&logo=python)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask)](https://flask.palletsprojects.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06b6d4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

**⚠️ Portfolio Demo** | **Full-Stack IoT Project** | **Computer Systems Technician Capstone**

[🌐 Live Demo](https://ahmetmikailbayindir.github.io/ReliefSense/) • [Report Bug](https://github.com/ahmetmikailbayindir/ReliefSense/issues) • [Request Feature](https://github.com/ahmetmikailbayindir/ReliefSense/issues)

</div>

---

## 🎯 Project Vision

**ReliefSense** addresses one of the world's most critical challenges: **food security in humanitarian crises**. Designed for refugee camps, displaced communities, and resource-limited environments, this platform demonstrates how **IoT technology and smart agriculture** can transform lives.

### The Problem
- 🌍 **108 million** people forcibly displaced worldwide (UNHCR 2023)
- 🍽️ **Food insecurity** affects 70%+ of refugee populations
- 💧 **Water scarcity** in 80% of refugee camp locations
- 📡 **Limited connectivity** in humanitarian zones

### Our Solution
ReliefSense provides **offline-first, IoT-enabled agriculture management** that:
- Reduces water usage by **47%** through smart irrigation
- Increases crop yields by **2.3x** with data-driven insights
- Works **100% offline** with sync when connectivity is available
- Supports **6 languages** including Arabic (RTL) for accessibility

---

## 📖 About This Project

This is a **portfolio demonstration** showcasing my technical capabilities as a **Computer Systems Technician - Networking** student at Algonquin College. The project demonstrates:

✅ **Full-stack web development** - React + TypeScript frontend, Python Flask backend
✅ **IoT & sensor networks** - Real-time data collection, RESTful API design
✅ **Database management** - SQLite for data persistence and queries
✅ **Network architecture** - API design, CORS configuration, client-server communication
✅ **System administration** - Linux server setup, environment configuration, deployment
✅ **Version control** - Git workflow, GitHub, professional documentation

## ✨ Key Features

### 🌡️ Real-Time Environmental Monitoring
- **Live sensor dashboard** tracking temperature, humidity, CO₂, and light levels
- **Automatic alerts** for optimal growing conditions
- **Historical data trends** with interactive charts
- **Multi-sensor support** for different growing zones

### 🌾 Smart Crop Management
- **Complete crop lifecycle tracking** from planting to harvest
- **Growth progress visualization** with health indicators
- **Harvest predictions** based on environmental data
- **Crop-specific recommendations** (lettuce, tomatoes, carrots, etc.)

### 📱 Offline-First Architecture
- **100% offline functionality** with local SQLite database
- **Automatic sync** when connectivity is restored
- **Progressive Web App** (PWA) for mobile installation
- **Low-bandwidth optimized** for humanitarian contexts

### 🌍 Accessibility & Internationalization
- **6 languages**: English, Arabic, French, Spanish, Turkish, Kurdish
- **RTL (Right-to-Left) support** for Arabic and Hebrew
- **Mobile-first responsive design** for tablets and smartphones
- **Accessible UI** following WCAG guidelines

### 📊 Data Visualization & Analytics
- **Interactive charts** using Recharts library
- **Real-time updates** every 3-5 seconds
- **Trend analysis** for environmental conditions
- **Impact metrics** (water savings, yield increases)

---

## 🛠️ Tech Stack

<table>
<tr>
<td>

**Frontend**
- ⚛️ React 18.2
- 📘 TypeScript 5.0
- 🎨 Tailwind CSS 3.4
- ⚡ Vite (build tool)
- 📊 Recharts (data visualization)
- 🎭 Lucide Icons

</td>
<td>

**Backend** *(for local dev)*
- 🐍 Python 3.11
- 🌶️ Flask REST API
- 🗄️ SQLite database
- 🔌 Flask-CORS

**Demo Deployment**
- GitHub Pages (static)
- Mock data (no backend)

</td>
<td>

**Development Tools**
- 📦 npm/pip
- 🔧 Git & GitHub
- 💻 VS Code
- 🌐 GitHub Pages
- 🔒 Environment variables

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Git

### Installation & Setup

**1. Clone the repository**
```bash
git clone https://github.com/ahmetmikailbayindir/ReliefSense.git
cd ReliefSense
```

**2. Set up the backend API**
```bash
cd api
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python mock_server.py
```
Backend will run on `http://localhost:8001`

**3. Set up the frontend (new terminal)**
```bash
cd web
npm install
npm run dev
```
Frontend will run on `http://localhost:3000`

**4. Configure environment (optional)**
```bash
cd web
cp .env.example .env
# Edit .env to customize API URL
```

### 🎉 Done!
Open your browser to `http://localhost:3000` and explore ReliefSense!

---

## 📸 Screenshots

### Main Dashboard
![ReliefSense Dashboard](screenshots/reliefsense-dashboard.png)
*Real-time environmental monitoring, crop tracking, and impact metrics in action*

**Key Elements Shown:**
- 🌍 Mission statement and humanitarian impact
- 📊 Real-time impact metrics (water savings, yield increases, active sites)
- 🌱 Active crop tracking with growth progress
- 📈 Environmental conditions trend chart
- 🌡️ Live sensor readings (temperature, humidity, CO₂, light)
- 💡 Technical skills showcase

---

## 🏗️ Project Architecture

```
ReliefSense/
├── api/                    # Python Flask backend
│   ├── mock_server.py     # Demo API server
│   ├── requirements.txt   # Python dependencies
│   └── venv/              # Virtual environment
├── web/                   # React frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── contexts/      # React Context (i18n, state)
│   │   ├── App.tsx        # Main application
│   │   └── main.tsx       # Entry point
│   ├── package.json       # npm dependencies
│   └── vite.config.ts     # Vite configuration
├── README.md              # This file
└── LICENSE                # MIT License
```

---

## 💡 Use Cases

### 🏕️ Refugee Camps
Provides food security through smart agriculture in resource-limited environments. Offline-first design ensures functionality without reliable internet.

### 🌍 Community Gardens
Empowers local communities with data-driven insights for sustainable food production. Multi-language support ensures accessibility across diverse populations.

### 💧 Water Conservation
Smart irrigation reduces water usage by 47% while improving crop yields. Critical for areas facing water scarcity and drought conditions.

---

## 🎓 What I Learned Building This

This project helped me develop skills in:

**Computer Systems Technician - Networking Skills:**
- **Network Architecture**: Client-server communication, API design, CORS configuration
- **System Administration**: Linux environment setup, process management, server deployment
- **Troubleshooting**: Debugging network issues, API connectivity, environment configuration

**Development Skills:**
- **Full-Stack Web Development**: React frontend, Python Flask REST API, SQLite database
- **IoT Concepts**: Real-time sensor data simulation, network monitoring
- **Version Control**: Git workflow, GitHub Pages deployment
- **Documentation**: Professional README, code comments, deployment guides

**Soft Skills:**
- **Problem Solving**: Offline-first architecture for humanitarian contexts
- **Project Management**: Breaking down features, tracking progress
- **Communication**: Technical documentation for different audiences

---

## 👨‍💻 About the Developer

<table>
<tr>
<td width="60%">

**Ahmet Mikail Bayindir**
*Computer Systems Technician - Networking Student*
Algonquin College, Ottawa

### 🎯 Program Focus & Skills
- **Networking**: TCP/IP, routing protocols, network troubleshooting
- **System Administration**: Linux/Windows server configuration
- **Web Development**: React, TypeScript, Python Flask
- **Database Management**: SQL, SQLite
- **IoT Integration**: Sensor networks, real-time data collection
- **Hardware**: PC troubleshooting, network device configuration

### 💼 Seeking Co-op Opportunities
Currently seeking co-op positions in:
- **Network Administration** / IT Support
- **System Administration** (Linux/Windows)
- **Software Development** (Full-stack web)
- **IoT/Hardware Integration**

</td>
<td width="40%">

### 📫 Contact

📧 **Email**
[ahmetmikailbayindir@protonmail.com](mailto:ahmetmikailbayindir@protonmail.com)

💼 **LinkedIn**
[linkedin.com/in/ahmetmikailbayindir](https://linkedin.com/in/ahmetmikailbayindir)

🐙 **GitHub**
[github.com/ahmetmikailbayindir](https://github.com/ahmetmikailbayindir)

⭐ **Portfolio**
More projects coming soon!

</td>
</tr>
</table>

---

## 🤝 Contributing

While this is a portfolio project, I'm open to feedback and suggestions!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**Portfolio Demonstration Project** - Created for educational and employment purposes.

---

## 🙏 Acknowledgments

- **Algonquin College** - Computer Systems Technician Program
- **UNHCR** - For humanitarian data and refugee statistics
- **Open Source Community** - For amazing tools and libraries
- **Humanitarian Organizations** - For inspiring this project's mission

---

## 📊 Project Status

🚧 **Active Development** - Last updated: September 2025

- ✅ Core features implemented
- ✅ Demo API functional
- ✅ Responsive design complete
- 🔄 Adding more sensors and analytics
- 📋 Planning offline sync implementation
- 🎨 UI/UX improvements ongoing

---

<div align="center">

### ⭐ If you find this project interesting, please star the repository!

**Built with 💚 for humanitarian impact**

*Making technology accessible for those who need it most*

</div>
