<div align="center">

# GitHub Profile Visualizer

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-Latest-purple)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Styled-blue)
![GitHub API](https://img.shields.io/badge/API-GitHub-black)
![License](https://img.shields.io/badge/License-MIT-green)

A modern GitHub analytics dashboard for exploring profile insights, repository statistics, language usage, and contribution activity.

[Live Demo](https://explore-git-visuals.netlify.app/)

</div>

---

## Overview

GitHub Profile Visualizer is a modern web application that allows users to search GitHub profiles and analyze detailed repository data through an interactive dashboard.

It provides profile information, repository analytics, language distribution, contribution insights, and comparison features in a responsive user interface.

---

## Features

* Search GitHub profiles by username
* Display profile details including avatar, bio, followers, following, and repositories
* Show repository statistics including stars, forks, and languages
* Visualize language distribution using charts
* Filter and sort repositories
* Compare multiple GitHub users
* Save favorite profiles and recent searches
* Export profile data as PDF
* Dark and light theme support
* Responsive design for all devices

---


```md
## Screenshot

![Project Screenshot](src/assets/screenshot.png)

---

## Tech Stack

* React 18
* Vite
* Tailwind CSS
* Framer Motion
* Chart.js / Recharts
* React Hot Toast
* GitHub REST API

---

## Project Structure

```text id="79dkq3"
src/
├── components/
│   ├── common/
│   ├── dashboard/
│   ├── comparison/
│   ├── search/
│   └── heatmap/
├── services/
├── utils/
├── hooks/
├── assets/
├── App.jsx
├── main.jsx
└── index.css
```

---

## Installation

```bash id="xv34j6"
git clone https://github.com/your-username/github-profile-visualizer.git
cd github-profile-visualizer
npm install
npm run dev
```

---

## Production Build

```bash id="rsh1e5"
npm run build
```

---

## API Integration

GitHub REST API is used to fetch:

* User profile data
* Public repositories
* Repository analytics

---

## Future Improvements

* GitHub OAuth authentication
* Advanced activity analytics
* Repository trend analysis
* Export in multiple formats

---

## License

MIT License
