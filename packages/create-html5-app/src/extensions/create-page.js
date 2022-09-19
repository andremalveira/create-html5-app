/* eslint-disable prettier/prettier */
module.exports = async (toolbox) => {
  const { print, filesystem, template } = toolbox

  toolbox.create_page = async (options) => {
    let compete_path = options.page_name.replace(/\/+$/, '')
    let path_arr     = compete_path.split('/')
    let pathNoExt    = path_arr
    let dir_length   = path_arr.length
    let page_name    = pathNoExt.pop()
    let hasHtml      = page_name.includes('.html')
    
    if (!options.page_name) {
      print.error(`Page name must be specified!`)
      return
    }

    let page_name_exists = await toolbox.exists(`${compete_path}${!hasHtml ? '/index.html' : ''}`)
    if (page_name_exists.dir_exists || page_name_exists.file_exists) {
      print.error(`An page with that name already exists!`)
      return
    }

    if(hasHtml) {
      page_name = page_name.split('.')[0]
      pathNoExt = pathNoExt.join('/')
    } else {
      pathNoExt = options.page_name
    }
    console.log(hasHtml, pathNoExt, page_name)

    let path = ''
    for (let i = 0; i < dir_length; i++) {
      path += '../'
    }



    await template.generate({
      template: 'html5.ejs',
      target: `${pathNoExt}/${hasHtml ? page_name : 'index'}.html`,
      props: { name: firstLetterUppercase(page_name), path },
    })

    print.success(`Page "${options.page_name}" created with success!`)
  }

  function firstLetterUppercase(arr) {
    return arr.charAt(0).toUpperCase() + arr.slice(1)
  }
}
