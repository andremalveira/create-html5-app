/* eslint-disable prettier/prettier */
module.exports = async (toolbox) => {
  const { print } = toolbox

  toolbox.updatePackage = async (dir, keyProperty, value) => {

    var fs = require('fs');

    fs.readFile(dir, (err, data) => {
        if (err) throw err;
    
        var json = JSON.parse(data);
        json[keyProperty] = value;
        json = JSON.stringify(json, null, 2);
    
        fs.writeFile(dir, json, (err) => {
          if (err) throw err;
        });
    });
  }

}
