import ehPrimo from "./ehPrimo";

export default function factorization(number, quotients = true, exponential = false) {
    let dividers = [];
    let divider = 2;
    while (number > 1) {
        if (number % divider == 0) {
            if (quotients) dividers.push([number, divider]);
            else dividers.push(divider);
            number /= divider;
        } else {
            if (divider != 2) {
                do divider += 2;
                while (!ehPrimo(divider));
            } else
                divider = 3;
        }
    }

    if (!quotients && exponential)
        return dividers.reduce((cache, number) => {
            if (cache.length == 0 || cache[cache.length - 1][0] != number)
                cache.push([number, 1]);
            else
                cache[cache.length - 1][1] += 1;
            return cache;
        }, []);
    else return dividers;
}