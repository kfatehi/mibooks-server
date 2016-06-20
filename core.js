const fs = require('fs');
const BOOKS_ROOT = __dirname+'/var';


/* Look for json rider files in BOOKS_ROOT. */
function getBookList(cb) {
  fs.readdir(BOOKS_ROOT, function(err, list) {
    if (err) return cb(err);
    var books = list.filter(function(name) {
      return name.match(/\.json$/)
    }).map(function(name) {
      var path = BOOKS_ROOT+'/'+name;
      var content = fs.readFileSync(path);
      var parsed = JSON.parse(content);
      return {
        filename: parsed.filename,
        page: parsed.page,
        scale: parsed.scale
      }
    })
    cb(null, books)
  });
}

module.exports = {
  getBookList: getBookList
}
