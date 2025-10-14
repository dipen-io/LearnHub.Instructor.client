import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeSwitcher() {
    const {theme, setTheme, themes} = useTheme();

    return (
        <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as typeof theme)}
            className="border px-2 py-1 rounded " 
            > {
                themes.map((t) => (
                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))
            }
        </select>
    )
}