::: raw
<h1 class="heading">custom-ebc</h1>
:::

::: tip usage
in ***EBC*** portal for account details management
:::

## Import component

### in HTML header in `structure.vm` velocity template

```html
  <script type="module" crossorigin src="/scripts/path/to/ebc.js"></script>
```

## Place component

### in velocity template `account_details.vm`

```html
  <custom-ebc></custom-ebc>
```

## Interacting with component

### Script for getting required translations & styles and *listening* to event

```js
  <script async defer>
    const ebc = document.querySelector("custom-ebc");
    function setAttributes(el, attrs) {
      for (var key in attrs) {
        const attr =
          typeof attrs[key] !== "string"
            ? JSON.stringify(attrs[key])
            : attrs[key];
        el.setAttribute(key, attr);
      }
    }
    const ebcProps = {
      translations: {
        #foreach($resource in ${messages.getResourcesWithPrefix('shop.ebc.my_account')})
          '$!{resource.getKey()}': '$!{resource.getValue().replace("'", "")}',
        #end
      },
      "primary-color": getComputedStyle(document.querySelector('.site-title')).color,
      "hover-color": getComputedStyle(document.querySelector('.hover-color')).color,
      font: getComputedStyle(document.querySelector('.site-title')).fontFamily,
      "action-url": "${link.getAction('/ajax/taxfreenoncashbenefit/email')}"
    };
    setAttributes(ebc, ebcProps);
    window.addEventListener("toggle-toast", toggleToast);
    function toggleToast(e) {
      showToast(e.detail.messages, e.detail.type, e.detail.fixed)
    }
  </script>
```

## Props

### ***Translations are recived from velocity action:***

### **`translations`**

- Type: String

### ***Styles are received from site elements:***

### **`primaryColor`**

- Type: String

### **`hoverColor`**

- Type: String

### **`font`**

- Type: String

### ***Action url are received from velocity action:***

### **`actionUrl`**

- Type: String
- Default: ''

## Deployment

- build app
- upload file **`ebc.js`** from **`dist`** folder to **`Doocroot-Explorer -> scripts/path/to/ebc.js`**
