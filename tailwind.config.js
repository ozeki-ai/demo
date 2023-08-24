const twc = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,vue}"
  ],
  theme: {
    colors: chooseColors(twc),
    screens: { // https://www.freecodecamp.org/news/the-100-correct-way-to-do-css-breakpoints-88d6a5ba1862/
      'sm':  '450px',
      'md':  '600px',
      'lg':  '850px',
      'xl':  '1200px',
      '2xl': '1800px'
    },
    extend: {
      spacing: {
        '112': '28rem',
        '128': '32rem'
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")
  ]
}

//-------------------------------------------------------------------------------------------------

function chooseColors() {
  const primary = {...twc.stone} // NOTE: have to clone colors structs so they can be modified (in order to override DEFAULT below)
  const blue    = {...twc.blue}  // (ditto)
  const gray    = {...twc.slate} // (ditto)
  const red     = {...twc.red}   // (ditto)
  const green   = {...twc.green} // (ditto)
  const yellow  = {...twc.yellow} // (ditto)

  const colors = {
    transparent: 'transparent',
    inherit:     'inherit',
    current:     'currentColor',
    black:       '#000000',
    white:       '#FFFFFF',
    light:       '#FFFFFF',
    dark:        gray['800'],
    gray:        gray,
    red:         red,
    green:       green,
    blue:        blue,
    yellow:      yellow,
    primary:     primary,
    link: {
      DEFAULT: blue['600'],
      hover:   blue['800'],
    },
    success:     green,
    warning:     yellow,
    danger:      red,
  }

  colors.gray.DEFAULT    = colors.gray['500'];
  colors.primary.DEFAULT = colors.primary['600'];
  colors.success.DEFAULT = colors.success['600'];
  colors.warning.DEFAULT = colors.warning['300'];
  colors.danger.DEFAULT  = colors.danger['600'];

  return colors
}

//-------------------------------------------------------------------------------------------------
