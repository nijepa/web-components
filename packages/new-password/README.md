::: raw

<h1 class="heading">custom-new-password</h1>
:::

::: tip usage
in **_cadooz_** for forgot password/new password functionality
:::

## Import component

### in HTML header in `structure.vm` velocity template

```html
<script
  type="module"
  crossorigin
  src="/scripts/path/to/new-password.js"
></script>
```

## Place component

### in velocity template `forgot_password.vm`

```html
<custom-new-password
  app-type="taxfreenoncashbenefit"
  component-type="forgot"
></custom-new-password>
```

### in velocity template `new_password.vm`

```html
<custom-new-password
  app-type="taxfreenoncashbenefit"
  component-type="new"
></custom-new-password>
```

## Interacting with component

### Script for _emmiting/listening_ event _to/from_ component and getting required props

```js
  <script async defer>
    const pass = document.querySelector("custom-new-password");
    function setAttributes(el, attrs) {
      for (var key in attrs) {
        const attr =
          typeof attrs[key] !== "string"
            ? JSON.stringify(attrs[key])
            : attrs[key];
        el.setAttribute(key, attr);
      }
    }
    const passProps = {
      translations: {
        #foreach($resource in ${messages.getResourcesWithPrefix("api.rest", "shop.ebc")})
          '$!{resource.getKey()}': '$!{resource.getValue().replace("'", "")}',
        #end
        #foreach($resource in ${messages.getResourcesWithPrefix("passwords")})
          '$!{resource.getKey()}': '$!{resource.getValue().replace("'", "")}',
        #end
      }
      "website-uuid": '$session.getAttribute("com.cadooz.WEBSITE_EXTERNAL_IDENTIFICATION")',
      "captcha-type": '$torque.getCaptchaTypeByName($!{current_website.getAttributeOptionValue('CAPTCHA_TYPE')})',
      "primary-color": getComputedStyle(document.querySelector('.site-title')).color,
      "secondary-color": getComputedStyle(document.querySelector('.site-title')).color,
      lang: "$!{locale.toLanguageTag()}",
    }
    setAttributes(pass, passProps);
  </script>
```

## Props

### **_Used to load right component:_**

### **`componentType`**

- Type: String
- Values: `forgot`, `new`

### **_Used to load right app (taxfreenoncashbenefit/mall/oip/cips/...):_**

### **`appType`**

- Type: String
- Values: `taxfreenoncashbenefit`, `mall`, `oip`, `cips`, `otto`, `renault`, `service`

### **_Used for text resources (recived from velocity action):_**

### **`translations`**

- Type: String

### **_Unique identifier from current app (used for requests):_**

### **`websiteUuid`**

- Type: String

### **_Used to apply language:_**

### **`language`**

- Type: String
- Default: 'de'

### **_Used to load captcha:_**

### **`captchaType`**

- Type: String
- Default: 'hCaptcha'
- Values: `hCaptcha`, `reCaptcha`

### **_Used to apply primary colors:_**

### **`primaryColor`**

- Type: String

### **_Used to apply secondary colors:_**

### **`secondaryColor`**

- Type: String

## Deployment

- build app
- upload file **`new-password.js`** from **`dist`** folder to **`Doocroot-Explorer -> scripts/path/to/new-password.js`**
