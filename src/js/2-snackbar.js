import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
form.addEventListener('submit', createPromise);

const delayInput = document.querySelector('input[name="delay"]');

function createPromise(event) {
  event.preventDefault();

  const checkedRadio = document.querySelector('input[name="state"]:checked');
  const delay = delayInput.value;

  const promise = new Promise((resolve, reject) => {
    if (checkedRadio.value === 'fulfilled') {
      resolve(`✅ Fulfilled promise in ${delay}ms`);
    } else if (checkedRadio.value === 'rejected') {
      reject(`❌ Rejected promise in ${delay}ms`);
    }
  });

  promise
    .then(result => {
      setTimeout(() => {
        iziToast.show({
          message: `${result}`,
          position: 'topRight',
          messageColor: '#fff',
          backgroundColor: 'green',
        });
      }, delay);
    })
    .catch(err => {
      setTimeout(() => {
        iziToast.show({
          message: `${err}`,
          position: 'topRight',
          messageColor: '#fff',
          backgroundColor: 'red',
        });
      }, delay);
    });

  form.reset();
}
