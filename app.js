(function(){
"use strict";
var pages=[], navigation=document.getElementById("navigation"), content=document.getElementById("content"), statusEl=document.getElementById("status"), search=document.getElementById("searchInput"), sidebar=document.getElementById("sidebar"), backdrop=document.getElementById("backdrop");
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function inline(s){return esc(s).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\[([^\]]+)\]\((https?:\/\/[^ )]+)\)/g,'<a href="$2" target="_blank" rel="noreferrer">$1</a>')}
function markdown(src){
 var lines=String(src||"").replace(/\r/g,"").split("\n"), out=[], inCode=false, inList=false;
 function closeList(){if(inList){out.push("</ul>");inList=false}}
 lines.forEach(function(line){
  if(/^\`\`\`/.test(line)){closeList();out.push(inCode?"</code></pre>":"<pre><code>");inCode=!inCode;return}
  if(inCode){out.push(esc(line)+"\n");return}
  var m=line.match(/^(#{1,3})\s+(.+)$/);
  if(m){closeList();out.push("<h"+m[1].length+">"+inline(m[2])+"</h"+m[1].length+">");return}
  m=line.match(/^[-*]\s+(.+)$/);
  if(m){if(!inList){out.push("<ul>");inList=true}out.push("<li>"+inline(m[1])+"</li>");return}
  if(/^>\s?/.test(line)){closeList();out.push("<blockquote>"+inline(line.replace(/^>\s?/,""))+"</blockquote>");return}
  if(!line.trim()){closeList();return}
  closeList();out.push("<p>"+inline(line)+"</p>")
 });
 closeList();if(inCode)out.push("</code></pre>");return out.join("\n")
}
function grouped(list){var map={};list.forEach(function(p){var c=p.category||"その他";(map[c]||(map[c]=[])).push(p)});return map}
function renderNav(list){
 navigation.textContent="";var groups=grouped(list);
 Object.keys(groups).forEach(function(cat){var h=document.createElement("div");h.className="category";h.textContent=cat;navigation.appendChild(h);groups[cat].forEach(function(p){var a=document.createElement("a");a.className="nav-link";a.href="#"+encodeURIComponent(p.slug);a.textContent=p.title;a.dataset.slug=p.slug;navigation.appendChild(a)})});
 statusEl.textContent=list.length+" / "+pages.length+" ページ"
}
function current(){return decodeURIComponent(location.hash.slice(1))||"overview"}
function render(){
 var slug=current(), page=pages.find(function(p){return p.slug===slug})||pages[0];
 if(!page){content.innerHTML='<div class="empty">ページがありません。</div>';return}
 document.querySelectorAll(".nav-link").forEach(function(a){a.classList.toggle("active",a.dataset.slug===page.slug)});
 var images=(page.images||[]).map(function(src){return '<figure><img src="/'+esc(src)+'" alt="'+esc(page.title)+'"><figcaption>'+esc(src)+'</figcaption></figure>'}).join("");
 content.innerHTML='<article><header class="article-head"><div class="eyebrow">'+esc(page.category||"UNTOLD")+'</div><h1>'+esc(page.title)+'</h1></header>'+markdown(page.content)+(images?'<div class="gallery">'+images+"</div>":"")+"</article>";
 document.title=page.title+" | UNTOLD Wiki";content.focus({preventScroll:true});window.scrollTo(0,0);closeMenu()
}
function closeMenu(){sidebar.classList.remove("open");backdrop.classList.remove("open")}
document.getElementById("menuButton").addEventListener("click",function(){sidebar.classList.toggle("open");backdrop.classList.toggle("open")});
backdrop.addEventListener("click",closeMenu);
search.addEventListener("input",function(){var q=this.value.trim().toLowerCase();renderNav(!q?pages:pages.filter(function(p){return (p.title+" "+p.category+" "+p.content).toLowerCase().indexOf(q)>=0}))});
window.addEventListener("hashchange",render);
fetch("/wiki.json",{cache:"no-store"}).then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.json()}).then(function(data){pages=Array.isArray(data.pages)?data.pages:[];renderNav(pages);render()}).catch(function(e){statusEl.textContent="読み込み失敗";content.innerHTML='<div class="empty">wiki.json を読み込めませんでした。<br>'+esc(e.message)+"</div>"});
})();