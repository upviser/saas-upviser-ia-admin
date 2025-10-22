"use client"
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { Navbar } from '@/components/layouts'
import { ThemeProvider } from 'next-themes'
import { LeftMenu } from '@/components/ui'
import localFont from 'next/font/local'
import Script from 'next/script'

const myFont = localFont({
  src: './fonts/RedHatDisplay-VariableFont_wght.ttf',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={myFont.className}>
      <head>
        <title>Panel administrativo</title>
        <link rel="icon" href='https://upviser-website.b-cdn.net/Favicon.png' />
      </head>
      <body>
        <div id="fb-root" />
        <Script
          id="facebook-sdk"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.fbAsyncInit = function() {
                FB.init({
                  appId      : '${process.env.NEXT_PUBLIC_FB_APP_ID}',
                  cookie     : true,
                  xfbml      : true,
                  version    : 'v20.0'
                });
                console.log('✅ FB.init ejecutado');
              };
              (function(d, s, id) {
                if (d.getElementById(id)) return;
                var js = d.createElement(s);
                js.id = id;
                js.src = 'https://connect.facebook.net/en_US/sdk.js';
                js.async = true;
                js.defer = true;
                d.head.appendChild(js);
              })(document, 'script', 'facebook-jssdk');
            `,
          }}
        />
        <Script
            id="facebook-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        <SessionProvider>
          <ThemeProvider attribute='class'>
            <Navbar>
              <LeftMenu>
                {children}
              </LeftMenu>
            </Navbar>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
