/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#fdf2f2',
                    100: '#fbe5e5',
                    200: '#f7cece',
                    300: '#f1adad',
                    400: '#e88282',
                    500: '#da5353', // Primary Brand Color
                    600: '#c53939',
                    700: '#aa2c2c',
                    800: '#8d2626',
                    900: '#752525',
                    950: '#3f0f0f',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        }
    },
    plugins: [],
}
