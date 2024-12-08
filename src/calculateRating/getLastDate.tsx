function getLastDayOfMonth(year:number, month:number) {
    // Create a Date object for the 1st of the next month
    const date = new Date(year, month + 1, 0);
    return date.getDate(); // Return the day of the month
  }
  
  
  function getLastDatesForYear(year:number) {
    return Array.from({ length: 12 }, (_, index) => {
      const lastDay = getLastDayOfMonth(year, index);
      return new Date(year, index, lastDay).toISOString().slice(0, 10); // Format as YYYY-MM-DD
    });
  }

  export default getLastDatesForYear