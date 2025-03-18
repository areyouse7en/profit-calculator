import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

console.log('✅ Vite 配置文件已加载');

export default defineConfig({
	base: "",
	plugins: [react(), tailwindcss()],
});
