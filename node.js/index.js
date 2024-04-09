const express = require('express'); //Express Module Importieren 
const path = require('path');
const app = express();
const fs = require('fs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  app.get('/kontakt', function(req, res) {
    res.sendFile(path.join(__dirname, 'kontakt.html'));
  });
  app.get('/impressum', function(req, res) {
    res.sendFile(path.join(__dirname, 'impressum.html'));
  });
  const gaestebuchPath = path.join(__dirname, 'gaestebuch.json');
  var gaestebuch = JSON.parse(fs.readFileSync(gaestebuchPath, 'utf8'));
    app.get('/gaestebuch', function(req, res) {
      res.render('gaestebuch', { gaestebuch });
    });

    app.use(express.urlencoded({ extended: true }));

app.post('/gaestebuch', function(req, res) {
  const newEintrag = req.body;
console.log(newEintrag);
gaestebuch.push(newEintrag);
fs.writeFileSync(gaestebuchPath, JSON.stringify(gaestebuch));
res.redirect('/gaestebuch');})

//*NEU* Der Python bereich für die Auto ID
const { exec } = require('child_process');


const pythonScriptPath = 'auto_id.py';
const jsonFilePath = 'gaestebuch.json';

exec(`auto_id.py ${pythonScriptPath} ${jsonFilePath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Fehler beim Ausführen des Python-Skripts: ${error}`);
        return;
    }
    console.log(`Python-Skript wurde erfolgreich ausgeführt: ${stdout}`);


});


app.get('/auto_id.py', function(req, res) {
  res.sendFile(path.join(__dirname, 'auto_id.py'));
});

app.get('/gaestebuch.json', function(req, res) {
  res.sendFile(path.join(__dirname, 'gaestebuch.json'));
});
app.post('/gaestebuch/delete/:id', function(req, res) {

  var entryId = req.params.id;
  console.log (req.params.id);
  // Filter out the entry with the given id
  const newgaestebuch = gaestebuch.filter(entry => {
    console.log(`Comparing entry.id (${entry.id}) with entryId (${entryId})`);
    return +entry.id !== +entryId;
  });
  console.log (newgaestebuch)
  // Write the updated entries back to the file
  fs.writeFileSync(gaestebuchPath, JSON.stringify(newgaestebuch));
  gaestebuch = JSON.parse(fs.readFileSync(gaestebuchPath, 'utf8'));
  // Send a success response
  res.redirect('/gaestebuch');
})


  
  app.listen(2500, () => {
    console.log('Server is running on http://localhost:2500'); // Log a message when the server starts
  });



    