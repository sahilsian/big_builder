import express from 'express';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 4000;

const client = new DynamoDBClient({
  region: process.env.AWS_REGION, 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const ddbDocClient = DynamoDBDocumentClient.from(client);

app.use(cors());
app.use(bodyParser.json());

app.post('/template', async (req, res) => {
  const { components } = req.body;

  if (!components || !Array.isArray(components)) {
    return res.status(400).json({ message: 'Invalid input: components should be an array' });
  }

  const newItem = {
    id: uuidv4(),  
    components,   
    createdAt: new Date().toISOString(),  
  };

  const command = new PutCommand({
    TableName: 'Templates', 
    Item: newItem,         
  });

  try {
    await ddbDocClient.send(command); 
    res.status(201).json(newItem);   
  } catch (error) {
    console.error('Error saving template:', error);
    res.status(500).json({ message: 'Error saving template', error });
  }
});

app.get('/templates', async (req, res) => {
  const command = new ScanCommand({
    TableName: 'Templates', 
  });

  try {
    const data = await ddbDocClient.send(command);  
    if (data.Items && data.Items.length > 0) {
      res.json(data.Items);  
    } else {
      res.status(404).json({ message: 'No templates found' });
    }
  } catch (error) {
    console.error('Error retrieving templates:', error);
    res.status(500).json({ message: 'Error retrieving templates', error });
  }
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
