
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

async function display(){
  try{
    const customer = await getCustomer(1);
    if (customer.isGold) {
      console.log('Customer: ', customer);
      const topMovies = await getTopMovies()
      console.log('Top movies: ', topMovies);
      const {email, movies} = await sendEmail(customer.email, topMovies)
      console.log('Email sent...', {email, movies})
    }
  } catch(err){
    console.log('Error', err.message);
  }
}

display()

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ 
        id, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);  
  })
 
}

function getTopMovies() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  })
}

function sendEmail(email, movies,) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({email, movies});
    }, 4000);
  })
}