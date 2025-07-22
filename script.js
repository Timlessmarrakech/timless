function getLang(){
  return document.documentElement.lang || 'en';
}
async function fetchData(category){
  const res = await fetch(`data/${getLang()}/${category}.json`);
  return res.json();
}
function shuffle(arr){
  return arr.sort(() => Math.random() - 0.5);
}
function createTourCard(t){
  const div=document.createElement('div');
  div.className='card';
  div.innerHTML=`<img loading="lazy" src="${t.gallery[0]}" alt="${t.title}">
  <div class="p-2"><h3>${t.title}</h3><p>${t.durationDays} days – from $${t.priceFrom}</p></div>`;
  return div;
}
function createActivityCard(a){
  const div=document.createElement('div');
  div.className='card';
  div.innerHTML=`<img loading="lazy" src="${a.gallery[0]}" alt="${a.title}">
  <div class="p-2"><h3>${a.title}</h3><p>${a.durationHours} hrs – from $${a.priceFrom}</p></div>`;
  return div;
}
function createAccommodationCard(a){
  const div=document.createElement('div');
  div.className='card';
  div.innerHTML=`<img loading="lazy" src="${a.photos[0]}" alt="${a.name}">
  <div class="p-2"><h3>${a.name}</h3><p>${a.city} – ${a.priceRange}</p></div>`;
  return div;
}
function createPostCard(p){
  const div=document.createElement('div');
  div.className='card';
  div.innerHTML=`<img loading="lazy" src="${p.image}" alt="${p.title}">
  <div class="p-2"><h3>${p.title}</h3><p>${p.excerpt}</p></div>`;
  return div;
}
function createTestimonialCard(t){
  const div=document.createElement('div');
  div.className='testimonial-card';
  div.innerHTML=`<img loading="lazy" src="${t.photo}" alt="${t.name}" width="80" height="80">
  <p>${t.text}</p><strong>${t.name}</strong><span>${t.location}</span>`;
  return div;
}
function createFAQItem(f){
  const div=document.createElement('div');
  div.className='faq-item';
  const btn=document.createElement('button');
  btn.textContent=f.question;
  const p=document.createElement('p');
  p.textContent=f.answer;
  p.style.display='none';
  btn.addEventListener('click',()=>{
    p.style.display=p.style.display==='none'?'block':'none';
  });
  div.append(btn,p);
  return div;
}
function startTestimonialSlider(){
  const container=document.querySelector('.testimonials-slider');
  if(!container) return;
  let index=0;
  setInterval(()=>{
    const cards=container.children;
    if(cards.length>1){
      cards[index].style.marginLeft='-320px';
      index=(index+1)%cards.length;
      setTimeout(()=>{container.appendChild(cards[0]);cards[0].style.marginLeft='0';},500);
    }
  },4000);
}
function setupSearch(tours){
  const input=document.getElementById('tour-search');
  if(!input) return;
  input.addEventListener('input',()=>{
    const term=input.value.toLowerCase();
    const grid=document.querySelector('.tours-grid');
    grid.innerHTML='';
    tours.filter(t=>t.title.toLowerCase().includes(term)).forEach(t=>grid.appendChild(createTourCard(t)));
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const toursGrid=document.querySelector('.tours-grid');
  if(toursGrid){
    const tours=shuffle(await fetchData('tours'));
    tours.slice(0,3).forEach(t=>toursGrid.appendChild(createTourCard(t)));
    setupSearch(tours);
  }
  const activitiesGrid=document.querySelector('.activities-grid');
  if(activitiesGrid){
    const acts=shuffle(await fetchData('activities')).slice(0,3);
    acts.forEach(a=>activitiesGrid.appendChild(createActivityCard(a)));
  }
  const accGrid=document.querySelector('.accommodations-grid');
  if(accGrid){
    const accs=shuffle(await fetchData('accommodations')).slice(0,3);
    accs.forEach(a=>accGrid.appendChild(createAccommodationCard(a)));
  }
  const blogGrid=document.querySelector('.blog-grid');
  if(blogGrid){
    const posts=shuffle(await fetchData('posts')).slice(0,3);
    posts.forEach(p=>blogGrid.appendChild(createPostCard(p)));
  }
  const testGrid=document.querySelector('.testimonials-slider');
  if(testGrid){
    const tests=shuffle(await fetchData('testimonials')).slice(0,5);
    tests.forEach(t=>testGrid.appendChild(createTestimonialCard(t)));
    startTestimonialSlider();
  }
  const faqAcc=document.querySelector('.faq-accordion');
  if(faqAcc){
    const faqs=await fetchData('faqs');
    faqs.forEach(f=>faqAcc.appendChild(createFAQItem(f)));
  }
});
