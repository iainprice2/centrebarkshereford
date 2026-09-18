(function(){
"use strict";


/* ---------------- navigation ---------------- */
(function(){
  var nav=document.getElementById("nav"),menuBtn=document.getElementById("menuBtn");
  if(menuBtn) menuBtn.addEventListener("click",function(){
    var open=nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded",String(open));
  });
  var page=document.body.getAttribute("data-page");
  document.querySelectorAll("[data-link]").forEach(function(a){
    if(a.classList.contains("btn")) return;
    if(a.getAttribute("data-link")===page) a.setAttribute("aria-current","page");
  });
})();

(function(){
  /* ---------------- theme ---------------- */
  var themeBtn=document.getElementById("themeBtn");
  function currentDark(){
    var t=document.documentElement.getAttribute("data-theme");
    if(t) return t==="dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function syncThemeLabel(){themeBtn.textContent=currentDark()?"Switch to light":"Switch to dark";}
  themeBtn.addEventListener("click",function(){
    var next=currentDark()?"light":"dark";
    document.documentElement.setAttribute("data-theme",next);
    try{localStorage.setItem("bb-theme",next);}catch(e){}
    try{var saved=localStorage.getItem("bb-theme");if(saved) document.documentElement.setAttribute("data-theme",saved);}catch(e){}
  syncThemeLabel();
  });
  syncThemeLabel();
})();

(function(){
  if(!document.getElementById("days")) return;
  /* ---------------- house diary ---------------- */
  var DIARY=[
   {day:"Mon",date:"21 Sep",note:"Ham Hill in the morning, paddock games after the rain.",guests:[
     {n:"Otter",b:"Flat-coat retriever, 4",t:"Night 3 of 9"},
     {n:"Pip",b:"Jack Russell, 11 · on thyroid tablets",t:"Night 1 of 4"},
     {n:"Juno",b:"Rescue lurcher, 2",t:"Day care"},
     {n:"Bramble",b:"Cockapoo puppy, 6 months",t:"Half day"}]},
   {day:"Tue",date:"22 Sep",note:"Quiet day — two settling-in visits at 2pm and 4pm.",guests:[
     {n:"Otter",b:"Flat-coat retriever, 4",t:"Night 4 of 9"},
     {n:"Pip",b:"Jack Russell, 11 · on thyroid tablets",t:"Night 2 of 4"},
     {n:"Maple",b:"Border collie, 7 · ball obsessive",t:"Day care"}]},
   {day:"Wed",date:"23 Sep",note:"Long loop on the Parrett Trail if the ground dries out.",guests:[
     {n:"Otter",b:"Flat-coat retriever, 4",t:"Night 5 of 9"},
     {n:"Pip",b:"Jack Russell, 11 · on thyroid tablets",t:"Night 3 of 4"},
     {n:"Juno",b:"Rescue lurcher, 2",t:"Day care"},
     {n:"Sid",b:"French bulldog, 5 · short walks only",t:"Night 1 of 6"}]},
   {day:"Thu",date:"24 Sep",note:"Vet in the village at 11am for Sid's weigh-in.",guests:[
     {n:"Otter",b:"Flat-coat retriever, 4",t:"Night 6 of 9"},
     {n:"Pip",b:"Jack Russell, 11 · going home 5pm",t:"Last night"},
     {n:"Sid",b:"French bulldog, 5 · short walks only",t:"Night 2 of 6"},
     {n:"Maple",b:"Border collie, 7 · ball obsessive",t:"Day care"},
     {n:"Bramble",b:"Cockapoo puppy, 6 months",t:"Half day"}]},
   {day:"Fri",date:"25 Sep",note:"Busiest day of the week. Two walk groups, morning and late.",guests:[
     {n:"Otter",b:"Flat-coat retriever, 4",t:"Night 7 of 9"},
     {n:"Sid",b:"French bulldog, 5 · short walks only",t:"Night 3 of 6"},
     {n:"Juno",b:"Rescue lurcher, 2",t:"Night 1 of 3"},
     {n:"Winnie",b:"Golden retriever, 8",t:"Night 1 of 2"},
     {n:"Maple",b:"Border collie, 7",t:"Day care"},
     {n:"Bramble",b:"Cockapoo puppy, 6 months",t:"Half day"}]},
   {day:"Sat",date:"26 Sep",note:"Beach run at Burnham if the tide works out.",guests:[
     {n:"Otter",b:"Flat-coat retriever, 4",t:"Night 8 of 9"},
     {n:"Sid",b:"French bulldog, 5",t:"Night 4 of 6"},
     {n:"Juno",b:"Rescue lurcher, 2",t:"Night 2 of 3"},
     {n:"Winnie",b:"Golden retriever, 8 · going home 4pm",t:"Last night"}]},
   {day:"Sun",date:"27 Sep",note:"Slow morning, lanes only. Otter goes home at 6pm.",guests:[
     {n:"Otter",b:"Flat-coat retriever, 4 · going home 6pm",t:"Last night"},
     {n:"Sid",b:"French bulldog, 5",t:"Night 5 of 6"},
     {n:"Juno",b:"Rescue lurcher, 2 · going home 11am",t:"Last night"}]}
  ];
  var daysEl=document.getElementById("days"),guestsEl=document.getElementById("guests"),
      footEl=document.getElementById("diaryFoot"),bedsEl=document.getElementById("bedsLeft");

  DIARY.forEach(function(d,i){
    var b=document.createElement("button");
    b.className="day";b.type="button";b.setAttribute("role","tab");
    b.setAttribute("aria-selected",i===0?"true":"false");
    b.textContent=d.day+" "+d.date;
    b.addEventListener("click",function(){showDay(i);});
    daysEl.appendChild(b);
  });
  function showDay(i){
    var d=DIARY[i];
    Array.prototype.forEach.call(daysEl.children,function(b,j){
      b.setAttribute("aria-selected",j===i?"true":"false");
    });
    guestsEl.innerHTML="";
    d.guests.forEach(function(g){
      var li=document.createElement("li");li.className="guest";
      li.innerHTML='<span class="dot" aria-hidden="true">'+g.n.charAt(0)+'</span>'+
        '<span class="nm">'+g.n+'</span>'+
        '<span class="tag">'+g.t+'</span>'+
        '<span class="breed">'+g.b+'</span>';
      guestsEl.appendChild(li);
    });
    var overnight=d.guests.filter(function(g){return /Night|Last/.test(g.t);}).length;
    bedsEl.textContent=Math.max(0,6-overnight);
    footEl.textContent=d.note;
  }
  showDay(0);
})();

(function(){
  if(!document.getElementById("filters")) return;
  /* ---------------- testimonials ---------------- */
  var REVIEWS=[
   {q:"Bella came home tired and smug, which is exactly what I was hoping for. The evening photos meant I stopped checking my phone by day two.",who:"Hannah R.",dog:"Bella, springer spaniel",stay:"9 nights in August",tags:["overnight"]},
   {q:"Our old boy is deaf, arthritic and needs tablets twice a day. Tess wrote down every dose and sent me the sheet at the end. Nobody has taken that much care of him before.",who:"Derek P.",dog:"Alfie, labrador, 13",stay:"5 nights",tags:["overnight","senior"]},
   {q:"Milo is reactive on lead and I'd more or less given up on going away. They took him on a settling visit, said honestly what they could and couldn't do, and then did exactly that.",who:"Priya S.",dog:"Milo, collie cross",stay:"Regular day care",tags:["daycare","anxious"]},
   {q:"Day care two days a week since March. He waits at the gate now, which tells me more than any review could.",who:"Tom W.",dog:"Bruno, boxer",stay:"Weekly day care",tags:["daycare"]},
   {q:"We turned up unannounced to collect early and the house was calm, clean and smelled of nothing but dog biscuits. That's the test, isn't it.",who:"Catherine M.",dog:"Nell, whippet",stay:"4 nights",tags:["overnight"]},
   {q:"Our puppy came back sleeping through the night and no longer flinging herself at other dogs in the park. Half days were worth every penny.",who:"Jess A.",dog:"Poppy, cockapoo, 5 months",stay:"Puppy half days",tags:["puppy","daycare"]},
   {q:"Scout is a rescue and hated being left. They kept her with the lurchers for the first day and let her come to them. Three visits later she walks in without looking back.",who:"Marie D.",dog:"Scout, saluki cross",stay:"3 nights, twice",tags:["anxious","overnight"]},
   {q:"Straightforward people. Clear terms, clear prices, no upselling, and they turned us down for one week in July because they were full rather than squeezing us in.",who:"Adam L.",dog:"Hugo, cockerpoo",stay:"Two stays this year",tags:["overnight"]},
   {q:"They spotted a lump on Gus's flank we hadn't noticed and rang us the same morning. Benign, in the end, but caught early because someone was actually looking at him.",who:"Rachel H.",dog:"Gus, staffie, 10",stay:"6 nights",tags:["senior","overnight"]},
   {q:"Our two go together and are chaos as a pair. Fed separately, walked separately for the first day, then reintroduced. Somebody has thought about this properly.",who:"Owen T.",dog:"Ziggy and Fern, terriers",stay:"12 nights at Christmas",tags:["overnight"]},
   {q:"Fourteen weeks old and terrified of everything. She came home having met a wheelbarrow, a hoover and a very patient lurcher.",who:"Sam K.",dog:"Iris, labrador puppy",stay:"Puppy half days",tags:["puppy"]},
   {q:"I'd been let down by a kennel two days before a wedding. Tess sorted us out and didn't charge the bank holiday rate she'd have been entitled to.",who:"Louise B.",dog:"Ted, spaniel",stay:"3 nights",tags:["overnight"]}
  ];
  var FILTERS=[["all","All reviews"],["overnight","Overnight"],["daycare","Day care"],["puppy","Puppies"],["senior","Older dogs"],["anxious","Nervous dogs"]];
  var filtersEl=document.getElementById("filters"),quotesEl=document.getElementById("quotes"),
      countEl=document.getElementById("reviewCount"),active="all";
  FILTERS.forEach(function(f){
    var b=document.createElement("button");
    b.className="chip";b.type="button";b.dataset.tag=f[0];b.textContent=f[1];
    b.setAttribute("aria-pressed",f[0]==="all"?"true":"false");
    b.addEventListener("click",function(){active=f[0];renderReviews();});
    filtersEl.appendChild(b);
  });
  function renderReviews(){
    Array.prototype.forEach.call(filtersEl.children,function(b){
      b.setAttribute("aria-pressed",b.dataset.tag===active?"true":"false");
    });
    var list=REVIEWS.filter(function(r){return active==="all"||r.tags.indexOf(active)>-1;});
    countEl.textContent=list.length+(list.length===1?" review":" reviews")+(active==="all"?"":" in this group");
    quotesEl.innerHTML="";
    if(!list.length){
      quotesEl.innerHTML='<p class="empty">No reviews in this group yet. Try another filter, or ask us and we\'ll introduce you to an owner directly.</p>';
      return;
    }
    list.forEach(function(r){
      var fig=document.createElement("figure");fig.className="quote";
      fig.innerHTML='<div class="stars" aria-label="Five out of five">★★★★★</div>'+
        '<blockquote>'+r.q+'</blockquote>'+
        '<figcaption><b>'+r.who+'</b> · '+r.dog+'<br>'+r.stay+'</figcaption>';
      quotesEl.appendChild(fig);
    });
  }
  renderReviews();
})();

(function(){
  if(!document.getElementById("acc")) return;
  /* ---------------- terms ---------------- */
  var TERMS=[
   {h:"Booking and deposits",b:"<p>A booking is confirmed only when we've replied in writing and your deposit has cleared. Dates held by phone or message are provisional and can be given to someone else.</p><p>The deposit is 25% of the total stay, or £30 for day care blocks. It comes off the final bill.</p><p>Every first overnight stay is preceded by a free settling-in visit. If that visit shows we're not the right place for your dog, the deposit is returned in full.</p>"},
   {h:"Payment",b:"<p>The balance is due on the first day of the stay, by bank transfer or card. Day care blocks are paid for up front.</p><p>Stays longer than three weeks can be paid in two instalments — ask when you book.</p><p>Late payment after 14 days is charged interest at 4% above the Bank of England base rate, in line with the Late Payment of Commercial Debts Act.</p>"},
   {h:"Cancellations and changes",b:"<ul><li>More than 28 days before arrival: deposit refunded in full.</li><li>14–28 days: deposit held as credit for 12 months.</li><li>Less than 14 days: deposit retained.</li><li>Less than 48 hours, or no-show: 50% of the total stay is payable.</li></ul><p>Shortening a stay once it has begun doesn't reduce the agreed fee, because the bed is held for your dates. If we have to cancel — illness, family emergency, anything at our end — you get everything back and we'll help you find another licensed boarder.</p>"},
   {h:"Vaccination, worming and fleas",b:"<p>We need to see a vaccination card at or before the settling-in visit showing cover for distemper, hepatitis, parvovirus and leptospirosis, given at least 14 days before arrival. Kennel cough vaccination is required annually and must be at least 14 days old.</p><p>Titre testing is accepted with a vet's letter. Dogs must be treated for fleas, ticks and worms within the month before arrival.</p><p>A dog arriving with fleas will be treated at your cost and may be sent home if the house is at risk.</p>"},
   {h:"Health, medication and suitability",b:"<p>Tell us everything: medication, allergies, seizures, incontinence, resource guarding, bite history, fear of men, anything at all. We can work with most of it. We can't work with what we don't know.</p><p>We give oral and topical medication at no extra charge and record every dose. We don't give injections other than pre-loaded insulin pens where you've trained us and your vet has confirmed in writing.</p><p>Bitches in season can't be boarded. Unneutered males over 12 months are taken case by case.</p>"},
   {h:"Behaviour and removal",b:"<p>If a dog is persistently distressed, aggressive towards people or other dogs, or damaging the house, we'll ring you first. If it can't be settled we'll ask you or your emergency contact to collect within 12 hours.</p><p>Your emergency contact must be someone who can physically get here and is willing to take the dog. Please make sure they've agreed to it.</p>"},
   {h:"Food",b:"<p>Bring your own food, measured per day, in a sealed container. Sudden changes of diet are the commonest cause of an upset stomach away from home.</p><p>If food runs out we'll buy a like-for-like replacement and add it to the bill at cost.</p>"},
   {h:"Vet treatment and emergencies",b:"<p>By booking, you authorise us to seek veterinary treatment if we judge it necessary. We'll use your own vet where practical; otherwise Yeovil's emergency practice, five minutes away.</p><p>You are responsible for all veterinary fees incurred during the stay, including out-of-hours charges, whether or not we could reach you first. We'll always try to reach you first.</p><p>We hold a signed consent form with a treatment cost ceiling you set yourself, and we won't exceed it without speaking to you or your emergency contact.</p>"},
   {h:"Drop-off, collection and late collection",b:"<p>Drop-off and collection are 8–10am and 4–6pm. Outside those hours by arrangement only, so that arrivals don't unsettle the dogs already here.</p><p>Collection after 6pm on the last day is charged as an additional night at the standard rate.</p><p>A dog not collected within 7 days of the agreed date, with no contact from you or your emergency contact, is treated as abandoned under the Animal Welfare Act 2006 and will be passed to a rescue we work with. We have never had to do this.</p>"},
   {h:"Insurance and liability",b:"<p>We hold public liability and care, custody and control insurance to £2m through Cliverton. That doesn't replace your own pet insurance, which you should keep in place for the stay.</p><p>We're liable for loss or injury caused by our negligence. We're not liable for pre-existing conditions, illness contracted despite correct vaccination, or injury arising from behaviour you didn't disclose.</p><p>Nothing in these terms limits our liability for death or personal injury caused by negligence, or for fraud.</p>"},
   {h:"Photos and messages",b:"<p>You get a photo and a short note each evening. We also post occasionally on social media — tick the box on the booking form if you'd rather your dog wasn't included. You can change your mind at any time and we'll take existing posts down.</p>"},
   {h:"Your information",b:"<p>We keep your contact details, your dog's records and your vet's details for the duration of our relationship and for six years afterwards, as our insurer requires. We don't sell or share them, other than with a vet in an emergency.</p><p>To see, correct or delete what we hold, email hello@brambleandbone.co.uk. Full detail is in our privacy notice, given to you at the settling-in visit.</p>"},
   {h:"Complaints",b:"<p>Tell Tess first, on the day if you can. If we can't put it right between us, our licensing authority is Somerset Council's animal welfare team, and our licence number is AWL/0417.</p>"},
   {h:"Changes to these terms",b:"<p>We update these occasionally. The version that applies to your stay is the one published on the day you paid your deposit, and we'll send you a copy with your booking confirmation.</p>"}
  ];
  var accEl=document.getElementById("acc"),tocEl=document.getElementById("tocList");
  TERMS.forEach(function(t,i){
    var id="term-"+i;
    var item=document.createElement("div");item.className="acc-item";item.id=id;
    item.innerHTML=
      '<h3 style="margin:0"><button class="acc-btn" type="button" aria-expanded="false" aria-controls="'+id+'-p">'+
        '<h3>'+(i+1)+'. '+t.h+'</h3><span class="sign" aria-hidden="true">+</span></button></h3>'+
      '<div class="acc-panel" id="'+id+'-p" role="region"><div class="inner">'+t.b+'</div></div>';
    accEl.appendChild(item);
    var li=document.createElement("li");
    li.innerHTML='<a href="#'+id+'" data-open="'+i+'">'+t.h+'</a>';
    tocEl.appendChild(li);
  });
  function setPanel(btn,open){
    var panel=document.getElementById(btn.getAttribute("aria-controls"));
    btn.setAttribute("aria-expanded",String(open));
    panel.style.maxHeight=open?(panel.scrollHeight+40)+"px":"0px";
  }
  accEl.addEventListener("click",function(e){
    var btn=e.target.closest(".acc-btn");
    if(!btn) return;
    setPanel(btn,btn.getAttribute("aria-expanded")!=="true");
  });
  tocEl.addEventListener("click",function(e){
    var a=e.target.closest("a[data-open]");
    if(!a) return;
    e.preventDefault();
    var item=document.getElementById("term-"+a.dataset.open);
    setPanel(item.querySelector(".acc-btn"),true);
    item.scrollIntoView({behavior:"smooth",block:"start"});
  });
  var expandAll=document.getElementById("expandAll");
  expandAll.addEventListener("click",function(){
    var btns=accEl.querySelectorAll(".acc-btn");
    var opening=expandAll.textContent.indexOf("Open")===0;
    Array.prototype.forEach.call(btns,function(b){setPanel(b,opening);});
    expandAll.textContent=opening?"Close all sections":"Open all sections";
  });
})();

(function(){
  if(!document.getElementById("enquiry")) return;
  /* ---------------- enquiry form ---------------- */
  var form=document.getElementById("enquiry"),confirmEl=document.getElementById("confirm");
  function fail(id,on){
    var input=document.getElementById(id),err=document.getElementById("err-"+id);
    if(input) input.setAttribute("aria-invalid",on?"true":"false");
    if(err) err.classList.toggle("show",!!on);
  }
  ["name","email","dog","service","from","to","agree"].forEach(function(id){
    var el=document.getElementById(id);
    el.addEventListener("input",function(){if(el.getAttribute("aria-invalid")==="true") fail(id,false);});
    el.addEventListener("change",function(){if(el.getAttribute("aria-invalid")==="true") fail(id,false);});
  });
  form.addEventListener("submit",function(e){
    e.preventDefault();
    var v={};["name","email","dog","service","from","to","notes","phone","breed"].forEach(function(id){
      v[id]=document.getElementById(id).value.trim();
    });
    var bad=[];
    if(!v.name) bad.push("name");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) bad.push("email");
    if(!v.service) bad.push("service");
    if(!v.dog) bad.push("dog");
    if(!v.from) bad.push("from");
    if(!v.to || (v.from && v.to < v.from)) bad.push("to");
    if(!document.getElementById("agree").checked) bad.push("agree");
    ["name","email","service","dog","from","to","agree"].forEach(function(id){fail(id,bad.indexOf(id)>-1);});
    if(bad.length){
      var first=document.getElementById(bad[0]);
      first.focus();
      first.scrollIntoView({behavior:"smooth",block:"center"});
      return;
    }
    function pretty(d){
      if(!d) return "—";
      var p=d.split("-");
      var m=["January","February","March","April","May","June","July","August","September","October","November","December"];
      return Number(p[2])+" "+m[Number(p[1])-1]+" "+p[0];
    }
    var ref="BB-"+String(Math.floor(Math.random()*9000)+1000);
    form.hidden=true;
    confirmEl.hidden=false;
    confirmEl.innerHTML='<div class="done">'+
      '<h3>Enquiry sent</h3>'+
      '<p>Thanks, '+v.name.split(" ")[0]+'. We\'ve got this and we\'ll reply to '+v.email+' today, usually within a couple of hours. Nothing is booked yet — these dates stay open until we confirm and your deposit clears.</p>'+
      '<dl><dt>Reference</dt><dd>'+ref+'</dd>'+
      '<dt>Dog</dt><dd>'+v.dog+(v.breed?" · "+v.breed:"")+'</dd>'+
      '<dt>Stay</dt><dd>'+v.service+'</dd>'+
      '<dt>Dates</dt><dd>'+pretty(v.from)+' to '+pretty(v.to)+'</dd></dl>'+
      '<p style="margin-bottom:0">Need us sooner? Ring <a href="tel:+441935000000" style="color:inherit">01935 000 000</a>.</p>'+
      '<p style="margin:1.2rem 0 0"><button class="btn ghost small" type="button" id="again">Send another enquiry</button></p>'+
      '</div>';
    confirmEl.querySelector("#again").addEventListener("click",function(){
      form.reset();form.hidden=false;confirmEl.hidden=true;
      document.getElementById("name").focus();
    });
    confirmEl.scrollIntoView({behavior:"smooth",block:"center"});
  });
})();

})();
