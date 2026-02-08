# ⚡ Blinkit Clone - QuickMart

![License](https://img.shields.io/badge/License-MIT-green.svg) ![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan) ![Google Gemini](https://img.shields.io/badge/AI-Gemini-purple)

A pixel-perfect, fully functional clone of the Blinkit quick-commerce application. This project features a robust product catalog, real-time cart management, an AI-powered smart search engine using Google Gemini, and a dedicated Print Store for document delivery.

---

## 🚀 Features

### 🛍️ Core Commerce
*   **Massive Catalog:** Browse over 2,000+ realistic products across 15+ categories including Vegetables, Munchies, Pharmacy, and more.
*   **Smart Search (AI):** Powered by **Google Gemini**, the search understands natural language (e.g., *"ingredients for pasta"* or *"healthy snacks"*).
*   **Real-time Cart:** Dynamic cart management with instant total calculation, tax breakdown, and savings display.
*   **Checkout Flow:** Complete address management and a simulated payment gateway supporting UPI, Cards, Netbanking, and COD.

### 🖨️ Print Store (New!)
*   **Futuristic Upload:** Drag-and-drop file interface with a sci-fi scanning animation.
*   **Custom Configuration:** Select paper type (Standard, Bond, Glossy), color mode, single/double-sided, and binding options (Spiral, Softcover).
*   **Integrated Payments:** Dedicated payment flow within the Print Store module.

### 🎨 UI/UX
*   **Mobile First:** Designed to feel exactly like a native mobile app with bottom navigation, touch-friendly touch targets, and smooth transitions.
*   **Responsive:** Scales perfectly to desktop views without losing utility.
*   **Animations:** Smooth slide-ins, pulse effects, and skeleton loading states.

---

## 🛠️ Tech Stack

*   **Frontend:** React 18, TypeScript, Vite
*   **Styling:** Tailwind CSS, Lucide React (Icons)
*   **AI Integration:** Google GenAI SDK (Gemini 1.5 Flash)
*   **State Management:** React Hooks & Local Storage Persistence

---

## 🏃‍♂️ Getting Started

### Prerequisites
*   Node.js (v16 or higher)
*   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/blinkit-clone.git
    cd blinkit-clone
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory and add your Google Gemini API key:
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

---

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components (ProductCard, CartDrawer, etc.)
├── services/         # API integrations (Gemini AI service)
├── types.ts          # TypeScript definitions
├── constants.ts      # Mock data generator and configuration
├── App.tsx           # Main application logic and routing
└── index.tsx         # Entry point
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Made with ❤️ by <b>Godkun</b></p>
</div>
