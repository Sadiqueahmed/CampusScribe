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
                    500: '#D74F4F', // Primary Red
                    600: '#c53939',
                    700: '#aa2c2c',
                    800: '#8d2626',
                    900: '#752525',
                    950: '#3f0f0f',
                },
                navy: {
                    50: '#f0f2f5',
                    100: '#d9dde6',
                    200: '#bfc5d3',
                    300: '#9ba3bf',
                    400: '#7d83a8',
                    500: '#5f6491',
                    600: '#4a5078',
                    700: '#3a3d5f',
                    800: '#0A1128', // Primary Navy
                    900: '#080b1f',
                    950: '#030410',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        }
    },
    plugins: [],
}
