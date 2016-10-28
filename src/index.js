/**
 * Type of capitalization: human, camel, snake, kebab, upper or pascal.
 * @typedef {('human'|'camel'|'snake'|'kebab'|'upper'|'pascal')} CapitalizationType
 */


const config = {
  human: {
    capitalize_first: false,
    capitalize_rest: false,
    capitalize_all: false,
    delimiter: ' '
  },
  camel: {
    capitalize_first: false,
    capitalize_rest: true,
    capitalize_all: false,
    delimiter: ''
  },
  snake: {
    capitalize_first: false,
    capitalize_rest: false,
    capitalize_all: false,
    delimiter: '_'
  },
  kebab: {
    capitalize_first: false,
    capitalize_rest: false,
    capitalize_all: false,
    delimiter: '-'
  },
  upper: {
    capitalize_first: false,
    capitalize_rest: false,
    capitalize_all: true,
    delimiter: '_'
  },
  pascal: {
    capitalize_first: true,
    capitalize_rest: true,
    capitalize_all: false,
    delimiter: ''
  }
};


/**
 * Converts string from one type of capitalization to another.
 * @name convertCase
 * @param {string} input
 * @param {CapitalizationType} source_case
 * @param {CapitalizationType} target_case
 * @returns {string}
 */
export default function (input = '', source_case, target_case) {
  if (
    typeof input === 'string' &&
    isValidCase(source_case) &&
    isValidCase(target_case)
  ) {
    const characters_data = parseCharacters(input, source_case);
    return convertCharacters(characters_data, target_case);
  }
  return input;
}


/**
 * Breaks input into array containing metadata about each character.
 * @param {string} input
 * @param {string} source_case
 * @returns {Array.<Object>}
 */
function parseCharacters (input, source_case) {
  const case_config = config[source_case];
  const result = [];
  const delimiter_data = {type: 'delimiter', value: null};

  input.split('').forEach((character, i) => {
    if (character === case_config.delimiter) {
      result.push(delimiter_data);
    } else {
      if (i !== 0 && case_config.delimiter === '' && isUppercase(character)) {
        result.push(delimiter_data)
      }
      result.push({type: 'character', value: character})
    }
  });

  return result;
}


/**
 * Converts character to proper case, based on situation.
 * @param {string} character
 * @param {Array.<Object>} characters_data
 * @param {Object} case_config
 * @param {number} i
 * @returns {string}
 * @ignore
 */
function convertCharacter (character, characters_data, case_config, i) {
  return shouldUppercase(case_config, i, characters_data)
    ? character.toUpperCase()
    : character.toLowerCase();
}


/**
 * Changes characters to proper case and returns converted string.
 * @param {Array.<Object>} characters_data
 * @param {string} target_case
 * @returns {string}
 * @ignore
 */
function convertCharacters (characters_data, target_case) {
  const result = [];
  const case_config = config[target_case];

  characters_data.forEach(({type, value}, i) => {
    const converted_character = (type === 'delimiter')
      ? case_config.delimiter
      : convertCharacter(value, characters_data, case_config, i);
    result.push(converted_character);
  });

  return result.join('');
}


/**
 * Determines whether character should be converted to uppercase.
 * @param {Object} case_config
 * @param {number} i
 * @param {Object} characters_data
 * @returns {boolean}
 * @ignore
 */
function shouldUppercase (case_config, i, characters_data) {
  return (
    case_config.capitalize_all ||
    (case_config.capitalize_first && i === 0) ||
    (followsDelimiter(i, characters_data) && case_config.capitalize_rest)
  );
}


/**
 * Returns `true` if symbol follows delimiter.
 * @param {number} i
 * @param {Object} characters_data
 * @returns {boolean}
 * @ignore
 */
function followsDelimiter (i, characters_data) {
  return (
    i > 0 && characters_data[i - 1].type === 'delimiter'
  );
}


/**
 * Returns `true` if provided case is valid.
 * @param {string} capitalization_case
 * @returns {boolean}
 * @ignore
 */
function isValidCase (capitalization_case) {
  return Object.keys(config).indexOf(capitalization_case) !== -1;
}

/**
 * Determines whether character is uppercase.
 * @param {string} character
 * @returns {boolean}
 * @ignore
 */
function isUppercase (character) {
  const lowercase = character.toLowerCase();
  const uppercase = character.toUpperCase();

  return lowercase !== uppercase && character === uppercase;
}
