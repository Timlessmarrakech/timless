async function fetchData(category){
  const res = await fetch(`data/en/${category}.json`);
  return res.json();
}
function shuffle(arr){
  return arr.sort(() => Math.random() - 0.5);
}
function createTourCard(t){
  const div=document.createElement('div');
  div.className='card';
  div.innerHTML=`<img src="${t.gallery[0]}" alt="${t.title}" width="400" height="250">
  <div class="p-2"><h3>${t.title}</h3><p>${t.durationDays} days – from $${t.priceFrom}</p></div>`;
  return div;
}
function createActivityCard(a){
  const div=document.createElement('div');
  div.className='card';
  div.innerHTML=`<img src="${a.gallery[0]}" alt="${a.title}" width="400" height="250">
  <div class="p-2"><h3>${a.title}</h3><p>${a.durationHours} hrs – from $${a.priceFrom}</p></div>`;
  return div;
}
function createAccommodationCard(a){
  const div=document.createElement('div');
  div.className='card';
  div.innerHTML=`<img src="${a.photos[0]}" alt="${a.name}" width="400" height="250">
  <div class="p-2"><h3>${a.name}</h3><p>${a.city} – ${a.priceRange}</p></div>`;
  return div;
}
function createPostCard(p){
  const div=document.createElement("div");
  div.className="card";
  div.innerHTML=`<img src="${p.image}" alt="${p.title}" width="400" height="250">
  <div class="p-2"><h3>${p.title}</h3><p>${p.excerpt}</p></div>`;
  return div;
}

function createTestimonialCard(t){
  const div=document.createElement('div');
  div.className='testimonial-card';
  div.innerHTML=`<img src="${t.photo}" alt="${t.name}" width="80" height="80">
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
document.addEventListener('DOMContentLoaded', async () => {
  const toursGrid=document.querySelector('.tours-grid');
  if(toursGrid){
    const tours=shuffle(await fetchData('tours')).slice(0,3);
    tours.forEach(t=>toursGrid.appendChild(createTourCard(t)));
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
  const blogGrid=document.querySelector(".blog-grid");
  if(blogGrid){
    const posts=shuffle(await fetchData("posts")).slice(0,3);
    posts.forEach(p=>blogGrid.appendChild(createPostCard(p)));
  }
  const testGrid=document.querySelector('.testimonials-grid');
  if(testGrid){
    const tests=shuffle(await fetchData('testimonials')).slice(0,3);
    tests.forEach(t=>testGrid.appendChild(createTestimonialCard(t)));
  }
  const faqAcc=document.querySelector('.faq-accordion');
  if(faqAcc){
    const faqs=await fetchData('faqs');
    faqs.forEach(f=>faqAcc.appendChild(createFAQItem(f)));
  }
});
