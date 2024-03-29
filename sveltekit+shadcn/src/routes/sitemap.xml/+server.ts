export async function GET() {	
  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      <url>
        <loc>https://my-brand.com</loc>
        <image:image>
          <image:loc>https://my-brand.com/images/logo.png</image:loc>
        </image:image>
        <xhtml:link
                 rel="alternate"
                 href="https://my-brand.com"/>
        <changefreq>daily</changefreq>
        <priority>1</priority>
      </url>
    </urlset>`.trim(),
    {			
      headers: {
        'Content-Type': 'application/xml',
      },
    },
);}
