/**
 * ThemeService — single source of truth for the active color theme.
 *
 * How it works:
 *  - Theme variables are written into a dedicated <style> tag that lives in
 *    the *document* (light DOM), so they are defined on :root.
 *  - CSS custom properties inherit into Shadow DOM naturally, so every
 *    component that consumes var(--primary) etc. will pick up the change
 *    without any Shadow-DOM piercing tricks.
 */

export type Theme = 'zinc' | 'rose' | 'blue' | 'green' | 'orange' | 'violet';

const THEMES: Record<Theme, string> = {
    zinc: `
    --primary-h: 240; --primary-s: 5.9%; --primary-l: 10%;
    --primary-foreground: 0 0% 98%;
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  `,
    rose: `
    --primary-h: 346.8; --primary-s: 77.2%; --primary-l: 49.8%;
    --primary-foreground: 355 100% 97%;
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 346.8 77.2% 49.8%;
    --radius: 0.5rem;
  `,
    blue: `
    --primary-h: 221.2; --primary-s: 83.2%; --primary-l: 53.3%;
    --primary-foreground: 210 40% 98%;
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  `,
    green: `
    --primary-h: 142.1; --primary-s: 76.2%; --primary-l: 36.3%;
    --primary-foreground: 355 100% 97%;
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 142.1 76.2% 36.3%;
    --radius: 0.5rem;
  `,
    orange: `
    --primary-h: 24.6; --primary-s: 95%; --primary-l: 53.1%;
    --primary-foreground: 60 9.1% 97.8%;
    --background: 0 0% 100%;
    --foreground: 20 14.3% 4.1%;
    --muted: 60 4.8% 95.9%;
    --muted-foreground: 25 5.3% 44.7%;
    --accent: 60 4.8% 95.9%;
    --accent-foreground: 24 9.8% 10%;
    --border: 20 5.9% 90%;
    --input: 20 5.9% 90%;
    --ring: 24.6 95% 53.1%;
    --radius: 0.5rem;
  `,
    violet: `
    --primary-h: 262.1; --primary-s: 83.3%; --primary-l: 57.8%;
    --primary-foreground: 210 20% 98%;
    --background: 0 0% 100%;
    --foreground: 224 71.4% 4.1%;
    --muted: 220 14.3% 95.9%;
    --muted-foreground: 220 8.9% 46.1%;
    --accent: 220 14.3% 95.9%;
    --accent-foreground: 220 20% 14.9%;
    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 262.1 83.3% 57.8%;
    --radius: 0.5rem;
  `,
};

const STYLE_TAG_ID = 'ui-theme-vars';

/** Apply a theme by writing CSS variables into :root via a <style> tag. */
export function applyTheme(theme: Theme): void {
    let tag = document.getElementById(STYLE_TAG_ID) as HTMLStyleElement | null;
    if (!tag) {
        tag = document.createElement('style');
        tag.id = STYLE_TAG_ID;
        document.head.appendChild(tag);
    }

    const vars = THEMES[theme] ?? THEMES.zinc;

    // Compute derived shim variables
    tag.textContent = `:root {
    ${vars}
    --primary: var(--primary-h) var(--primary-s) var(--primary-l);
    --color-primary: hsl(var(--primary));
    --color-primary-contrast: hsl(var(--primary-foreground));
    --color-ink: hsl(var(--foreground));
    --color-muted: hsl(var(--muted));
    --color-header: hsl(var(--background));
    --color-border: hsl(var(--border));
    --color-page-bg: hsl(var(--background));
    --color-page-text: hsl(var(--foreground));
    --radius-md: var(--radius);
    --shadow-primary: 0 1px 3px 0 rgb(0 0 0 / 0.1);
    --focus-ring: hsl(var(--ring) / 0.2);
  }`;
}

export function getCurrentTheme(): Theme {
    const tag = document.getElementById(STYLE_TAG_ID) as HTMLStyleElement | null;
    if (!tag) return 'zinc';
    // Parse the active theme by checking which h value is set
    const text = tag.textContent ?? '';
    for (const [name] of Object.entries(THEMES)) {
        if (name !== 'zinc' && text.includes(`--primary-h: ${parseHue(name as Theme)}`)) {
            return name as Theme;
        }
    }
    return 'zinc';
}

function parseHue(theme: Theme): string {
    const match = THEMES[theme].match(/--primary-h:\s*([\d.]+)/);
    return match ? match[1] : '240';
}

export const THEME_LIST: { value: Theme; label: string }[] = [
    { value: 'zinc', label: 'Zinc' },
    { value: 'rose', label: 'Rose' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'orange', label: 'Orange' },
    { value: 'violet', label: 'Violet' },
];
