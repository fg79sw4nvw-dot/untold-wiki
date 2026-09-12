(function(){
"use strict";
var pages=[], navigation=document.getElementById("navigation"), content=document.getElementById("content"), statusEl=document.getElementById("status"), search=document.getElementById("searchInput"), sidebar=document.getElementById("sidebar"), backdrop=document.getElementById("backdrop");
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function inline(s){return esc(s).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\[([^\]]+)\]\((https?:\/\/[^ )]+|\/[^ )]+|[^ )]+)\)/g,'<a href="$2" target="_blank" rel="noreferrer">$1</a>')}
function firstTitle(src,fallback){var m=String(src||"").match(/^#\s+(.+)$/m);return m?m[1].trim():fallback}
function withoutFirstTitle(src){return String(src||"").replace(/^\s*#\s+.*(?:\n|$)/,"")}
function tableCells(line){return line.trim().replace(/^\|/,"").replace(/\|$/,"").split("|").map(function(v){return v.trim()})}
function isTableSep(line){return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line)}
function markdown(src){
 var lines=String(src||"").replace(/\r/g,"").split("\n"),out=[],inCode=false,listType="",i=0;
 function closeList(){if(listType){out.push("</"+listType+">");listType=""}}
 while(i<lines.length){var line=lines[i];
  if(/^```/.test(line)){closeList();out.push(inCode?"</code></pre>":"<pre><code>");inCode=!inCode;i++;continue}
  if(inCode){out.push(esc(line)+"\n");i++;continue}
  if(line.indexOf("|")>=0&&i+1<lines.length&&isTableSep(lines[i+1])){closeList();var head=tableCells(line),rows=[];i+=2;while(i<lines.length&&lines[i].indexOf("|")>=0&&lines[i].trim()){rows.push(tableCells(lines[i]));i++}out.push("<div class=\"table-wrap\"><table><thead><tr>"+head.map(function(c){return "<th>"+inline(c)+"</th>"}).join("")+"</tr></thead><tbody>"+rows.map(function(r){return "<tr>"+r.map(function(c){return "<td>"+inline(c)+"</td>"}).join("")+"</tr>"}).join("")+"</tbody></table></div>");continue}
  var m=line.match(/^(#{1,3})\s+(.+)$/);if(m){closeList();out.push("<h"+m[1].length+">"+inline(m[2])+"</h"+m[1].length+">");i++;continue}
  m=line.match(/^[-*]\s+(.+)$/);if(m){if(listType!=="ul"){closeList();out.push("<ul>");listType="ul"}out.push("<li>"+inline(m[1])+"</li>");i++;continue}
  m=line.match(/^\d+\.\s+(.+)$/);if(m){if(listType!=="ol"){closeList();out.push("<ol>");listType="ol"}out.push("<li>"+inline(m[1])+"</li>");i++;continue}
  if(/^>\s?/.test(line)){closeList();out.push("<blockquote>"+inline(line.replace(/^>\s?/,""))+"</blockquote>");i++;continue}
  if(/^\s*---+\s*$/.test(line)){closeList();out.push("<hr>");i++;continue}
  if(!line.trim()){closeList();i++;continue}
  closeList();out.push("<p>"+inline(line)+"</p>");i++
 }
 closeList();if(inCode)out.push("</code></pre>");return out.join("\n")
}
function grouped(list){var map={};list.forEach(function(p){var c=p.category||"その他";(map[c]||(map[c]=[])).push(p)});return map}
function renderNav(list){navigation.textContent="";var groups=grouped(list);Object.keys(groups).forEach(function(cat){var h=document.createElement("div");h.className="category";h.textContent=cat;navigation.appendChild(h);groups[cat].forEach(function(p){var a=document.createElement("a");a.className="nav-link";a.href="#"+encodeURIComponent(p.slug);a.textContent=p.title;a.dataset.slug=p.slug;navigation.appendChild(a)})});statusEl.textContent=list.length+" / "+pages.length+" ページ"}
function current(){var s=decodeURIComponent(location.hash.slice(1));return !s||s==="overview"?"home":s}
function render(){var slug=current(),page=pages.find(function(p){return p.slug===slug})||pages[0];if(!page){content.innerHTML='<div class="empty">ページがありません。</div>';return}document.querySelectorAll(".nav-link").forEach(function(a){a.classList.toggle("active",a.dataset.slug===page.slug)});var images=(page.images||[]).map(function(src){return '<figure><img src="/'+esc(src)+'" alt="'+esc(page.title)+'"><figcaption>'+esc(src)+'</figcaption></figure>'}).join("");content.innerHTML='<article><header class="article-head"><div class="eyebrow">'+esc(page.category||"UNTOLD")+'</div><h1>'+esc(page.title)+'</h1></header>'+markdown(withoutFirstTitle(page.content))+(images?'<div class="gallery">'+images+"</div>":"")+"</article>";document.title=page.title+" | UNTOLD Wiki";content.focus({preventScroll:true});window.scrollTo(0,0);closeMenu()}
function closeMenu(){sidebar.classList.remove("open");backdrop.classList.remove("open")}
function loadPage(meta){return fetch("/"+meta.path,{cache:"no-store"}).then(function(r){if(!r.ok)throw new Error(meta.path+" HTTP "+r.status);return r.text()}).then(function(text){return {slug:meta.slug,title:meta.title||firstTitle(text,meta.slug),category:meta.category||"その他",path:meta.path,content:text,images:meta.images||[]}})}
document.getElementById("menuButton").addEventListener("click",function(){sidebar.classList.toggle("open");backdrop.classList.toggle("open")});backdrop.addEventListener("click",closeMenu);search.addEventListener("input",function(){var q=this.value.trim().toLowerCase();renderNav(!q?pages:pages.filter(function(p){return (p.title+" "+p.category+" "+p.content).toLowerCase().indexOf(q)>=0}))});window.addEventListener("hashchange",render);
fetch("/pages.json",{cache:"no-store"}).then(function(r){if(!r.ok)throw new Error("pages.json HTTP "+r.status);return r.json()}).then(function(data){var manifest=Array.isArray(data.pages)?data.pages:[];return Promise.all(manifest.map(function(meta){return loadPage(meta).catch(function(e){console.error(e);return null})}))}).then(function(loaded){pages=loaded.filter(Boolean);renderNav(pages);render()}).catch(function(e){statusEl.textContent="読み込み失敗";content.innerHTML='<div class="empty">Markdownページを読み込めませんでした。<br>'+esc(e.message)+"</div>"});
})();
