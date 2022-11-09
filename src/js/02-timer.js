import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('input');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('.value[data-days]');
const hours = document.querySelector('.value[data-hours]');
const minutes = document.querySelector('.value[data-minutes]');
const seconds = document.querySelector('.value[data-seconds]');

let pickedTime;
let timerID;
let date = new Date();

startBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= date.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
      pickedTime = selectedDates[0];      
      clearInterval(timerID);
    }
  },
};

flatpickr(input, options);

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', '');  
  countingTime();
  timerID = setInterval(countingTime, 1000); 
});

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function countingTime() {
  date = new Date();
  if (pickedTime < date.getTime()) {
    clearInterval(timerID);
    return;
  } 
  else {    
    const timerObj = convertMs(pickedTime - date.getTime());
    days.innerHTML = addLeadingZero(timerObj.days);
    hours.innerHTML = addLeadingZero(timerObj.hours);
    minutes.innerHTML = addLeadingZero(timerObj.minutes);
    seconds.innerHTML = addLeadingZero(timerObj.seconds);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
