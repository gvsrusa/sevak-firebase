# Template Integration Guide: `mvllow/next-pwa-template` for Sevak Project

## 1. Introduction

This document provides a guide for integrating the `mvllow/next-pwa-template` into the Sevak project. The template was selected based on its strong alignment with the project's PWA requirements and technical stack (Next.js, Tailwind CSS, TypeScript), as detailed in the [`docs/research/github_template_research_report.md`](docs/research/github_template_research_report.md).

## 2. Template Overview

*   **Source Repository URL:** [https://github.com/mvllow/next-pwa-template](https://github.com/mvllow/next-pwa-template)
*   **Description:** A "fluffless" Next.js progressive web app template using `next-pwa`, Tailwind CSS, and TypeScript.
*   **Key Features Utilized:**
    *   PWA setup via `next-pwa`.
    *   Next.js (v14.1.1 in template, Sevak project should align or update).
    *   Tailwind CSS for styling.
    *   TypeScript for type safety.
    *   `next-themes` for light/dark mode.
    *   Standard Pages Router structure.

## 3. Original Template Structure (Key Files/Directories)

Based on GitHub file listing:
```
.
├── .editorconfig
├── .eslintrc
├── .gitignore
├── components/         // Likely for shared UI components
├── next-env.d.ts
├── next.config.js      // Contains next-pwa configuration
├── package.json
├── pages/              // Next.js Pages Router (e.g., _app.tsx, index.tsx, _document.tsx)
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx       // Example page
├── pnpm-lock.yaml
├── postcss.config.js
├── public/
│   ├── images/         // Placeholder icons
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   ├── icon-maskable-192.png
│   │   └── icon-maskable-512.png
│   └── manifest.json   // PWA manifest
├── readme.md
├── styles/             // Global styles (e.g., globals.css for Tailwind)
│   └── globals.css
├── tailwind.config.js
└── tsconfig.json
```

## 4. Alignment with Sevak Project Requirements

*   **PWA Capabilities:** Directly meets requirements through `next-pwa` and pre-configured manifest/service worker setup.
*   **Offline Support:** Provided by `next-pwa`.
*   **Tech Stack:** Matches Next.js, Tailwind CSS, TypeScript.
*   **UI Foundation:** Provides a basic structure with Tailwind CSS and `next-themes`. Sevak-specific UI components for dashboard, map, and controls will need to be built on top.
*   **Minimal Boilerplate:** The "fluffless" nature means less code to remove or refactor.

## 5. Integration Steps & Required Modifications

The template files should be copied into a new subdirectory within the Sevak project, for example, `sevak-pwa-app/` or `mobile-app/`, to keep it distinct from the potential ROS/tractor control software.

### 5.1. Initial Setup:

1.  **Copy Template Files:**
    *   Manually download or clone the `mvllow/next-pwa-template` repository.
    *   Copy the entire content (or relevant parts like `pages`, `components`, `public`, `styles`, and config files) into the chosen subdirectory (e.g., `sevak-pwa-app/`) within the main Sevak project.
    *   **Files to copy:** `.editorconfig`, `.eslintrc`, `.gitignore` (merge with existing if applicable), `components/`, `next-env.d.ts`, `next.config.js`, `package.json`, `pages/`, `pnpm-lock.yaml` (if using pnpm, otherwise adapt to npm/yarn), `postcss.config.js`, `public/`, `styles/`, `tailwind.config.js`, `tsconfig.json`.
2.  **Install Dependencies:**
    *   Navigate to the new subdirectory (`cd sevak-pwa-app`).
    *   Run `pnpm install` (or `npm install` / `yarn install` if adapting the lockfile).
3.  **Update `package.json`:**
    *   Change the `name` field (e.g., to `"sevak-pwa-companion"`).
    *   Update `version`, `description`, `author` as needed.
    *   Review and potentially update Next.js and other dependencies to match versions used elsewhere in the Sevak project if strict alignment is required, or proceed with template versions.
4.  **Update PWA Manifest (`public/manifest.json`):**
    *   Change `name`, `short_name`, `description` to reflect the Sevak application.
    *   Replace placeholder icons in `public/images/` with Sevak-specific icons and update paths in `manifest.json`.
    *   Adjust `theme_color`, `background_color`, `start_url`, `orientation`, `display`, `scope` as per Sevak app design.
5.  **Update `tailwind.config.js`:**
    *   Ensure the `content` paths correctly point to files within the `sevak-pwa-app` structure (e.g., `./pages/**/*.{js,ts,jsx,tsx}`, `./components/**/*.{js,ts,jsx,tsx}`).
    *   Integrate any existing Tailwind configurations/themes from the main Sevak project if applicable.

### 5.2. Routing (Pages Router vs. App Router):

*   **Template uses Pages Router:** The `mvllow/next-pwa-template` uses the Next.js Pages Router (files in the `pages` directory).
*   **Current Sevak Project Structure:** The provided file list for the Sevak project shows an `src/app/` directory, which implies the use of the Next.js App Router for its existing web content.
*   **Decision Point:**
    1.  **Option A (Recommended for simplicity of PWA app):** Develop the PWA companion app using the Pages Router as provided by the template. This keeps the PWA self-contained and leverages the template's structure directly. The PWA would be a distinct application, potentially served from a sub-path or different domain if the main Sevak project website exists.
    2.  **Option B (More complex integration):** Adapt the PWA setup from the template to work with the App Router if the goal is a single, unified Next.js application. This would involve restructuring how `next-pwa` is configured and how service workers/manifests are handled within the App Router paradigm. This is more complex and might negate some benefits of using this specific template.
*   **This guide assumes Option A for initial integration.** If Option B is chosen, further research into `next-pwa` with App Router will be needed.

### 5.3. UI Development:

*   **Layout:** Modify `pages/_app.tsx` and `pages/_document.tsx` to establish the overall layout for the Sevak PWA (e.g., navigation, header, footer).
*   **Dashboard Pages:** Create new pages within the `pages` directory for different sections of the dashboard (e.g., `pages/dashboard/overview.tsx`, `pages/map-view.tsx`, `pages/task-management.tsx`, `pages/sevak-status.tsx`, `pages/manual-control.tsx`, `pages/settings.tsx`, `pages/logs.tsx`).
*   **Components:**
    *   Develop Sevak-specific UI components (buttons, cards, status indicators, map interface components, virtual joystick) within the `components` directory.
    *   Leverage Tailwind CSS for styling these components.
    *   The existing Sevak project has `src/components/ui/` and `src/components/layout/`. These might be adaptable or provide a style guide, but ensure paths are correct if used within the PWA app's subdirectory.
*   **Theming:** Utilize `next-themes` (already in the template) to implement light/dark mode as per Sevak's design requirements.

### 5.4. Feature Implementation (as per PRDMasterPlan.md):

*   **Map Integration:**
    *   Choose a mapping library (e.g., Leaflet, Mapbox GL JS, Google Maps SDK - consider free/open-source options first like Leaflet).
    *   Integrate the chosen library into a dedicated map component and map view page.
    *   Implement polygon drawing for cutting areas, pin-dropping for drop-off/home locations.
*   **Real-time Data Display:**
    *   Establish communication with the Sevak tractor (details TBD - likely WebSocket or similar for local network).
    *   Update UI elements (status text, battery level, location on map) based on data received from the tractor.
*   **Task Management:**
    *   Implement logic for creating, starting, stopping, and monitoring tasks.
    *   Store task definitions locally (e.g., using `localStorage` or IndexedDB for PWA offline storage).
*   **Manual Control:**
    *   Implement virtual joystick UI.
    *   Send control commands to the tractor.
*   **Notifications:**
    *   Utilize browser Notification API for PWA notifications (task completion, errors, low battery).
*   **Offline Functionality:**
    *   Ensure `next-pwa` correctly caches application shell and necessary static assets.
    *   Implement offline storage for task definitions and potentially last known status/logs.
    *   Design UI to gracefully handle offline status.

### 5.5. API/Backend Communication:

*   The template is frontend-focused. Communication logic with the Sevak tractor's API/backend (if it has one beyond direct local network communication) will need to be implemented.
*   Define API endpoints and data structures for app-tractor communication.

### 5.6. Testing:

*   Implement unit and integration tests for components and PWA functionality.
*   Conduct thorough testing of PWA features (installability, offline mode, notifications) on target devices.

## 6. Deviations from Ideal Structure / Required Alterations Summary

*   **Routing:** Template uses Pages Router. If Sevak project standardizes on App Router for all web frontends, this is a significant deviation requiring adaptation. (Recommendation: Keep PWA as Pages Router initially).
*   **UI Components:** Template is "fluffless." All Sevak-specific dashboard UI, map components, and control elements need to be custom-built.
*   **State Management:** Template does not prescribe a state management library. For complex state (e.g., tractor status, task lists, map data), a solution like Zustand, Jotai, or React Context might be needed.
*   **Specific Sevak Logic:** All application logic related to tractor communication, task execution flow, and specific feature requirements from [`PRDMasterPlan.md`](../../PRDMasterPlan.md) must be implemented.
*   **Iconography and Branding:** Replace all placeholder icons and branding with Sevak assets.

## 7. Conclusion

The `mvllow/next-pwa-template` provides a strong starting point for the Sevak PWA companion app, particularly for its PWA setup and core tech stack. The primary work will involve building the Sevak-specific UI, features, and communication logic on top of this foundation, and carefully considering the routing strategy.