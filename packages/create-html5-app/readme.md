<br/> 
<br/> 

<p align="center"><img width="100" src="https://andremalveira.github.io/create-html5-app/examples/HTML5/src/assets/img/html.icon.svg"></p>

# <p align="center">Create HTML5 App</p>


<p align="center">
<a href="#details">
<img src="https://img.shields.io/badge/License-MIT-E44D26?" alt="License-MIT"/>&nbsp;&nbsp;
<img src="https://img.shields.io/badge/npm-v1.1.2-E44D26?" alt="NPM Version"/></a>

</p>
<p align="center">Create a new simple project in HTML5 with one command.</p>

<br/> 

### Versions:

- v1.0.0 - [Realese]: Create simple HTML5 structure <br/>
- v1.1.0 - [Feature]: Added cli options and second html5 example 


<br/> 

### Global Install 
```
npm i -g create-html5-app
```
```
create-html5-app name
```
```
cd name
```
OR:

### Using npx

```
npx create-html5-app name
```
```
cd name
```

> ⚠️ There is no command to start the project as it is a simple example in html5.

<br/> 


### Commands  

| Command  | Alias  | Description           |
| ------------------ | ------ | --------------------- |
| create-html5-app   | cha    | main command          |

### Options  

| Options  | Alias  | Description           |
| ------------------ | ------ | --------------------- |
| --example name | --e  | create app based on an [example](https://github.com/andremalveira/create-html5-app/tree/main/examples)  |
| --page name   | --p    | create new page in html  |
| --git              | --g    | Initialize git|

<br/> 

#### How to use (command example):

```js
// Creating a app
create-html5-app app-name

// Criating a app with example
create-html5-app app-name --example with-scss

// Creating a html page
create-html5-app --page about 
// or --page pages/about


// [create-html5-app] has an alias called [cha], you can use it like this:
// cha app-name
```

> use npx before create-html5-app if you haven't installed the cli globally

<br/> 



### License

Create HTML5 App is licensed under the [MIT License](https://github.com/andremalveira/create-html5-app/blob/main/packages/create-html5-app/LICENSE).
