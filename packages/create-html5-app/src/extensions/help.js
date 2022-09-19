/* eslint-disable prettier/prettier */
var Table = require('cli-table3');

module.exports = async (toolbox) => {
  toolbox.help = () => {
    const print = toolbox.print
    const table = new Table({ 
      head: ["Command / Options", "Alias", "Description"], 
      style: {
        head: ['green']
      }
    });

    print.highlight(`   `)
    print.highlight(`   `)
    print.highlight(` HELP COMMANDS TO CREATE-HTML5-APP`)
    print.highlight(`   `)

    
    table.push(
      ['create-html5-app', 'cha', 'main command'],
      ['', '', ''],
      ['--example example-name', '-e', 'create app based on an example'],
      ['--page page-name', '-p', 'create new page in html'],
      ['--git', '-g', 'Initialize git'],
    );
    print.muted(table.toString());
  
    print.highlight(`   `)
    print.highlight(`How to use (command example):`)
    print.highlight(`   `)
    print.muted(`create-html5-app app-name --example with-scss`)
    print.highlight(`   `)
    print.muted(`create-html5-app --page about`)
    print.highlight(`   `)
    
    print.warning(`use npx before create-html5-app if you haven't installed the cli globally`)

    print.highlight(`   `)
    print.highlight(`   `)
    print.highlight('Examples: https://github.com/andremalveira/create-html5-app/tree/main/examples')
    print.highlight(`   `)
  }
}
