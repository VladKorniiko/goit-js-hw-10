import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate;
let timerInterval;

const button = document.querySelector('button[data-start]');
button.addEventListener('click', () => {
  button.classList.remove('button-enabled');
  flatPickerInput.classList.add('datetime-picker-disabled');
  flatPickerInput.disabled = true;
  if (timerInterval) clearInterval(timerInterval);
  startCounter();
  timerInterval = setInterval(startCounter, 1000);
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = Date.now();
    userSelectedDate = selectedDates[0];
    if (selectedDates[0].getTime() <= currentTime) {
      button.classList.remove('button-enabled');
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topRight',
        messageColor: '#fff',
        backgroundColor: 'red',
      });

      return;
    }
    button.classList.add('button-enabled');
  },
};

const flatPickerInput = document.querySelector('#datetime-picker');
flatpickr(flatPickerInput, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function startCounter(event) {
  const daysValue = document.querySelector('.value[data-days]');
  const hoursValue = document.querySelector('.value[data-hours]');
  const minutesValue = document.querySelector('.value[data-minutes]');
  const secondsValue = document.querySelector('.value[data-seconds]');
  const remainingTime = userSelectedDate - Date.now();

  const { days, hours, minutes, seconds } = convertMs(remainingTime);
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);

  if (remainingTime <= 0) {
    flatPickerInput.classList.remove('datetime-picker-disabled');
    flatPickerInput.disabled = false;
    clearInterval(timerInterval);
    daysValue.textContent = '00';
    hoursValue.textContent = '00';
    minutesValue.textContent = '00';
    secondsValue.textContent = '00';
    return;
  }
}
