export const debounce = (fn: Function, t: number) => {
    let timer: ReturnType<typeof setTimeout>;

    function debounced(...args: any[]) {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), t);
    }

    debounced.clear = function () {
        clearTimeout(timer);
    };

    return debounced;
}