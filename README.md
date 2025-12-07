# ShiftArmor Landing Page

A modern, responsive landing page for ShiftArmor - Enterprise Workforce Management Platform.

## Quick Start

Simply open `index.html` in a browser. No build tools required.

```bash
# From the project root
start landing-page/index.html
```

Or use a local server:
```bash
# Python
python -m http.server 8000 --directory landing-page

# Node.js (if http-server is installed)
npx http-server landing-page
```

Then visit `http://localhost:8000`

## Files

- `index.html` - Main HTML structure
- `styles.css` - All styles (no preprocessor needed)
- `script.js` - Interactivity (smooth scroll, form handling, animations)

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --gold: #CB954A;        /* Brand accent */
    --bg-dark: #0a0a0a;     /* Main background */
    --bg-card: #111111;     /* Card backgrounds */
}
```

### Content
Edit directly in `index.html`:
- Hero section text
- Feature descriptions
- Pricing tiers
- Contact form fields

### Form Integration
The contact form currently logs to console. To connect to a backend:

1. **Formspree** (easiest):
   ```html
   <form action="https://formspree.io/f/YOUR_ID" method="POST">
   ```

2. **Custom API**:
   Edit the fetch call in `script.js`:
   ```javascript
   fetch('/api/contact', {
       method: 'POST',
       body: JSON.stringify(data)
   });
   ```

## Deployment Options

### Squarespace
1. Create a blank page
2. Add a "Code" block
3. Paste the HTML (inline the CSS and JS)

### Netlify/Vercel
1. Drag & drop the `landing-page` folder
2. Done!

### AWS S3 + CloudFront
1. Upload files to S3 bucket
2. Enable static website hosting
3. Add CloudFront distribution

## Browser Support
- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Mobile responsive (tested on iOS/Android)

## Credits
- Font: Inter (Google Fonts)
- Icons: Inline SVG
- Built for AIIT Secure / ShiftArmor
