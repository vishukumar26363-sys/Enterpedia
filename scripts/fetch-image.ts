fetch('http://localhost:3000/api/generate-image')
  .then(res => res.text())
  .then(console.log)
  .catch(console.error);
