# Coldr Design System & UI Specification

## 1. Visual Identity
**Theme**: Futuristic, Dark Mode, Glassmorphism, Minimalist.
**Core Concept**: "Coldr" implies cool, sleek, and sharp. The UI should feel like a premium tool for professionals.

### Color Palette
| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Void Black** | `#0F172A` | Main background (deep blue-black) |
| **Deep Space** | `#1E293B` | Secondary background / Card base |
| **Glass White** | `rgba(255, 255, 255, 0.05)` | Glass panels background |
| **Border White** | `rgba(255, 255, 255, 0.1)` | Glass borders |
| **Neon Cyan** | `#06B6D4` | Primary actions, glows, active states |
| **Electric Purple**| `#8B5CF6` | Gradients, secondary accents |
| **Text Primary** | `#F8FAFC` | Headings, main text |
| **Text Secondary** | `#94A3B8` | Subtitles, placeholders |
| **Error Red** | `#EF4444` | Error states |
| **Success Green** | `#10B981` | Success messages |

### Typography
*   **Font Family**: `Inter` or `Outfit` (Google Fonts).
*   **Headings**: Bold, tight tracking.
*   **Body**: Regular, readable line height (1.6).

### Effects
*   **Glassmorphism**:
    ```css
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    ```
*   **Neon Glow**:
    ```css
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
    ```

---

## 2. Screen Specifications

### A. Login Screen
*   **Background**: Animated gradient mesh (Deep Space to Void Black).
*   **Center Card**:
    *   Glassmorphism container.
    *   **Logo**: Large, glowing "Coldr" text at top.
    *   **Action**: "Sign in with Google" button.
        *   Style: White pill-shaped button with Google icon, subtle shadow.
        *   Hover: Slight lift and glow.
*   **Footer**: Copyright text in `Text Secondary`.

### B. Step 1: Profile & Resume Setup
*   **Layout**: Two-column grid (responsive to single column on mobile).
*   **Left Column (Resume)**:
    *   **Upload Area**: Large dashed-border zone.
    *   **State**:
        *   *Empty*: "Drop your resume here" icon + text.
        *   *Uploaded*: PDF icon, filename, and a "Change" button.
*   **Right Column (Profile)**:
    *   **Form Container**: Glass panel.
    *   **Inputs**: Transparent background, bottom border only (or full pill shape), white text.
    *   **Labels**: Floating or small uppercase above input.
    *   **Button**: "Continue" -> Gradient background (Cyan to Purple).

### C. Step 2: Application Dashboard
*   **Header**:
    *   Logo (Left).
    *   **Profile/Resume Selectors**: Pill-shaped dropdowns in the center/right.
    *   **User Avatar**: Top right.
*   **Main Grid**:
    *   **Input Panel (Left)**:
        *   Fields: Recipient Name, Company, Role.
        *   **Job Description**: Large text area with "code editor" feel (monospaced font option, dark bg).
        *   **Instructions**: Collapsible or smaller text area.
        *   **Generate Button**: Full width, prominent, animated gradient border.
    *   **Preview Panel (Right)**:
        *   **Title**: "Generated Email".
        *   **Content**: Rich text editor look.
        *   **Actions**: "Copy", "Regenerate", "Send Application" (Floating Action Button style).

---

## 3. Component Library Ideas

*   **`GlassCard`**: Reusable wrapper with blur and border.
*   **`NeonButton`**: Primary call-to-action.
*   **`GhostInput`**: Minimalist input fields.
*   **`GradientText`**: For headers (e.g., "Coldr").
*   **`StatusBadge`**: Small pills for "Uploaded", "Sending", etc.
