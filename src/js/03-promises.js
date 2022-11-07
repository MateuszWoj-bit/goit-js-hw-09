import Notiflix from 'notiflix';

const delays = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const form = document.querySelector('.form');

let i = 0;
let delVal;
let stepVal;

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    delVal = Number.parseInt(delays.value);
    stepVal = Number.parseInt(step.value);

    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delVal + stepVal * i);
  });
};

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  delVal = Number.parseInt(delays.value);
  stepVal = Number.parseInt(step.value);
  for (i; i < Number.parseInt(amount.value); i += 1) {
    createPromise(i + 1, delVal + stepVal * i)
      .then(fulfill => Notiflix.Notify.success(fulfill))
      .catch(reject => Notiflix.Notify.failure(reject));
  }
  i = 0;
}
