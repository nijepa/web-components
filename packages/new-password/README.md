::: raw
<h1 class="heading">custom-new-password</h1>
:::

::: tip usage
in ***cadooz*** for new password
:::

## Import component

### in HTML header in `structure.vm` velocity template

```html
  <script type="module" crossorigin src="/scripts/path/to/search.js"></script>
```

## Place component

### in velocity template `header.vm`

```html
  <custom-search></custom-search>
```

## Interacting with component

### Script for *emmiting/listening* event *to/from* component and getting required translations, app context name

```js
  <script async defer>
    const search = document.querySelector("custom-search");
    const showSearch = () => {
      search.setAttribute("is-active", "true");
    };
    const searchClosed = () => {
      search.setAttribute("is-active", "false");
    };
    window.addEventListener("close-search", searchClosed);
    const msgs = {
      empty: "$!{messages.get('incentivemall.productoverview.empty')}",
      placeholder: "$!{messages.get('incentivemall.productoverview.search')}"
    }
    search.setAttribute("translations", JSON.stringify(msgs))
    search.setAttribute("context", "$request.getContextPath()")
  </script>
```

### Header navbar elemet with search icon to init component

```html
  <li class="nav-item d-flex align-items-center" onclick="showSearch()">
    <svg id="search" class="search__icon svg-icon ml-0" 
      xmlns:xlink="http://www.w3.org/1999/xlink" 
      xmlns="http://www.w3.org/2000/svg" version="1.1">
      <use xlink:href="/images/icons/all_in_one.svg#search"></use>
    </svg>
  </li>
```

## Props

### ***Used for component state (show/hide):***

### **`isActive`**

- Type: String
- Default: 'false'

### ***Used for text resources (recived from velocity action):***

### **`translations`**

- Type: String

### ***Used for API call and generation of links to outer pages:***

### **`context`**

- Type: String
- Default: '/mall'

## Deployment

- build app
- upload file **`search.js`** from **`dist`** folder to **`Doocroot-Explorer -> scripts/path/for/app`**
