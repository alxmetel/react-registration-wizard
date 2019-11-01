const validate = (value, rules) => {
  let isValid = true;
  
  for (let rule in rules) {
  
    switch (rule) {
        case 'minLength': isValid = isValid && minLengthValidator(value, rules[rule]); break;

        case 'maxLength': isValid = isValid && maxLengthValidator(value, rules[rule]); break;
        
        case 'isRequired': isValid = isValid && requiredValidator(value); break;

        case 'isEmail': isValid = isValid && emailValidator(value); break;

        case 'permittedDomains': isValid = isValid && domainsValidator(value); break;

        case 'nonCyrillic': isValid = isValid && nonCyrillicValidator(value); break;

        case 'onlyNumbers': isValid = isValid && numbersValidator(value); break;

        case 'isChecked': isValid = isValid && checkboxValidator(value); break;

        case 'maskIsFilled': isValid = isValid && phoneMaskValidator(value); break;
        
      	default: isValid = true;
    }

  }
  
  return isValid;
}


/**
 * minLength Val
 * @param  value 
 * @param  minLength
 * @return          
 */
const minLengthValidator = (value, minLength) => {
  return value.length >= minLength;
}

/**
 * maxLength Val
 * @param  value 
 * @param  minLength
 * @return          
 */
const maxLengthValidator = (value, maxLength) => {
  return value.length <= maxLength;
}


/**
 * Check to confirm that feild is required
 * 
 * @param  value 
 * @return       
 */
const requiredValidator = value => {
  return value.toString().trim() !== '';	
}


/**
 * Email validation
 * 
 * @param value
 * @return 
 */
const emailValidator = value => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
}


/**
 * Email Domains validation
 * 
 * @param value
 * @return 
 * 
 * Ban domains:
 * drweb.ru
 * kaspersky.ru
 * kaspersky.ua
 * mail.ru;
 * vk.com
 * ok.com
 * yandex.ua
 * yandex.ru
 * auto.ru
 * kinopoisk.ru
 */
const domainsValidator = value => {
  var re = /@(?!drweb\.ru)(?!kaspersky\.ru)(?!kaspersky\.ua)(?!mail\.ru)(?!vk\.com)(?!ok\.com)(?!yandex\.ua)(?!yandex\.ru)(?!auto\.ru)(?!kinopoisk\.ru)/;
  return re.test(String(value).toLowerCase());
}

// Non-Cyrillic validation
const nonCyrillicValidator = value => {
  var re = /[а-яА-ЯЁё]/;
  return !re.test(String(value).toLowerCase());
}


/**
 * Numbers validation
 * 
 * @param value
 * @return 
 */
const numbersValidator = value => {
  var re = /^[0-9]+$/;
  return re.test(String(value).toLowerCase());
}


/**
 * Phone Mask validation
 * 
 * @param value
 * @return 
 */
const phoneMaskValidator = value => {
  var re = /^[^_]+$/;
  return re.test(String(value).toLowerCase());
}


/**
 * Checkbox validation
 * 
 * @param value
 * @return 
 */
const checkboxValidator = value => {
  return value;
}

export default validate;