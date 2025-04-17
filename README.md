# 🧾 Multi Step Form Project

[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF.svg?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-593D88?style=flat&logo=redux&logoColor=white)](https://redux.js.org/)
[![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=flat&logo=reacthookform&logoColor=white)](https://react-hook-form.com/)
[![Zod](https://img.shields.io/badge/Zod-E4F0FF?style=flat&logoColor=black)](https://zod.dev/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat)](https://axios-http.com/)

---

### 🧩 Form Structure

- **Step 1: Publisher Info**
- **Step 2: PIC & Affiliations**

Users can navigate between steps using:

- `Next` and `Previous` buttons

Each step includes form validation. When the **Next** or **Save** button is clicked:

- The current step is validated using **React Hook Form** and **Zod**
- If validation passes, the data is saved to **Redux**

---

## 🚀 How to Run, Build, and Preview

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### 📂 Folder Descriptions

- **`apis/`**
  Contains all API interaction logic, such as Axios instances and service functions.

- **`components/`**
  Reusable UI components that are shared across multiple pages (e.g., `Input`, `Button`, `Stepper`, etc.).

- **`constants/`**
  Includes values that don't change, such as enums, dummy options, stepper configurations.

- **`hooks/`**
  Custom logic extracted into hooks for cleaner and more reusable code (e.g., `useClickOutside`, `useAppSelector`).

- **`pages/`**
  Each file/folder here represents a main page or route.
  Inside each page, there is a `_components/` folder that contains **private, page-specific components**. These components are **only used within that page**, and not shared globally.

- **`schemas/`**
  Contains form validation schemas defined with Zod.

- **`stores/`**
  Redux store configuration and slices used for managing global state, such as multi-step form data.

- **`types/`**
  TypeScript type definitions and interfaces for consistent typing across the project.

---
