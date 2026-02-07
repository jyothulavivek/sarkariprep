const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const examCategories = [
  {
    id: 'upsc',
    name: 'UPSC',
    fullName: 'Union Public Service Commission',
    icon: 'Building',
    exams: [
      { name: 'Civil Services (IAS)', posts: '1,011', lastDate: '2025-02-21', eligibility: 'Graduate' },
      { name: 'IFS (Forest Service)', posts: '150', lastDate: '2025-02-21', eligibility: 'Graduate' }
    ]
  },
  {
    id: 'ssc',
    name: 'SSC',
    fullName: 'Staff Selection Commission',
    icon: 'Clipboard',
    exams: [
      { name: 'CGL', posts: '37,409', lastDate: '2025-01-31', eligibility: 'Graduate' },
      { name: 'CHSL', posts: '3,712', lastDate: '2025-02-11', eligibility: '12th' }
    ]
  }
];

app.get('/', (req, res) => {
  res.json({ 
    message: 'SarkariPrep Backend is Running!', 
    status: 'active',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/exams', (req, res) => {
  res.json({ 
    success: true, 
    count: examCategories.length, 
    data: examCategories 
  });
});

app.get('/api/exams/:id', (req, res) => {
  const category = examCategories.find(c => c.id === req.params.id);
  if (!category) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }
  res.json({ success: true, data: category });
});

app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});