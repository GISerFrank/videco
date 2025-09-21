/** @type {import('tailwindcss').Config} */
export default {
    // content 数组告诉 Tailwind 需要扫描哪些文件来查找并保留使用到的CSS类
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // 扫描src目录下所有相关文件
    ],
    theme: {
        // 在这里可以扩展或覆盖 Tailwind 的默认主题，例如颜色、字体、断点等
        extend: {},
    },
    plugins: [],
}
