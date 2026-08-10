import { Cormorant_Garamond, Outfit } from 'next/font/google'

const outfit = Outfit({
  weight: ['200', '300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  adjustFontFallback: false,
})

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  adjustFontFallback: false,
})

import "./globals.css";

import "@styles/css/plugins/bootstrap.min.css";
import "@styles/css/plugins/swiper.min.css";
import "@styles/css/plugins/font-awesome.min.css";
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

import '@styles/scss/style.scss';

import AppData from "@data/app.json";
import Providers from "@components/Providers";

export const metadata = {
  title: {
		default: AppData.settings.siteName,
		template: "%s | " + AppData.settings.siteName,
	},
  description: AppData.settings.siteDescription,
}

const Layouts = ({
  children
}) => {
  return (
    <html lang="ar" dir="rtl" className={`${outfit.variable} ${cormorant.variable}`}>
      <body style={{"backgroundImage": "url("+AppData.settings.bgImage+")"}}>
        <div className="tst-main-overlay"></div>
        
        {/* app wrapper */}
        <div id="tst-app" className="tst-app">
          <Providers>{children}</Providers>
        </div>
        {/* app wrapper end */}
      </body>
    </html>
  );
};
export default Layouts;
