export function formatDate(inputDate) {
    const date = new Date(inputDate);
  
    // Get day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
  
    // Format the date as DD MMM YYYY
    const formattedDate = `${day} ${month} ${year}`;
  
    return formattedDate;
}
