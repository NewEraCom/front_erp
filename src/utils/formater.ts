
function number(value: number | undefined | null): string {
    if (value === 0) return '0';
    if (!value) return '-';
    if (isNaN(value)) return '-';

    const roundedValue = Math.round(value * 100) / 100;

    const formattedValue = roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return formattedValue;
}

function date(props: string | null): string {
    if (props === null) return 'Aucune date.';
    const date = new Date(props);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function time(timeValue: string | null) {
    if (timeValue === null) return 'Aucune date.';
    return timeValue.slice(0, 5);
}

function startOfDay(dateString) {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0); // Reset hours, minutes, seconds, and milliseconds to 0
    return date;
}

function month(props: string | null): string {
    if (props === null) return 'Aucune date.';
    const date = new Date(props);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${year}`;
}

function dateTime(props: string | null): string {
    if (props === null) return 'Aucune date.';

    // Create a Date object from the input string
    const inputDate = new Date(props);

    // Extract year, month, day, hours, and minutes from the Date object
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(inputDate.getDate()).padStart(2, '0');
    const hours = String(inputDate.getHours()).padStart(2, '0');
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');

    // Construct the formatted date string
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

function phoneNumber(phoneNumber) {
    // Remove non-numeric characters from the phone number
    const cleanedNumber = phoneNumber?.replace(/\D/g, '');

    // Check if the cleaned number has 10 digits
    if (cleanedNumber?.length === 10) {
        // Apply the desired formatting
        const formattedNumber = cleanedNumber.replace(
            /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
            '$1 $2 $3 $4 $5'
        );
        return formattedNumber;
    } else {
        // If the number doesn't have 10 digits, return the original input
        return phoneNumber;
    }
}


export const formater = {
    number,
    date,
    time,
    month,
    dateTime,
    phoneNumber,
    startOfDay,
};