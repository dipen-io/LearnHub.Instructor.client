import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeSwitcher() {
    const {theme, setTheme, themes} = useTheme();

    return (
        <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as typeof theme)}
            className="border px-3 py-2 rounded text-white font-semibold cursor-pointer hover:bg-slate-200 hover:text-black"
            > {
                themes.map((t) => (
                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))
            }
        </select>
    )
}
