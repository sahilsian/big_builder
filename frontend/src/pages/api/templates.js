// pages/api/templates.js
export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        const response = await fetch('http://localhost:4000/templates');  
        const data = await response.json();
  
        if (response.ok) {
          res.status(200).json(data); 
        } else {
          res.status(response.status).json({ message: 'Failed to retrieve templates' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error fetching templates from Express API', error });
      }
    } else if (req.method === 'POST') {
      try {
       
        const response = await fetch('http://localhost:4000/template', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body), 
        });
  
        const data = await response.json();
  
        if (response.ok) {
          res.status(201).json(data); 
        } else {
          res.status(response.status).json({ message: 'Failed to create template' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error creating template in Express API', error });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  