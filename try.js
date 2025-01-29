function timer(time) {
    const hours = parseInt(time / 3600);
    const secondLeft = time % 3600;
    const minutes = parseInt(secondLeft / 60);
    const second = secondLeft % 60;
    return `${hours +' hours ' + minutes + ' minutes ' + second + ' second '}`
}
console.log(timer(4200));

