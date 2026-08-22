
const fs = require('fs')
const cmp = require('compress-json')

const someFile = '../../all-repeaters-tmp.json';

const pathFile = '../../public/api/v2/test/huge.json'



fs.readFile(someFile, 'utf8', function (err, read) {
  if (err) {
    return console.log(err);
  }

  let compress = {}
  all = JSON.parse(read);

  all.forEach(rep => {
    compress[rep.i] = rep
  });
  //console.log(compress)

  compress = cmp.compress(compress)
  compress = JSON.stringify(compress);

  fs.writeFile(pathFile, compress, 'utf8', function (err) {
    if (err) return console.log(err);
  });
  console.log(pathFile, 'done')
});
