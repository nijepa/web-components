import{_ as s,o as a,c as n,Q as o}from"./chunks/framework.fbbb2000.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"packages/newsletter/README.md","filePath":"packages/newsletter/README.md","lastUpdated":1695842101000}'),l={name:"packages/newsletter/README.md"},e=o(`<div class="vp-raw"><h1 class="heading">custom-newsletter</h1></div><div class="tip custom-block"><p class="custom-block-title">usage</p><p>in <em><strong>ALDI</strong></em> for newsletter functionality</p></div><h2 id="import-component" tabindex="-1">Import component <a class="header-anchor" href="#import-component" aria-label="Permalink to &quot;Import component&quot;">​</a></h2><h3 id="in-html-header-in-structure-vm-velocity-template" tabindex="-1">in HTML header in <code>structure.vm</code> velocity template <a class="header-anchor" href="#in-html-header-in-structure-vm-velocity-template" aria-label="Permalink to &quot;in HTML header in \`structure.vm\` velocity template&quot;">​</a></h3><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;module&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">crossorigin</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;/scripts/path/to/newsletter.js&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;module&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">crossorigin</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;/scripts/path/to/newsletter.js&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="place-component" tabindex="-1">Place component <a class="header-anchor" href="#place-component" aria-label="Permalink to &quot;Place component&quot;">​</a></h2><h3 id="in-velocity-template-catalog-list-default-vm" tabindex="-1">in velocity template <code>catalog/list/default.vm</code> <a class="header-anchor" href="#in-velocity-template-catalog-list-default-vm" aria-label="Permalink to &quot;in velocity template \`catalog/list/default.vm\`&quot;">​</a></h3><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">custom-newsletter</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">custom-newsletter</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">custom-newsletter</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">custom-newsletter</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="interacting-with-component" tabindex="-1">Interacting with component <a class="header-anchor" href="#interacting-with-component" aria-label="Permalink to &quot;Interacting with component&quot;">​</a></h2><h3 id="script-for-getting-required-translations-styles-and-listening-to-event" tabindex="-1">Script for getting required translations &amp; styles and <em>listening</em> to event <a class="header-anchor" href="#script-for-getting-required-translations-styles-and-listening-to-event" aria-label="Permalink to &quot;Script for getting required translations &amp; styles and *listening* to event&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defer</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    const ebc = document.querySelector(&quot;custom-ebc&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    function setAttributes(el, attrs) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">for</span><span style="color:#E1E4E8;"> (var key </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> attrs) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        const attr </span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">          typeof attrs[key] !== &quot;string&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            ? JSON.stringify(attrs[key])</span></span>
<span class="line"><span style="color:#E1E4E8;">            : attrs[key];</span></span>
<span class="line"><span style="color:#E1E4E8;">        el.</span><span style="color:#B392F0;">setAttribute</span><span style="color:#E1E4E8;">(key, attr);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    const ebcProps = {</span></span>
<span class="line"><span style="color:#E1E4E8;">      translations: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        #</span><span style="color:#B392F0;">foreach</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">$resource</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">$</span><span style="color:#E1E4E8;">{</span><span style="color:#FFAB70;">messages</span><span style="color:#E1E4E8;">.</span><span style="color:#FFAB70;">getResourcesWithPrefix</span><span style="color:#E1E4E8;">(&#39;</span><span style="color:#FFAB70;">shop</span><span style="color:#E1E4E8;">.</span><span style="color:#FFAB70;">ebc</span><span style="color:#E1E4E8;">.</span><span style="color:#FFAB70;">my_account</span><span style="color:#E1E4E8;">&#39;)})</span></span>
<span class="line"><span style="color:#E1E4E8;">          &#39;$!{resource.</span><span style="color:#B392F0;">getKey</span><span style="color:#E1E4E8;">()}</span><span style="color:#9ECBFF;">&#39;: &#39;</span><span style="color:#E1E4E8;">$!{resource.getValue().replace(</span><span style="color:#9ECBFF;">&quot;&#39;&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">)}</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#FDAEB7;font-style:italic;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        #end</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;primary-color&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#B392F0;">getComputedStyle</span><span style="color:#E1E4E8;">(document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;.site-title&#39;</span><span style="color:#E1E4E8;">)).color,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;hover-color&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#B392F0;">getComputedStyle</span><span style="color:#E1E4E8;">(document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;.hover-color&#39;</span><span style="color:#E1E4E8;">)).color,</span></span>
<span class="line"><span style="color:#E1E4E8;">      font: </span><span style="color:#B392F0;">getComputedStyle</span><span style="color:#E1E4E8;">(document.</span><span style="color:#B392F0;">querySelector</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;.site-title&#39;</span><span style="color:#E1E4E8;">)).fontFamily,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;action-url&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;\${link.getAction(&#39;/ajax/taxfreenoncashbenefit/email&#39;)}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setAttributes</span><span style="color:#E1E4E8;">(ebc, ebcProps);</span></span>
<span class="line"><span style="color:#E1E4E8;">    window.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;toggle-toast&quot;</span><span style="color:#E1E4E8;">, toggleToast);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">toggleToast</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">showToast</span><span style="color:#E1E4E8;">(e.detail.messages, e.detail.type, e.detail.fixed)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">script</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">async</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defer</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    const ebc = document.querySelector(&quot;custom-ebc&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    function setAttributes(el, attrs) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">for</span><span style="color:#24292E;"> (var key </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> attrs) {</span></span>
<span class="line"><span style="color:#24292E;">        const attr </span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">          typeof attrs[key] !== &quot;string&quot;</span></span>
<span class="line"><span style="color:#24292E;">            ? JSON.stringify(attrs[key])</span></span>
<span class="line"><span style="color:#24292E;">            : attrs[key];</span></span>
<span class="line"><span style="color:#24292E;">        el.</span><span style="color:#6F42C1;">setAttribute</span><span style="color:#24292E;">(key, attr);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    const ebcProps = {</span></span>
<span class="line"><span style="color:#24292E;">      translations: {</span></span>
<span class="line"><span style="color:#24292E;">        #</span><span style="color:#6F42C1;">foreach</span><span style="color:#24292E;">(</span><span style="color:#E36209;">$resource</span><span style="color:#24292E;"> </span><span style="color:#E36209;">in</span><span style="color:#24292E;"> </span><span style="color:#E36209;">$</span><span style="color:#24292E;">{</span><span style="color:#E36209;">messages</span><span style="color:#24292E;">.</span><span style="color:#E36209;">getResourcesWithPrefix</span><span style="color:#24292E;">(&#39;</span><span style="color:#E36209;">shop</span><span style="color:#24292E;">.</span><span style="color:#E36209;">ebc</span><span style="color:#24292E;">.</span><span style="color:#E36209;">my_account</span><span style="color:#24292E;">&#39;)})</span></span>
<span class="line"><span style="color:#24292E;">          &#39;$!{resource.</span><span style="color:#6F42C1;">getKey</span><span style="color:#24292E;">()}</span><span style="color:#032F62;">&#39;: &#39;</span><span style="color:#24292E;">$!{resource.getValue().replace(</span><span style="color:#032F62;">&quot;&#39;&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">)}</span><span style="color:#032F62;">&#39;</span><span style="color:#B31D28;font-style:italic;">,</span></span>
<span class="line"><span style="color:#24292E;">        #end</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;primary-color&quot;</span><span style="color:#24292E;">: </span><span style="color:#6F42C1;">getComputedStyle</span><span style="color:#24292E;">(document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;.site-title&#39;</span><span style="color:#24292E;">)).color,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;hover-color&quot;</span><span style="color:#24292E;">: </span><span style="color:#6F42C1;">getComputedStyle</span><span style="color:#24292E;">(document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;.hover-color&#39;</span><span style="color:#24292E;">)).color,</span></span>
<span class="line"><span style="color:#24292E;">      font: </span><span style="color:#6F42C1;">getComputedStyle</span><span style="color:#24292E;">(document.</span><span style="color:#6F42C1;">querySelector</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;.site-title&#39;</span><span style="color:#24292E;">)).fontFamily,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;action-url&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;\${link.getAction(&#39;/ajax/taxfreenoncashbenefit/email&#39;)}&quot;</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setAttributes</span><span style="color:#24292E;">(ebc, ebcProps);</span></span>
<span class="line"><span style="color:#24292E;">    window.</span><span style="color:#6F42C1;">addEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;toggle-toast&quot;</span><span style="color:#24292E;">, toggleToast);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">toggleToast</span><span style="color:#24292E;">(</span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">showToast</span><span style="color:#24292E;">(e.detail.messages, e.detail.type, e.detail.fixed)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">script</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><h3 id="translations-are-recived-from-velocity-action" tabindex="-1"><em><strong>Translations are recived from velocity action:</strong></em> <a class="header-anchor" href="#translations-are-recived-from-velocity-action" aria-label="Permalink to &quot;***Translations are recived from velocity action:***&quot;">​</a></h3><h3 id="translations" tabindex="-1"><strong><code>translations</code></strong> <a class="header-anchor" href="#translations" aria-label="Permalink to &quot;**\`translations\`**&quot;">​</a></h3><ul><li>Type: String</li></ul><h3 id="styles-are-received-from-site-elements" tabindex="-1"><em><strong>Styles are received from site elements:</strong></em> <a class="header-anchor" href="#styles-are-received-from-site-elements" aria-label="Permalink to &quot;***Styles are received from site elements:***&quot;">​</a></h3><h3 id="primarycolor" tabindex="-1"><strong><code>primaryColor</code></strong> <a class="header-anchor" href="#primarycolor" aria-label="Permalink to &quot;**\`primaryColor\`**&quot;">​</a></h3><ul><li>Type: String</li></ul><h3 id="hovercolor" tabindex="-1"><strong><code>hoverColor</code></strong> <a class="header-anchor" href="#hovercolor" aria-label="Permalink to &quot;**\`hoverColor\`**&quot;">​</a></h3><ul><li>Type: String</li></ul><h3 id="font" tabindex="-1"><strong><code>font</code></strong> <a class="header-anchor" href="#font" aria-label="Permalink to &quot;**\`font\`**&quot;">​</a></h3><ul><li>Type: String</li></ul><h3 id="action-url-are-received-from-velocity-action" tabindex="-1"><em><strong>Action url are received from velocity action:</strong></em> <a class="header-anchor" href="#action-url-are-received-from-velocity-action" aria-label="Permalink to &quot;***Action url are received from velocity action:***&quot;">​</a></h3><h3 id="actionurl" tabindex="-1"><strong><code>actionUrl</code></strong> <a class="header-anchor" href="#actionurl" aria-label="Permalink to &quot;**\`actionUrl\`**&quot;">​</a></h3><ul><li>Type: String</li><li>Default: &#39;&#39;</li></ul><h2 id="deployment" tabindex="-1">Deployment <a class="header-anchor" href="#deployment" aria-label="Permalink to &quot;Deployment&quot;">​</a></h2><ul><li>build app</li><li>upload file <strong><code>ebc.js</code></strong> from <strong><code>dist</code></strong> folder to <strong><code>Doocroot-Explorer -&gt; scripts/path/for/app</code></strong></li></ul>`,27),t=[e];function p(r,c,i,E,y,d){return a(),n("div",null,t)}const m=s(l,[["render",p]]);export{h as __pageData,m as default};
