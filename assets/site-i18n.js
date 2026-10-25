(function(){
const languages={en:'English',bn:'বাংলা',si:'සිංහල',ur:'اردو',ar:'العربية'};
const key='oh_public_lang';const current=languages[localStorage.getItem(key)]?localStorage.getItem(key):'en';
const isRoot=!/\/(insights|subjects|university)\//.test(location.pathname);
const existing=document.getElementById('siteLang');
const sel=existing||document.createElement('select');
if(!existing){sel.id='siteLang';sel.className='oh-lang-select';sel.setAttribute('aria-label','Website language');Object.entries(languages).forEach(([code,name])=>{const op=document.createElement('option');op.value=code;op.textContent=name;sel.append(op)});const nav=document.querySelector('.nav .wrap,.nav .container,.nav');if(nav)nav.append(sel)}
const style=document.createElement('style');style.textContent='.oh-lang-select{padding:9px 11px;border:1px solid #cad9e9;background:#fff;color:#143c62;border-radius:9px;font:700 12px Arial,sans-serif;max-width:135px;cursor:pointer}.goog-te-banner-frame,.goog-te-gadget,.goog-te-balloon-frame{display:none!important}body{top:0!important}.skiptranslate{font-size:0}.oh-translating-notice{position:fixed;bottom:70px;right:15px;padding:9px 12px;background:#13375d;color:white;font:600 11px Arial,sans-serif;border-radius:8px;z-index:1200;max-width:260px}.oh-lang-select option{direction:ltr}';document.head.append(style);
const providerCodes={bn:'bn',si:'si',ur:'ur',ar:'ar',en:'en'};
function cookie(lang){const v='/en/'+lang;document.cookie='googtrans='+v+';path=/;SameSite=Lax';if(location.hostname.includes('.'))document.cookie='googtrans='+v+';path=/;domain=.'+location.hostname.split('.').slice(-2).join('.')+';SameSite=Lax'}
function request(lang){localStorage.setItem(key,lang);cookie(lang);const u=new URL(location.href);u.searchParams.set('lang',lang);location.assign(u.toString())}
if(!existing)sel.addEventListener('change',()=>request(sel.value));else {sel.addEventListener('change',()=>{const next=sel.value;if(next!==current)request(next)})}
sel.value=current;document.documentElement.lang=current;document.documentElement.dir=['ar','ur'].includes(current)?'rtl':'ltr';
if(current==='en')return;
const status=document.createElement('div');status.className='oh-translating-notice';status.textContent='Translating this page · '+languages[current];document.body.append(status);
const target=document.createElement('div');target.id='oh-google-translate-target';target.style.cssText='position:absolute;width:0;height:0;overflow:hidden';document.body.append(target);
window.ohGoogleTranslateInit=function(){try{new google.translate.TranslateElement({pageLanguage:'en',includedLanguages:'bn,si,ur,ar',autoDisplay:false},'oh-google-translate-target');let tries=0;const timer=setInterval(()=>{const combo=document.querySelector('.goog-te-combo');if(combo){combo.value=providerCodes[current];combo.dispatchEvent(new Event('change',{bubbles:true}));clearInterval(timer);setTimeout(()=>status.remove(),2500)}else if(++tries>35){clearInterval(timer);status.textContent='Automatic translation unavailable. Try your browser Translate feature.'}},250)}catch(err){status.textContent='Automatic translation unavailable. Try your browser Translate feature.'}};
const script=document.createElement('script');script.src='https://translate.google.com/translate_a/element.js?cb=ohGoogleTranslateInit';script.async=true;script.onerror=()=>{status.textContent='Automatic translation unavailable. Try your browser Translate feature.'};document.head.append(script);
})();