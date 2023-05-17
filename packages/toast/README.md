::: raw
<h1 class="heading">custom-toast</h1>
:::

::: tip
default component, can be used anywhere in `old world` apps
:::

# Usage

## Import component
#### in HTML header in `structure.vm` velocity template
```html
  <script type="module" crossorigin src="/scripts/path/to/toast.js"></script>
```

## Place component
#### with or without attributes (named slot can be passed):
```html
  <custom-toast></custom-toast>
  // OR
  <custom-toast is-active toast-data toast-style>
    <span slot="additionalData">
      <h3>additional info in slot</h3>
      <p>tandar mandara broc</p>
    </span>
  </custom-toast>
```
## Reference and activate component
```js
  const toast = document.querySelector('custom-toast')
```
#### Set `is-active` attribute to `true` to show toast:
```js
  const showToast = () => {
    toast.setAttribute('is-active', 'true')
  }
```
## Listen to event `close-toast`
```js
  window.addEventListener('close-toast', toastClosed)

  const toastClosed = () => {
    toast.setAttribute('is-active', 'false')
  }
```
## Passing data to component
### With attributes
#### We can use some helper function to pass all the attributes:
```js
  const setAttributes = (el, attrs) => {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }
```
#### - *passing attributes example:*
```js
  const td = { title: 'some title',
              message: 'some message',
              type: 'info',
              position: 'center',
              decoration: false,
              colorized: false,
              backdrop: false,
              color: "#ffffff",
              font: "'Open Sans', sans-serif" }

  setAttributes(toast, td)
```

## Props

- #### ***Used for component state (show/hide):***

  ### **`isActive`**

    - Type: String
    - Default: 'false'
<br><br>
- #####   ***Used for component content:***

  ### **`toast-data`**

  - ***`title`*** (String)
  - ***`message`*** (String - *can be used html*)
  - ***`type`*** (String - *info, success, error*)
<br><br>
- #####   ***Used for component styles:***

  ### **`toast-style`**

  - ***`position`*** (String - *center, left-top, right-top, left-bottom, right-bottom*)
  - ***`decoration`*** (Boolean)
  - ***`backdrop`*** (Boolean)
  - ***`colorized`*** (Boolean)
  - ***`color`*** (String - *any color*)
  - ***`font`*** (String - *any font-family*)

#### *example*

:::code-group 
```js [passing content]
  const td = { title: 'some title',
              message: 'some message',
              type: 'info' }

  toast.setAttribute('toast-data', JSON.stringify(td))
```
```js [passing styles]
  const ts = { position: 'center',
              decoration: false,
              colorized: false,
              backdrop: false,
              color: "#ffffff",
              font: "'Open Sans', sans-serif" }

  toast.setAttribute('toast-style', JSON.stringify(ts))
```
:::
- #### ***Used for component action:***

  ### **`fixed`**

    - Type: String
    - Default: 'false'
  
  ### **`actionUrl`**

    - Type: String
    - Default: ''
  
  ### **`actionTitle`**

    - Type: String
    - Default: ''

  ### **`actionBtn`**

    - Type: String
    - Default: ''
## Deployment

- build app
- upload file **`toast.js`** from **`dist`** folder to **`Doocroot-Explorer -> scripts/path/for/app`**

<hr>

### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```
