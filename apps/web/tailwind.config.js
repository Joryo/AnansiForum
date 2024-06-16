import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)"],
                mono: ["var(--font-geist-mono)"],
            },
            colors: {
                'gradient-light': 'white',
                'gradient-dark': 'black',
                'gradient-orange-dark': '#653618',
                'gradient-orange-light': '#FF9F5E',
            },
            backgroundImage: theme => ({
                'gradient-light': 'linear-gradient(to top, ' + theme('colors.gradient-light') + ', ' + theme('colors.gradient-orange-light') + ')',
                'gradient-dark': 'linear-gradient(to top, ' + theme('colors.gradient-dark') + ', ' + theme('colors.gradient-orange-dark') + ')',
            })
        },
    },
    darkMode: "class",
    plugins: [nextui({
        themes: {
            dark: {
                colors: {
                    primary: {DEFAULT: "#F27401"}
                }
            },
            light: {
                colors: {
                    primary: {DEFAULT: "#F27401"}
                }
            }
        }
    })],
}
