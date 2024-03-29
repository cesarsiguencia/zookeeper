const $animalForm = document.querySelector('#animal-form');
const $zookeeperForm = document.querySelector('#zookeeper-form')

const handleAnimalFormSubmit = event => {
  event.preventDefault();

  // get animal data and organize it
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const animalObject = { name, species, diet, personalityTraits };

  fetch('/api/animals', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(animalObject) 

  }).then(response => {
    if(response.ok){
      alert('Thank you for adding an animal!')
      return response.json();
    } else {
      alert('Error: ' + response.statusText + ". The animal is not properly formatted.");
    }
  })

};

const handleZookeeperFormSubmit = event => {
  event.preventDefault();

  const name = $zookeeperForm.querySelector('[name="zookeeper-name"]').value
  const age = parseInt($zookeeperForm.querySelector('[name="age"]').value)
  const favoriteAnimal = $zookeeperForm.querySelector('[name="favorite-animal"]').value;

  const zookeeperObj = { name, age, favoriteAnimal }

  fetch('api/zookeepers', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type' : 'application/json'
    },
    body: JSON.stringify(zookeeperObj)
  })
    .then(response => {
      if(response.ok){
        alert('Thank you for adding a zookeeper!')
        return response.json()
      } else {
        console.log(response, "response")
        alert('Error: ' + response.statusText + ". The zookeeper is not properly formatted.")

      }
    })
}

$animalForm.addEventListener('submit', handleAnimalFormSubmit);
$zookeeperForm.addEventListener('submit', handleZookeeperFormSubmit)
