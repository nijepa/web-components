::: raw
<h1 class="heading">custom-toast</h1>
:::

::: tip usage
default component, can be used anywhere in ***old world*** apps
:::

## Import component

### in HTML header in `structure.vm` velocity template

```html
  <script type="module" crossorigin src="/scripts/path/to/toast.js"></script>
```

## Place component

### with or without attributes (named slot can be passed)

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

## Reference and activate

```js
  const toast = document.querySelector('custom-toast')
```

### Set `is-active` attribute to `true` to show toast

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

## Passing data/action

```js
  const td = {} 
  // get translations with velocity function
  const messages = {
    success: "$!{messages.get('shop.ebc.messages.success')}",
    error: "$!{messages.get('shop.ebc.messages.error')}"
  }
  // get translations and action path with velocity function
  const logout = {
    url: "${link.getAction('/taxfreenoncashbenefit/logout')}",
    msg: "$!{messages.get('shop.ebc.login.logged_out')}",
    btn: "$!{messages.get('shop.ebc.login.relogin')}"
  }
  // function for component init
  function showToast(msg, type, fixed = false) {
    td.message = JSON.parse(JSON.stringify(msg))
    td.title = messages[type]
    td.type = type
    toast.setAttribute("toast-data", JSON.stringify(td));
    if(fixed) {
      toast.setAttribute("fixed", JSON.stringify(fixed))
      toast.setAttribute("action-url", JSON.stringify(logout.url))
      toast.setAttribute("action-title", JSON.stringify(logout.msg))
      toast.setAttribute("action-btn", JSON.stringify(logout.btn))
    }
    toast.setAttribute("is-active", "true");
  }
```

## Props

### ***Component state (show/hide):***

### **`isActive`**

- Type: String
- Default: 'false'

### ***Component content:***

### **`toast-data`**

- ***`title`*** (String)
- ***`message`*** (String - *can be used html*)
- ***`type`*** (String - *info, success, error*)

### ***Component styles:***

### **`toast-style`**

- ***`position`*** (String - *center, left-top, right-top, left-bottom, right-bottom*)
- ***`decoration`*** (Boolean)
- ***`backdrop`*** (Boolean)
- ***`colorized`*** (Boolean)
- ***`color`*** (String - *any color*)
- ***`font`*** (String - *any font-family*)

### ***Component action:***

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

#### *passing props example*

:::code-group

```js [content]
  const td = { title: 'some title',
              message: 'some message',
              type: 'info' }

  toast.setAttribute('toast-data', JSON.stringify(td))
```

```js [styles]
  const ts = { position: 'center',
              decoration: false,
              colorized: false,
              backdrop: false,
              color: "#ffffff",
              font: "'Open Sans', sans-serif" }

  toast.setAttribute('toast-style', JSON.stringify(ts))
```

```js [action]
  const ta = { fixed: true,
              actionUrl: 'path for action',
              actionTitle: 'title for action',
              actionBtn: 'text for button' }

  toast.setAttribute("fixed", JSON.stringify(ta.fixed))
  toast.setAttribute("action-url", JSON.stringify(ta.actionUrl))
  toast.setAttribute("action-title", JSON.stringify(ta.actionTitle))
  toast.setAttribute("action-btn", JSON.stringify(ta.actionBtn))
```

:::

## Deployment

- build app
- upload file **`toast.js`** from **`dist`** folder to **`Doocroot-Explorer -> scripts/path/for/app`**
