export default function ehPrimo(number) {
    number = Number(number);
    
    if (number == 2) return true;
    if (number == 0 || number == 1 || number % 2 == 0) return false;
    for (let aux = 3; aux <= Math.floor(Math.sqrt(number)); aux += 2)
        if (number % aux == 0) return false;
    return true;
}