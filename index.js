const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'QR Code id: ',
    id,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
