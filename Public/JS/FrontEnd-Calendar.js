class Calendar {
  constructor() {
    this.date = new Date();
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.monthIndex = this.date.getMonth();
    this.hours = this.date.getHours();
    this.day = this.date.getDay();
  }

  getMinutes() {
    return this.date.getMinutes() < 10 ? `0${this.date.getMinutes()}` : this.date.getMinutes();
  }

  getHour() {
    if (this.hours === 0 || this.hours === 24) return (this.hours = 12);
    if (this.hours >= 13 && this.getMinutes() >= 0) {
      return (this.hours = this.hours - 12);
    }
    return this.hours;
  }

  getTimeOfDay() {
    return this.date.getHours() < 12 ? (this.timeOfDay = `AM`) : (this.timeOfDay = `PM`);
  }

  getDay() {
    return this.date.getDate();
  }

  getGreeting() {
    if (this.hours < 12) {
      return (this.greeting = `Good Morning`);
    }
    if (this.hours >= 12 && this.hours < 18) {
      return (this.greeting = `Good Afternoon`);
    }
    if (this.hours >= 18) {
      return (this.greeting = `Good Evening`);
    }
  }

  getWeekday() {
    return this.days[this.day];
  }

  getMonth() {
    return this.months[this.monthIndex];
  }

  getMonthIndex() {
    return this.date.getMonth();
  }

  getYear() {
    return this.date.getFullYear();
  }

  monthRemaining() {
    let days;
    const currentMonth = this.getMonth();
    const currentDay = this.getDay();
    if (
      currentMonth === `January` ||
      currentMonth === `March` ||
      currentMonth === `May` ||
      currentMonth === `July` ||
      currentMonth === `August` ||
      currentMonth === `October` ||
      currentMonth === `December`
    ) {
      days = 31;
    }
    if (currentMonth === `April` || currentMonth === `June` || currentMonth === `September` || currentMonth === `November`) {
      days = 30;
    }
    if (currentMonth === `February`) {
      (this.getYear() % 4 === 0 && !(this.getYear() % 100 === 0)) || this.getYear() % 400 === 0 ? (days = 29) : (days = 28);
    }
    const remaining = days - currentDay;
    const percentage = remaining / days;
    const calculatedPercent = (100 * percentage).toFixed(0);
    return `${calculatedPercent}%`;
  }

  goBackAMonth(month, year, dayClass, currentDayClass, unusedDayClass) {
    let selectedMonth = this.months[month];
    this.makeCalendar(month, selectedMonth, year, dayClass, currentDayClass, unusedDayClass);
  }

  goForwardAMonth(month, year, dayClass, currentDayClass, unusedDayClass) {
    let selectedMonth = this.months[month];
    this.makeCalendar(month, selectedMonth, year, dayClass, currentDayClass, unusedDayClass);
  }

  _selectDay(monthDays, singleDay) {
    monthDays.forEach((day, i) => {
      day.classList.remove('bill-calendar-container__calendar-container__calendar__days__single-day--current-day');
    });
    singleDay.classList.add('bill-calendar-container__calendar-container__calendar__days__single-day--current-day');
  }

  _setupMonth(monthIndex, monthDays, year, dayClass, currentDayClass, unusedDayClass) {
    let dayStart = 1;
    const days = document.querySelectorAll(dayClass);
    const startDate = new Date(year, monthIndex, 1);
    let manipulatedDate = new Date(year, monthIndex, 1);
    let currentDate = new Date(year, monthIndex, this.getDay());
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    let dayIndex = startDate.getDay();
    days.forEach((d) => (d.textContent = ''));
    if ((dayStart && dayIndex) || (dayStart && dayIndex === 0)) {
      while (dayStart <= monthDays) {
        if (dayStart === 1) {
          if (days[dayIndex]) {
            days[dayIndex].textContent = dayStart;
            dayStart++;
            dayIndex++;
          }
        }
        manipulatedDate = new Date(manipulatedDate.setDate(manipulatedDate.getDate() + 1));
        if (days[dayIndex]) {
          days[dayIndex].textContent = manipulatedDate.getDate();
        }
        dayStart++;
        dayIndex++;
      }
    }
    let currentDayIndex = currentDate.getDate();
    days.forEach((d, i) => {
      d.classList.remove(currentDayClass);
      if (d.textContent === '') d.classList.add(unusedDayClass);
      if (d.textContent !== '') {
        if (d.classList.contains('un-used-day')) d.classList.remove('un-used-day');
        if (Number(d.textContent) === currentDayIndex - 1) {
          d.classList.add(currentDayClass);
        }
        d.addEventListener('click', (e) => {
          this._selectDay(days, d);
        });
      }
    });
  }

  _getDaysInMonth(month, value, year) {
    if (month === `January` || month === `March` || month === `May` || month === `July` || month === `August` || month === `October` || month === `December`) {
      value = 31;
    }
    if (month === `April` || month === `June` || month === `September` || month === `November`) {
      value = 30;
    }
    if (month === `February`) {
      (year % 4 === 0 && !(year % 100 === 0)) || year % 400 === 0 ? (value = 29) : (value = 28);
    }
    return value;
  }

  makeCalendar(monthIndex, month, year, dayClass, currentDayClass, unusedDayClass) {
    console.log(`MAKING CALENDAR`);
    let daysInMonth;
    daysInMonth = this._getDaysInMonth(month, daysInMonth, year);
    const billMonth = document.querySelector('.bill-calendar-container__calendar-container__calendar__header__title');
    if (billMonth) billMonth.textContent = `${month} | ${year}`;
    this._setupMonth(monthIndex, daysInMonth, year, dayClass, currentDayClass, unusedDayClass);
  }
}

export const myCalendar = new Calendar(Date.now());
