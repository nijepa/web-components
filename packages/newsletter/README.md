::: raw
<h1 class="heading">custom-newsletter</h1>
:::

::: tip usage
in ***ALDI*** for newsletter functionality
:::

## Import component

### in HTML header in `structure.vm` velocity template

```html
  <script type="module" crossorigin src="/scripts/path/to/newsletter.js"></script>
```

## Place component

### in velocity template `catalog/list/default.vm`

```html
  <custom-newsletter></custom-newsletter>
```

## Interacting with component

### Script for getting required translations & styles and *listening* to event

```js
  <script async defer>
    const newsletter = document.querySelector("custom-newsletter");
    function setAttributes(el, attrs) {
      for (var key in attrs) {
        const attr =
          typeof attrs[key] !== "string"
            ? JSON.stringify(attrs[key])
            : attrs[key];
        el.setAttribute(key, attr);
      }
    }
    const newsletterProps = {
      translations: {
        #foreach($resource in ${messages.getResourcesWithPrefix('shop.newsletter')})
          '$!{resource.getKey()}': '$!{resource.getValue().replace("'", "")}',
        #end
      },
      "primary-color": getComputedStyle(document.querySelector('.site-title')).color,
      "hover-color": getComputedStyle(document.querySelector('.hover-color')).color,
      font: getComputedStyle(document.querySelector('.site-title')).fontFamily
    };
    setAttributes(newsletter, newsletterProps);
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

## Deployment

- build app
- upload file **`newsletter.js`** from **`dist`** folder to **`Doocroot-Explorer -> scripts/path/to/newsletter.js`**
