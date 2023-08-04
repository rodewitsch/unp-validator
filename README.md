# Модуль для валидации УНП.

Алгоритм проверки основан на описании реализации в Постановлении Министерства по налогам и сборам Республики Беларусь от 31 декабря 2003 г. №127.

Пример использования (ES module):

    import { isValid } from 'unp-validator';

    console.log(isValid('100320487')); // true

Пример использования (CommonJS):

    const UNPValidator = require('unp-validator');

    console.log(UNPValidator.isValid('100320487')); // true

Для валидации только определенного типа лиц (юридические или физические) необходимо использовать параметр only параметров валидации.

    isValid('KE7810709', { only: 'individual' });
    isValid('100320487', { only: 'legal' });