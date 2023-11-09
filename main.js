import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

const data = ["zero","one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen"];
const carousel = document.getElementsByClassName("carousel")[0];
// var activeIndex = Math.floor(data.length/2);

var activeIndex;

initializeIndex();
addCards();
updateCards();


function initializeIndex() {
  const searchParams = new URLSearchParams(window.location.search);
  activeIndex = parseInt(searchParams.get('card'))
  
  if (!activeIndex || activeIndex > data.length) {
    activeIndex = 0;
    updateUrlParameter();
  }
}

function addCards() {
    
  data.forEach( (item, index) => {
      let div = document.createElement('div');
      div.classList.add("card-container");
  
      div.innerHTML = `
      <div class="card">
        ${index} ${item} 
        <a href="#" class="downloadbutton"> <i class="fa fa-download" aria-hidden="true"></i> </a>
      </div>`;

      carousel.appendChild(div);
  });

  const downloadButtons = document.getElementsByClassName("downloadbutton");

  Array.from(downloadButtons).forEach( button => {
    
    button.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(button);
      console.log(button.parentNode)

      button.parentNode.style.transition = "all 0s"
      button.parentNode.style.transform = 'scale(100%)'

      toPng( button.parentNode )
      .then(function (dataUrl) { 
        button.parentNode.style.transform = 'scale(120%)'
        button.parentNode.style.transition = "all 1s ease-in-out"

        download(dataUrl, 'card.png');
      });
  
    })
  })

}

function updateCards() {
  const length = data.length;

  const cards = document.querySelectorAll(".carousel .card");
  
  cards.forEach( (div, index) => {
      if( index < activeIndex){
          // left
          div.classList.remove("active");
          div.style.zIndex = index;
          const offset = 100+(length-index)*2;
          div.style.transform = `translateX(-${offset}%) scale(100%)`;
      }
      else if(index === activeIndex)
      {
          // middle
          div.classList.add("active");
          div.style.zIndex = 300;
          div.style.transform = `translateX(0) scale(120%)`;
      }
      else {
          //right 
          div.classList.remove("active");
          div.style.zIndex = (length - index);
          const offset = 100+(index)*2;
          div.style.transform = `translateX(${offset}%) scale(100%)`;
      }
  });
}

window.addEventListener("resize", updateCards);


document.getElementById("prevButton").addEventListener("click", (e)=>{
  e.preventDefault();

  if( activeIndex >= 0)
  {
      activeIndex--;
      updateCards();
      updateUrlParameter();
    }
  
});

document.getElementById("nextButton").addEventListener("click", (e)=>{
  e.preventDefault();

  if( activeIndex < data.length)
  {
      activeIndex++;
      updateCards();
      updateUrlParameter();
  }
  
});

function updateUrlParameter() {
  const url = new URL(window.location.href);
  url.searchParams.set("card", activeIndex);
  window.history.replaceState({}, document.title, url.toString());
}

