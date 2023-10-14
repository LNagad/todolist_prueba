/** @type {import('tailwindcss').Config} */
import formsPlugin from "@tailwindcss/forms";

export default {
   content: ["./src/**/*.{html,js,ts,tsx}"],
   theme: {
      extend: {},
   },
   plugins: [formsPlugin],
}

