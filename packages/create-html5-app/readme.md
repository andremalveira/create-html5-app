
<p align="center"><img width="100" src="https://andremalveira.github.io/create-html5-app/examples/HTML5/src/assets/img/html.icon.svg"></p>

# <p align="center">create-html5-app</p>


<p align="center">
<a href="#details">
<img src="https://img.shields.io/badge/License-MIT-319046?" alt="License-MIT"/>&nbsp;&nbsp;
<img src="https://img.shields.io/badge/npm-v1.0.0-319046?" alt="NPM Version"/></a>

</p>
<p align="center">Create a new simple project in HTML5 with one command.</p>

<br/> 

### Global Install 
```
npm i -g create-html5-app
```
```
create-html5-app app-name
```
```
cd app-name
```
OR:

### Using npx

```
npx create-html5-app app-name
```

```
cd app-name
```

<br/> 


### Commands  

| Command  | Alias  | Description           |
| ------------------ | ------ | --------------------- |
| create-html5-app   | cha    | main command          |

| Options  | Alias  | Description           |
| ------------------ | ------ | --------------------- |
| --example example-name | --e  | create app based on an example  |
| --page page-name   | --p    | create new page in html  |

<br/> 

#### How to use (command example):

```css
create-html5-app app-name --example with-scss

create-html5-app --page about 
//or --page pages/about
```

> use npx before create-html5-app if you haven't installed the cli globally

<br/> 

### Folder Structure
```bash
app-name
├──📂src
│   └──📂assets 
│       └──📁img 
│   └──📂css 
│       └──📄app.css  
│   └──📂js    
│       └──📄app.js         
├──📄index.html
├──📄README.md 
```

### License

create-html5-app is licensed under the MIT License.

