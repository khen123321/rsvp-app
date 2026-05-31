// api/login.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  // We pull the real password from your secure Vercel environment variables
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD; 

  if (!adminPassword) {
    console.error("CRITICAL ERROR: ADMIN_PASSWORD is missing from Vercel!");
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  // Check if what the user typed matches your secure environment variables
  if (username === adminUsername && password === adminPassword) {
    // In a full production app, you would generate a JWT token here.
    // For a simple RSVP admin portal, returning a success flag is a good start.
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false, error: 'Invalid username or password' });
  }
}