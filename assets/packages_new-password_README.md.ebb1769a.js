import{_ as s,o as a,c as o,O as n}from"./chunks/framework.ccbcf921.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"packages/new-password/README.md","filePath":"packages/new-password/README.md"}'),e={name:"packages/new-password/README.md"},l=n(`<div class="vp-raw"><h1 class="heading">custom-new-password</h1></div><div class="tip custom-block"><p class="custom-block-title">usage</p><p>in <strong><em>cadooz</em></strong> for new password</p></div><h2 id="import-component" tabindex="-1">Import component <a class="header-anchor" href="#import-component" aria-label="Permalink to &quot;Import component&quot;">​</a></h2><h3 id="in-html-header-in-structure-vm-velocity-template" tabindex="-1">in HTML header in <code>structure.vm</code> velocity template <a class="header-anchor" href="#in-html-header-in-structure-vm-velocity-template" aria-label="Permalink to &quot;in HTML header in \`structure.vm\` velocity template&quot;">​</a></h3><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">module</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">crossorigin</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/scripts/path/to/new-password.js</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><h2 id="place-component" tabindex="-1">Place component <a class="header-anchor" href="#place-component" aria-label="Permalink to &quot;Place component&quot;">​</a></h2><h3 id="in-velocity-template-forgot-password-vm" tabindex="-1">in velocity template <code>forgot_password.vm</code> <a class="header-anchor" href="#in-velocity-template-forgot-password-vm" aria-label="Permalink to &quot;in velocity template \`forgot_password.vm\`&quot;">​</a></h3><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">custom-new-password</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">app-type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">taxfreenoncashbenefit</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">component-type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">forgot</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">custom-new-password</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><h3 id="in-velocity-template-new-password-vm" tabindex="-1">in velocity template <code>new_password.vm</code> <a class="header-anchor" href="#in-velocity-template-new-password-vm" aria-label="Permalink to &quot;in velocity template \`new_password.vm\`&quot;">​</a></h3><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">custom-new-password</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">app-type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">taxfreenoncashbenefit</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">component-type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">new</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">custom-new-password</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><h2 id="interacting-with-component" tabindex="-1">Interacting with component <a class="header-anchor" href="#interacting-with-component" aria-label="Permalink to &quot;Interacting with component&quot;">​</a></h2><h3 id="script-for-emmiting-listening-event-to-from-component-and-getting-required-translations-app-context-name" tabindex="-1">Script for <em>emmiting/listening</em> event <em>to/from</em> component and getting required translations, app context name <a class="header-anchor" href="#script-for-emmiting-listening-event-to-from-component-and-getting-required-translations-app-context-name" aria-label="Permalink to &quot;Script for _emmiting/listening_ event _to/from_ component and getting required translations, app context name&quot;">​</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">async</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">defer</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    const pass = document.querySelector(&quot;custom-new-password&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    function setAttributes(el, attrs) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#82AAFF;">for</span><span style="color:#A6ACCD;"> (var key </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> attrs) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        const attr </span><span style="color:#89DDFF;">=</span></span>
<span class="line"><span style="color:#A6ACCD;">          typeof attrs</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">] !== &quot;string&quot;</span></span>
<span class="line"><span style="color:#F07178;">            ? JSON.stringify(attrs[</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">])</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> attrs[key];</span></span>
<span class="line"><span style="color:#A6ACCD;">        el</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setAttribute</span><span style="color:#A6ACCD;">(key</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> attr);</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    const passProps = </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      translations: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        #</span><span style="color:#F07178;">foreach</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">$resource</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">$</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;font-style:italic;">messages</span><span style="color:#A6ACCD;">.</span><span style="color:#A6ACCD;font-style:italic;">getResourcesWithPrefix</span><span style="color:#A6ACCD;">(&quot;</span><span style="color:#A6ACCD;font-style:italic;">api</span><span style="color:#A6ACCD;">.</span><span style="color:#A6ACCD;font-style:italic;">rest</span><span style="color:#A6ACCD;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> &quot;</span><span style="color:#A6ACCD;font-style:italic;">shop</span><span style="color:#A6ACCD;">.</span><span style="color:#A6ACCD;font-style:italic;">ebc</span><span style="color:#A6ACCD;">&quot;)</span><span style="color:#89DDFF;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">          &#39;$!</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">resource</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getKey</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">}</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">$!{resource.getValue().replace(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">&#39;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#F07178;">)}</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">,</span></span>
<span class="line"><span style="color:#F07178;">        #end</span></span>
<span class="line"><span style="color:#F07178;">        #foreach($resource in \${messages.getResourcesWithPrefix(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">passwords</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)})</span></span>
<span class="line"><span style="color:#F07178;">          </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">$!{resource.getKey()}</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">$!{resource.getValue().replace(&quot;</span><span style="color:#89DDFF;">&#39;&quot;</span><span style="color:#C3E88D;">, </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#C3E88D;">)}&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        #end</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">website-uuid</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">$session.getAttribute(&quot;com.cadooz.WEBSITE_EXTERNAL_IDENTIFICATION&quot;)</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">captcha-type</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">$torque.getCaptchaTypeByName($!{current_website.getAttributeOptionValue(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">CAPTCHA_TYPE</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)})</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">primary-color</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#82AAFF;">getComputedStyle</span><span style="color:#A6ACCD;">(document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.site-title</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">color</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">secondary-color</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#82AAFF;">getComputedStyle</span><span style="color:#A6ACCD;">(document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.site-title</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">color</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      lang: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$!{locale.toLanguageTag()}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    setAttributes(pass, passProps);</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><h3 id="used-to-load-right-component-forgot-new" tabindex="-1"><strong><em>Used to load right component (forgot/new):</em></strong> <a class="header-anchor" href="#used-to-load-right-component-forgot-new" aria-label="Permalink to &quot;**_Used to load right component (forgot/new):_**&quot;">​</a></h3><h3 id="componenttype" tabindex="-1"><strong><code>componentType</code></strong> <a class="header-anchor" href="#componenttype" aria-label="Permalink to &quot;**\`componentType\`**&quot;">​</a></h3><ul><li>Type: String</li></ul><h3 id="used-to-load-right-app-taxfreenoncashbenefit-mall-oip-cips" tabindex="-1"><strong><em>Used to load right app (taxfreenoncashbenefit/mall/oip/cips/...):</em></strong> <a class="header-anchor" href="#used-to-load-right-app-taxfreenoncashbenefit-mall-oip-cips" aria-label="Permalink to &quot;**_Used to load right app (taxfreenoncashbenefit/mall/oip/cips/...):_**&quot;">​</a></h3><h3 id="apptype" tabindex="-1"><strong><code>appType</code></strong> <a class="header-anchor" href="#apptype" aria-label="Permalink to &quot;**\`appType\`**&quot;">​</a></h3><ul><li>Type: String</li></ul><h3 id="used-for-text-resources-recived-from-velocity-action" tabindex="-1"><strong><em>Used for text resources (recived from velocity action):</em></strong> <a class="header-anchor" href="#used-for-text-resources-recived-from-velocity-action" aria-label="Permalink to &quot;**_Used for text resources (recived from velocity action):_**&quot;">​</a></h3><h3 id="translations" tabindex="-1"><strong><code>translations</code></strong> <a class="header-anchor" href="#translations" aria-label="Permalink to &quot;**\`translations\`**&quot;">​</a></h3><ul><li>Type: String</li></ul><h3 id="unique-identifier-from-current-app-used-for-requests" tabindex="-1"><strong><em>Unique identifier from current app (used for requests):</em></strong> <a class="header-anchor" href="#unique-identifier-from-current-app-used-for-requests" aria-label="Permalink to &quot;**_Unique identifier from current app (used for requests):_**&quot;">​</a></h3><h3 id="websiteuuid" tabindex="-1"><strong><code>websiteUuid</code></strong> <a class="header-anchor" href="#websiteuuid" aria-label="Permalink to &quot;**\`websiteUuid\`**&quot;">​</a></h3><ul><li>Type: String</li></ul><h3 id="used-to-apply-language" tabindex="-1"><strong><em>Used to apply language:</em></strong> <a class="header-anchor" href="#used-to-apply-language" aria-label="Permalink to &quot;**_Used to apply language:_**&quot;">​</a></h3><h3 id="language" tabindex="-1"><strong><code>language</code></strong> <a class="header-anchor" href="#language" aria-label="Permalink to &quot;**\`language\`**&quot;">​</a></h3><ul><li>Type: String</li><li>Default: &#39;de&#39;</li></ul><h3 id="used-to-load-captcha-hcaptcha-recaptcha" tabindex="-1"><strong><em>Used to load captcha (hCaptcha/reCaptcha):</em></strong> <a class="header-anchor" href="#used-to-load-captcha-hcaptcha-recaptcha" aria-label="Permalink to &quot;**_Used to load captcha (hCaptcha/reCaptcha):_**&quot;">​</a></h3><h3 id="captchatype" tabindex="-1"><strong><code>captchaType</code></strong> <a class="header-anchor" href="#captchatype" aria-label="Permalink to &quot;**\`captchaType\`**&quot;">​</a></h3><ul><li>Type: String</li><li>Default: &#39;hCaptcha&#39;</li></ul><h3 id="used-to-apply-primary-colors" tabindex="-1"><strong><em>Used to apply primary colors:</em></strong> <a class="header-anchor" href="#used-to-apply-primary-colors" aria-label="Permalink to &quot;**_Used to apply primary colors:_**&quot;">​</a></h3><h3 id="primarycolor" tabindex="-1"><strong><code>primaryColor</code></strong> <a class="header-anchor" href="#primarycolor" aria-label="Permalink to &quot;**\`primaryColor\`**&quot;">​</a></h3><ul><li>Type: String</li></ul><h3 id="used-to-apply-secondary-colors" tabindex="-1"><strong><em>Used to apply secondary colors:</em></strong> <a class="header-anchor" href="#used-to-apply-secondary-colors" aria-label="Permalink to &quot;**_Used to apply secondary colors:_**&quot;">​</a></h3><h3 id="secondarycolor" tabindex="-1"><strong><code>secondaryColor</code></strong> <a class="header-anchor" href="#secondarycolor" aria-label="Permalink to &quot;**\`secondaryColor\`**&quot;">​</a></h3><ul><li>Type: String</li></ul><h2 id="deployment" tabindex="-1">Deployment <a class="header-anchor" href="#deployment" aria-label="Permalink to &quot;Deployment&quot;">​</a></h2><ul><li>build app</li><li>upload file <strong><code>new-password.js</code></strong> from <strong><code>dist</code></strong> folder to <strong><code>Doocroot-Explorer -&gt; scripts/path/for/app</code></strong></li></ul>`,40),t=[l];function p(r,c,i,y,D,d){return a(),o("div",null,t)}const h=s(e,[["render",p]]);export{u as __pageData,h as default};
