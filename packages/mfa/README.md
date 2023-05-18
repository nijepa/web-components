::: raw
<h1 class="heading">custom-mfa</h1>
:::

::: tip
used in ***CIPS*** aps for multi factor authentication
:::

## Import component

### in HTML header in `structure.vm` velocity template

```html
  <script type="module" crossorigin src="/scripts/path/to/mfa.js"></script>

```

## Place component

### in velocity templates `profile.vm` and `mfa_activate_login.vm`

```html
  <custom-mfa></custom-mfa>
```

## Passing data to component

### Some sessions keys are required for optional/mandatory mfa

::: code-group

```html [mfa_activate_login.vm]
  #set( $mfalogin = ${session.getAttribute($constants.get('SESSION_KEY_MULTIFACTOR_AUTHENTICATION_ACTIVATION_REQUIRED'))} )
  <div id="islogin" style="display: none;">$mfalogin</div>
```

```html [profile.vm]
  #set( $mfalogin = ${session.getAttribute($constants.get('SESSION_KEY_MULTIFACTOR_AUTHENTICATION_ACTIVATION_AFTER_LOGIN'))} )
  <div id="islogin" style="display: none;">$mfalogin</div>
```

:::

### We can use helper function to pass all the attributes

```js
  function setAttributes(el, attrs) {
    for (var key in attrs) {
      const attr =
        typeof attrs[key] !== "string"
          ? JSON.stringify(attrs[key])
          : attrs[key];
      el.setAttribute(key, attr);
    }
  }
```

### Passing data in velocity templates examples

::: code-group

```js [profile.vm]

  const mfa = document.querySelector('custom-mfa');

  const mfaProps = {
    translations: {
      #foreach($resource in ${messages.getResourcesWithPrefix('cips.mfa')})
        '$!{resource.getKey()': '$!{resource.getValue().replace("'", "")}',
      #end
    },
    "primary-color": getComputedStyle(document.querySelector('.site-title')).color,
    font: getComputedStyle(document.querySelector('.site-title')).fontFamily,
    "logo-url": getComputedStyle(document.querySelector('.customer-logo-frame > a')).backgroundImage,
    "mfa-status-url": "${link.getAction('/myprofile/mfa/checkStatus')}",
    "mfa-generate-qr-code-url": "${link.getAction('/myprofile/mfa/generateQrCode')}",
    "mfa-check-verification-code-url": "${link.getAction('/myprofile/mfa/checkVerificationCode')}",
    "mfa-activate-url": "${link.getAction('/myprofile/mfa/activate')}",
    "mfa-download-backup-codes-url": "${link.getAction('/myprofile/mfa/downloadBackupCodes')}",
    "mfa-deactivate-url": "${link.getAction('/myprofile/mfa/deactivate')}",
    "mfa-generate-new-backup-codes-url": "${link.getAction('/myprofile/mfa/generateNewBackupCodes')}",
    "from-mfa-hint": document.querySelector('#islogin').innerText
  };

  setAttributes(mfa, mfaProps);
```

```js [mfa_activate_login.vm]
  const mfa = document.querySelector("custom-mfa");

  const mfaProps = {
    translations: {
      #foreach($resource in ${messages.getResourcesWithPrefix('cips.mfa')})
        '$!{resource.getKey()': '$!{resource.getValue().replace("'", "")}',
      #end
    },
    "primary-color": getComputedStyle(document.querySelector('.site-title')).color,
    font: getComputedStyle(document.querySelector('.site-title')).fontFamily,
    "logo-url": getComputedStyle(document.querySelector('.customer-logo-frame > a')).backgroundImage,
    "mfa-status-url": "${link.getAction('/myprofile/mfa/checkStatus')}",
    "mfa-generate-qr-code-url": "${link.getAction('/login/mfa/generateQrCode')}",
    "mfa-check-verification-code-url": "${link.getAction('/login/mfa/checkVerificationCode')}",
    "mfa-activate-url": "${link.getAction('/login/mfa/activate')}",
    "mfa-download-backup-codes-url": "${link.getAction('/login/mfa/downloadBackupCodes')}",
    "mfa-deactivate-url": "${link.getAction('/myprofile/mfa/deactivate')}",
    "mfa-generate-new-backup-codes-url": "${link.getAction('/myprofile/mfa/generateNewBackupCodes')}",
    "from-mfa-login": document.querySelector('#islogin').innerText
  };

  setAttributes(mfa, mfaProps);
```

:::

## Props

### ***Translations are recived from velocity action:***

### **`translations`**

- Type: String

### ***Styles are received from site elements:***

### **`primaryColor`**

- Type: String
- Default: "#000"

### **`font`**

- Type: String
- Default: "'Open Sans', sans-serif"

### **`logoUrl`**

- Type: String
- Default: ""

### ***Actions url's are received from velocity actions:***

### **`mfaStatusUrl`**

- Type: String
- Default: ""

### **`mfaGenerateQrCodeUrl`**

- Type: String
- Default: ""

### **`mfaCheckVerificationCodeUrl`**

- Type: String
- Default: ""

### **`mfaActivateUrl`**

- Type: String
- Default: ""

### **`mfaDownloadBackupCodesUrl`**

- Type: String
- Default: ""

### **`mfaDeactivateUrl`**

- Type: String
- Default: ""

### **`mfaGenerateNewBackupCodesUrl`**

- Type: String
- Default: ""

### ***Session keys if user comes from mfa login/hint page:***

### **`fromMfaHint`**

- Type: String
- Default: ""

### **`fromMfaLogin`**

- Type: String
- Default: ""

## Deployment

- build app
- upload file **`mfa.js`** from **`dist`** folder to **`Doocroot-Explorer -> scripts/path/for/app`**
