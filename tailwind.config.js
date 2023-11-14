import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    darkMode: 'class',

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'brand': {
                    '50': '#f2f6fc',
                    '100': '#e2ecf7',
                    '200': '#ccddf1',
                    '300': '#a9c8e7',
                    '400': '#80abda',
                    '500': '#628fcf',
                    '600': '#4e76c2',
                    '700': '#4464b1',
                    '800': '#3c5391',
                    '900': '#344774',
                    '950': '#2d395a',
                },
            }
        },
    },

    plugins: [
        forms,
        typography
    ],
};
