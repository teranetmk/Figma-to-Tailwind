$(document).ready(function() {
  $("#menu #menu-icon").click(function(e) {
    e.preventDefault();
    $("#menu").toggleClass("opened")
  })
});


setTimeout(() => {
  document.getElementById("hero").style.backgroundImage = "url('./assets/images/bg-hero.png')";
  document.getElementById("hero").style.color = "#000";  
  $(".hero-title").css("-webkit-text-fill-color", "initial")

}, 100);
    
gsap.to("#home-contact", {
  backgroundColor: '#080809',
  immediateRender: false,
  scrollTrigger: {
    trigger: "#home-contact",
    scrub: true,
    makers: true,
    start:'top bottom',
    end: '+=100%'
  }
});



gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".panels-container .panel");
if(document.documentElement.clientWidth >= 768) {
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".panels-container",
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      end: () => "+=" + document.querySelector(".panel").offsetWidth
    }
  });
}


  
gsap.to("#home-contact", {
backgroundColor: '#080809',
immediateRender: false,
scrollTrigger: {
  trigger: "#home-contact",
  scrub: true,
  start:'top bottom',
  end: '+=100%'
}
});

// star effect Wait for images to load
var frag = document.createDocumentFragment();
var textures = document.querySelectorAll(".star");
var appearMin = 0.3;
var appearMax = 0.8;

var delayMin = 2;
var delayMax = 6;

var durationMin = 0.3;
var durationMax = 1;

var numAnimations = 20;
var numStars = 100;

var stars = [];
var eases = [];

for (var i = 0; i < numAnimations; i++) {
  
  var ease = new RoughEase({ 
    template:  Linear.easeNone, 
    strength: random(1, 3), 
    points: random(50, 200)|0, 
    taper: "both", 
    randomize: true, 
    clamp: true
  });
  
  eases.push(ease);
}

// Wait for images to load
window.addEventListener("load", onLoad);

function onLoad() {
  gsap.utils.toArray('.ellipse-effect').forEach((element) => {
    for (var i = 0; i < numStars; i++) {
      stars.push(createStar(element.clientWidth, element.clientHeight));
    }
    element.appendChild(frag);
  });
}

function createStar(vw, vh) {
 
  var index = random(textures.length)|0;
  var star = textures[index].cloneNode(true);
  frag.appendChild(star);
  
  TweenLite.set(star, {
    rotation: random(360),
    xPercent: -50,
    yPercent: -vh*0.25,
    scale: 0,
    x: random(vw),
    y: random(vh),
  });
  
  var tl = new TimelineMax({ repeat: -1, yoyo: true });
   
  for (var i = 0; i < numAnimations; i++) {
    
    var ease1 = eases[random(numAnimations)|0];
    var ease2 = eases[random(numAnimations)|0];
    
    var alpha = random(0.7, 1);
    var scale = random(0.15, 0.4);
    
    var appear = "+=" + random(appearMin, appearMax);
    var delay = "+=" + random(delayMin, delayMax);  
    var duration1 = random(durationMin, durationMax);
    var duration2 = random(durationMin, durationMax);   
    
    tl.to(star, duration1, { autoAlpha: alpha, scale: scale, ease: ease1 }, delay)
      .to(star, duration2, { autoAlpha: 0, scale: 0, ease: ease2 }, appear)
  }
    
  tl.progress(random(1));
  
  return {
    element: star,
    timeline: tl
  };
}

function random(min, max) {
  if (max == null) { max = min; min = 0; }
  if (min > max) { var tmp = min; min = max; max = tmp; }
  return min + (max - min) * Math.random();
}


// Text Effect
window.addEventListener("scroll", scrollEventListener);
   function scrollEventListener() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop; 

    document.querySelectorAll(".text-effect").forEach(current => {
      const currentOffset = scrollY - current.offsetTop + document.documentElement.clientHeight - 200;

      if(currentOffset > 0 || currentOffset < 300) {
        current.style.webkitTextFillColor = 'rgba(0,0,0,' + ( currentOffset/300)  + ')';
      }
      
     });
     
}