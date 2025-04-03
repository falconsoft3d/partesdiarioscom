// src/theme/colorTheme.ts
export const colors = {
    primary: {
      default: "#502C48",
      foreground: "#FFFFFF",
      dark: "#3A1F35",
      light: "#6A3F5C"
    },
    secondary: {
      default: "#662F65",
      foreground: "#FFFFFF",
      dark: "#4C224B",
      light: "#80437E"
    },
    success: {
      default: "#38866C",
      foreground: "#FFFFFF"
    },
    destructive: {
      default: "#E22E22",
      foreground: "#FFFFFF"
    },
    background: "#FFFFFF",
    foreground: "#000000",
    card: {
      default: "#FFFFFF",
      foreground: "#000000"
    },
    popover: {
      default: "#FFFFFF",
      foreground: "#000000"
    },
    muted: {
      default: "#F3F4F6",
      foreground: "#6B7280"
    },
    accent: {
      default: "#662F65",
      foreground: "#FFFFFF"
    },
    border: "#E5E7EB",
    input: "#FFFFFF",
    ring: "#502C48",
    chart: {
      1: "#502C48",
      2: "#662F65",
      3: "#38866C",
      4: "#E22E22",
      5: "#6A3F5C"
    }
  } as const;
  
  export type AppColors = typeof colors;