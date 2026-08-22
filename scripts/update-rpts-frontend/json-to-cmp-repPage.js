
const fs = require('fs')
const cmp = require('compress-json')

const someFile = '../../all-repeaters-tmp.json';
const repPath = '../../public/api/v2/repeaters/'


fs.readFile(someFile, 'utf8', function (err, read) {
  if (err) {
    return console.log(err);
  }

  all = JSON.parse(read);

  all.forEach(rep => {
    const name = rep.i.replace(/\/R/g, '.R');

    //if(name === 'SR6LWS') {
    //console.log(rep.i,rep)
    let compress = cmp.compress(rep)
    compress = JSON.stringify(compress)

    fs.writeFile(`${repPath}${name}`, compress, 'utf8', function (err) {
      if (err) return console.log(err);
    });
    //}
  })

  console.log('rep Page comp done')
});

