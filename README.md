# The Mirror Test

A pattern recognition questionnaire. A mirror, not a diagnosis.

## Quick Start

### Option 1: Deploy to Vercel (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click "New Project"
3. Import this folder (upload or connect to GitHub)
4. Click "Deploy"
5. Your app will be live at `your-project.vercel.app`

### Option 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. Drag and drop the `dist` folder (after building) to deploy
3. Or connect your GitHub repo for automatic deploys

### Option 3: Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
mirror-test/
├── index.html          # Entry HTML
├── package.json        # Dependencies
├── vite.config.js      # Build config
└── src/
    ├── main.jsx        # React entry point
    └── App.jsx         # Complete application
```

## Features

- 18 questions with weighted scoring
- Randomized question order (except dog questions stay together, write-in always last)
- 5 result categories: Main Character, Co-Star, Liminal/Glitch, Programmed Role, NPC
- Ko-fi integration (ko-fi.com/remembr)
- Email capture for future updates
- Share functionality (category only, not score)
- Mobile-first responsive design
- No tracking, no ads

## Customization

### To change the Ko-fi link:
In `App.jsx`, search for `ko-fi.com/remembr` and replace with your URL.

### To add email backend:
In the `ResultScreen` component, the `handleEmailSubmit` function currently logs to console. 
Replace with your email service (Mailchimp, ConvertKit, etc.):

```javascript
const handleEmailSubmit = async (e) => {
  e.preventDefault();
  // Send to your email service
  await fetch('YOUR_EMAIL_SERVICE_ENDPOINT', {
    method: 'POST',
    body: JSON.stringify({ 
      email, 
      category: category.title,
      writeIn: writeInResponse 
    })
  });
  setEmailSubmitted(true);
};
```

### To store Q18 responses:
Add a serverless function (Vercel/Netlify) or use Firebase/Supabase to store:
- Timestamp
- Result category
- Q18 write-in response
- Random session ID (not tied to identity)

## Scoring

- Maximum: +72
- Minimum: -49

### Categories:
- Main Character: +45 to +72
- Co-Star: +15 to +44
- Liminal/Glitch: -5 to +14
- Programmed Role: -25 to -6
- NPC: -49 to -26

## License

This project is released without license restrictions. 
Use it, modify it, share it. A mirror belongs to no one.

---

*Resonance is the key. Remembrance is the door.*
