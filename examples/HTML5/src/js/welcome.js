
const welcome = () => {
  if(document.body) {
    document.body.insertAdjacentHTML('afterbegin', `
    <div id="_welcome">
      <div class="wrapper">
        <img src="src/assets/img/html.icon.svg" alt="">
        <h2>Welcome to HTML5 app</h2>
        <p>⭐ Leave your star at <a href="https://github.com/andremalveira/create-html5-app" target="_blank">Github</a> ⭐</p>
      </div>
    </div>
    `)
  }
}

export default welcome