'use strict';





//*************************GLOBAL VARIABLES/IMPORTS*************************
let votingRounds = 25;
 
let productArray = [];




// ********************************DOM***********************
let imgContainer = document.getElementById('container');
let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');
let imgThree = document.getElementById('image-three');

// let resultsBtn = document.getElementById('show-results-btn');
// let resultsList = document.getElementById('display-results-list');


// ****** Local Storage PT 2***************
// STEP3: Get it out of local storage

let retrievedProduct = localStorage.getItem('product');
// console.log('Retrieved Products >>>',retrievedProduct);

//  Step4: PARSE my data for my code to reuse
let parsedProduct = JSON.parse(retrievedProduct);
// console.log('Parsed Producys', parsedProduct);


//*************************CONSTRUCTORS*************************
function Product(name, fileExtension = 'jpg'){
  this.productName = name;
  this.image = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  productArray.push(this);
}
// *********Step3: LOCAL STORAGE ************
if(retrievedProduct){
  productArray = parsedProduct;
} else{
  new Product('bag');
  new Product('sweep', 'png');
  new Product('banana');
  new Product('bathroom');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('banana');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('water-can');
  new Product('wine-glass');
  // console.log(productArray);

}






// *************************HELPER FUNCTION********************
function getRandomIndex(){
  // got from w3resource.com
  return Math.floor(Math.random()* productArray.length);
}

function renderImgs(){

  let totalIndex = [];
  
  while(totalIndex.length < 3){
    let randomNumber = getRandomIndex();
    if(!totalIndex.includes(randomNumber)){
      totalIndex.push(randomNumber);
    }
  }
  // console.log(totalIndex);

  let productOneIndex = totalIndex.pop();
  let productTwoIndex = totalIndex.pop();
  let productThreeIndex = totalIndex.pop();




  imgOne.src = productArray[productOneIndex].image;
  imgOne.alt = productArray[productOneIndex].productName;
  productArray[productOneIndex].views++;

  imgTwo.src = productArray[productTwoIndex].image;
  imgTwo.alt = productArray[productTwoIndex].productName;
  productArray[productTwoIndex].views++;

  imgThree.src = productArray[productThreeIndex].image;
  imgThree.alt = productArray[productThreeIndex].productName;
  productArray[productThreeIndex].views++;

  

}

renderImgs();



function renderChart() {

  let ctx = document.getElementById('myChart');
  // console.log(ctx);

  let productNames = [];
  let productVotes = [];

  let productViews = [];


  for (let i = 0; i < productArray.length; i++) {
    productNames.push(productArray[i].productName);
    productVotes.push(productArray[i].clicks);
    productViews.push(productArray[i].views);
  }

  let myChartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        backgroundColor: [
          'red'
        ],
        borderColor: [
          'red'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: productViews,
        backgroundColor: [
          'blue'
        ],
        borderColor: [
          'blue'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 50
            }
          }
        }
      }
    }
  };

  const myChart = new Chart(ctx, myChartObj);

}









//*************************EVENT LISTENERS*************************
function handleClick(event){
  votingRounds--;
  
  let imgClicked = event.target.alt;

  for(let i = 0; i < productArray.length; i++){
    if(imgClicked === productArray[i].productName){
      productArray[i].clicks++;
    }
  }
  // rerender 3 new imgs
  renderImgs();
  
  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleClick);
    renderChart();

    // *****LOCAL STORAGE BEGINS****
    // Step:1 Stringify our data before it goes into local storage
    let stringifiedProduct = JSON.stringify(productArray);

    // console.log('Stringified Product >>>', stringifiedProduct);

    // Step:2 Set it up in local storage
    localStorage.setItem('product', stringifiedProduct);

    return;
  }

}


// function handleShowResults(){
//   if(votingRounds === 0){
//     for(let i = 0; i < productArray.length; i++){
//       let li = document.createElement('li');

//       li.textContent = `${productArray[i].productName} was viewed ${productArray[i].views} and clicked on ${productArray[i].clicks} times.`;
//       resultsList.appendChild(li);
//     }
//   }
// }

//*************************EVENT HANDLERS*************************
imgContainer.addEventListener('click', handleClick);
// resultsBtn.addEventListener('click', handleShowResults);







































//*************************GLOBAL VARIABLES/IMPORTS*************************


//*************************CONSTRUCTORS*************************



//*************************CONSTRUCTOR METHODS*************************



//*************************FUNCTIONS*************************



//*************************EVENT LISTENERS*************************



//*************************EVENT HANDLERS*************************



//*************************FUNCTION CALLS*************************


