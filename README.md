# 🌍 Dynamic Data Dashboard

An interactive dashboard built with **Next.js** and **TypeScript** to visualize **time-series weather data** from the [Open-Meteo API](https://open-meteo.com/).  
Users can draw polygons on a map, apply **rule-based color coding**, and explore hourly temperature data using an **interactive timeline slider**.

---
## 🔗 Live Demo
[Live Demo URL](https://adorable-longma-cbce83.netlify.app/)

## 📸 Screenshots
<img width="1905" height="976" alt="image" src="https://github.com/user-attachments/assets/034cff69-4243-4f8a-8f5f-1a2302261439" />
<img width="1892" height="866" alt="image" src="https://github.com/user-attachments/assets/0c8699a2-7ada-4740-80c9-040669df2fe2" />



**Dashboard View**  
<img width="1892" height="878" alt="image" src="https://github.com/user-attachments/assets/bbd5c24f-ca8a-42e9-9922-9cc141e53990" />

 



---

## ✨ Core Features

- **Interactive Timeline**  
  30-day horizontal slider to select a specific hour for data visualization.

- **Interactive Map**  
  Leaflet-based map with pan/zoom and polygon drawing.

- **Polygon Drawing**  
  Draw custom polygons (3–12 vertices) to define regions of interest.

- **Dynamic Data Fetching**  
  Each polygon fetches hourly temperature data (`temperature_2m`) from the **Open-Meteo API** based on its geographic center.

- **Rule-Based Color Coding**  
  Define custom rules for coloring polygons based on temperature values  
  *(e.g., `< 10°C → Blue`, `>= 25°C → Red`)*.

- **State Management with Zustand**  
  Centralized store ensures data stays in sync across the map, sidebar, and timeline.

- **Component-Based Architecture**  
  Clean, scalable, and modular React component structure.

- **Instant Dynamic Updates**  
  UI reacts instantly to changes in the timeline or polygons.

---

## 🛠 Tech Stack

- **Framework:** [Next.js 13+](https://nextjs.org/) (App Router, Server Components)
- **Language:** TypeScript
- **Mapping:**  
  - [React-Leaflet](https://react-leaflet.js.org/)  
  - [react-leaflet-draw](https://github.com/alex3165/react-leaflet-draw)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **UI Components:** [Ant Design](https://ant.design/), [rc-slider](https://github.com/react-component/slider)
- **API:** [Open-Meteo API](https://open-meteo.com/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js **v18.x** or later
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/malgopesayan/dynamic-dashboard

# Navigate to the project folder
cd dynamic-dashboard

# Install dependencies
npm install

# Run the development server
npm run dev
