export default class StringUtils {
    static formatNumberShortFormat(number, showUnit = true) {
        if (!number) return number;

        let value;
        let unit;

        if (number >= 1000000000) {
            value = number / 1000000000;
            unit = 'G';
        } else if (number >= 1000000) {
            value = number / 1000000;
            unit = 'M';
        } else if (number >= 1000) {
            value = number / 1000;
            unit = 'K';
        } else {
            value = number;
            unit = '';
        }

        return `${Math.round(value)}${showUnit ? unit : ''}`;
    }

    static formatNumberWithSeparator(amount, separator = ' ') {
        if (!amount) return amount;

        return amount.toString()
            .split('').reverse().join('')
            .match(/.{1,3}/g)
            .join(separator)
            .split('')
            .reverse()
            .join('');
    }
}
