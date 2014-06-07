function getMinuteIndex(date){
      minute = date.getMinutes();
      return Math.floor(minute/5);
    }

function getDateLabels(month, year) {
        labels = [];
        days = getDaysInMonth(month,year);
        for(var i in days) {
          day = days[i];
          labels.push(day.getDate()+"."+day.getMonth()+"."+day.getFullYear());
        }
        return labels;
    }

function getNumberOfDays(year, month) {
    var isLeap = ((year % 4) == 0 && ((year % 100) != 0 || (year % 400) == 0));
    return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}


function getDaysInMonth(month, year) {
     var date = new Date(year, month, 1);
     var days = [];
     while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
     }
     return days;
}
