const API_URL = "https://fhu-faculty-api.netlify.app/fhu-faculty.json";

const likes = [];


let response = await fetch(API_URL);

let people = await response.json();

people.forEach(item => {
  item.likeBool = false;
  console.log(people)
})

const carousel = document.getElementsByClassName("carousel")[0];
// var activeIndex = Math.floor(data.length/2);

let activeIndex;

initializeIndex();
addCards();
updateCards();


function initializeIndex() {
  const searchParams = new URLSearchParams(window.location.search);
  activeIndex = parseInt(searchParams.get('card'))
  
  if (!activeIndex || activeIndex > people.length) {
    activeIndex = 0;
    updateUrlParameter();
  }
}



async function addCards() {
  let currentURL = window.location.href;

  people.forEach( (person) => {
      let div = document.createElement('div');
      div.classList.add("card-container");

      
  
      div.innerHTML = `
      <div class="card">
      <div class="p-1 h-cardHeight w-72 mx-auto rounded-lg border-black border-2 bg-gradient-to-r from-[#8E354D] via-[#357ABD] to-[#000080] ">
      <div class="bg-gradient-to-r from-[#D9A3A6] via-[#EFD4D4] to-[#B57D80] px-2 flex flex-row justify-between  h-8 rounded-lg border-black border-2 ">
      <div class="flex flex-row items-center">
          <p class=" font-bold name">${person.NickName}</p>
      </div>

      <div class="flex flex-row gap-1 items-center " >
              <p class="font-medium italic name ">${person.FirstName}</p>
              <p class="font-medium italic name">${person.LastName}</p>
              <p>${person.EducationLevel}</p>
      </div>
      </div>
      
      <div class="mt-2 h-48 flex  flex-row rounded-lg border-black border-2 relative bg-black w-full justify-center">
          <img class=" w-full object-cover rounded-lg" src="https://fhu-faculty-api.netlify.app/images/headshots/${person.Image} " alt="${person.FirstName} ${person.LastName}">
          <p class="rounded-full border border-black w-9 p-1 text-center absolute top-0 right-0 m-2 font-bold text-lg bg-gradient-to-br from-yellow-300 via-yellow-200 to-yellow-300">${person.Cost}</p>
          <p class="m-1 text-xs italic self-start w-50 flex-row border absolute  border-black rounded-lg px-3 bg-gradient-to-br from-[#F8D7D7]  via-[#FFFFFF] to-[#F8D7D7] top-0 left-0">${person.Rank}</p>
          <div class="font-medium bg-gradient-to-r from-[#F8D7D7] via-[#F8D7D7] to-[#E3ABAB] self-end items-center flex p-1 w-full  flex-row border absolute  border-black rounded-lg gap-2 justify-between mx-3 px-3 bg-white">
              <div class="justify-between flex flex-row gap-1 text-sm ">
                  <p class="italic ">${person.FieldofStudy}</p>
                  <p>-</p>
                  <p class="italic ">${person.Type}</p>
              </div>

              <p class="font-medium">HP ${person.HitPoints}</p>
          </div>
      </div>

      <div class=" bg-gradient-to-r from-[#ADD8E6]  via-[#FFFFFF] to-[#ADD8E6] rounded-lg border-black border-2">

      <div class=" h-44 flex flex-col  justify-center text-notSmall p-2">
  
          <p class="text-sm text-center font-semibold m-1"> - Damage - ${person.DamageType} - </p>

          <div class="flex flex-row justify-between">
              <div class="flex flex-col text-left">
                  <p class=""><strong>${person.Attack1}</strong></p>
                  <p class="text-sm italic leading-tight">This is an attack and it does something really cool.</p>
              </div>
              
              <p class=" border rounded-full border-black w-10 self-center bg-gradient-to-br from-yellow-300 via-yellow-200 to-yellow-300 text-center m-2 font-medium p-1">${person.Attack1Damage}</p>
              
          </div>

          <div class="flex flex-row justify-between mt-2">
          <div class="flex flex-col text-left">
              <p class=""><strong>${person.Attack2}</strong></p>
              <p class="text-sm italic">This is an attack and it does something really cool.</p>
          </div>
          
          <p class=" border rounded-full border-black w-10 self-center bg-gradient-to-br from-yellow-300 via-yellow-200 to-yellow-300 text-center m-2 font-medium p-1">${person.Attack2Damage}</p>
          
      </div>
          
      </div>
      

      </div>

      <div class = "navBar" aria-hidden="true">
        <a href="#" ><i id="" class="heartBtn fa fa-regular fa-heart"></i> </a>
        <!-- <a href="#" ><i id="" class="fa fa-regular fa-heart"></i> </a> -->
        <a href="#" > <i id="" class="downloadBtn fa fa-download" aria-hidden="true"></i> </a>
        <a href="mailto:?subject=Check%20out%20this%20lit%20trading%20card!&body=Check%20out%20this%20lit%20card%20here:%0D%0A%0D%0A${currentURL}%0D%0A%0D%0AThis%20is%20going%20to%20be%20so%20lit!%0D%0A%0D%0A"><i  id="" class="shareBtn fa fa-solid fa-envelope"></i> </a>
      </div>`;

      carousel.appendChild(div);

      if (person.NickName.length >= 15 || (person.FirstName.length + person.LastName.length + person.EducationLevel.length) >= 20) {
        const nameElements = div.querySelectorAll('.name'); // Select all elements with the "name" class in the current card
        nameElements.forEach(nameElement => {
          nameElement.classList.add('text-xs');
        });
    }
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
  const length = 14;

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

let heartBtns = document.querySelectorAll('.heartBtn')

heartBtns.forEach(heartBtn => {
  heartBtn.addEventListener('click', function(){
    
    if(people[activeIndex].likeBool){
      people[activeIndex].likeBool = false;
      heartBtn.classList.remove("fa-solid");
      heartBtn.classList.add("fa-regular");
      heartBtn.classList.remove("pinkBg")
    }
    else{
      people[activeIndex].likeBool = true;
    
      heartBtn.classList.remove("fa-regular");
      
      heartBtn.classList.add("fa-solid");

      heartBtn.classList.add("pinkBg");

    }

  })
  })

let shareBtn = document.querySelectorAll('.shareBtn')

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

  if( activeIndex < people.length)
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

