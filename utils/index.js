// This function will check the word in content
// - if length of the word more than len input (default is 50), it will return true
// - else it will return false
export function hasWordNoSpace(string, len = 50) {
  const regex = `\\b\\w{${len},}\\b`;
  return string.match(new RegExp(regex, 'g'));
}

// This function will replace multiple whitespace and '\n' to single whitespace
export function prepareString(string) {
  return string.replace(/  +/g, ' ').replace(/\n+/g, ' ');
}

// Estimate array length range
// Return [minLen, maxLen] 
// - 'minLen' is the length of input content divide the spliting length
// - 'maxLen' is mumber of word of input content
const estimatedArrayLengthRange = (value, len = 50) => {
  const wordArray = value.split(' ');
  let minLen = parseInt(value.length / len);
  if (value.length % len > 0) {
    minLen += 1;
  }
  const maxLen = wordArray.length;
  return [minLen, maxLen];
};

// Split string with estimated array length
// Return array | null
// - 'null' when inputing word of content wrong (plus indicator and word > 50)
// - array have length more than zero when estimated array length is correct. And length array is less than zero when estimated array length is incorrect.
const splitStringWithEstimatedArrayLen = (
  wordArray,
  estimatedArrayLen,
  lenToSplit = 50
) => {
  let count = 1;
  let maxWordLenAccepted = lenToSplit; 
  const result = [];
  const getIndicator = () => {
    const indicator = `${count}/${estimatedArrayLen}`;
    maxWordLenAccepted = lenToSplit - indicator.length - 1; // maxWordLenAccepted will be lenToSplit minus length of indicator and whitespace.
    return indicator;
  };

  let stringResult = getIndicator();

  const lenWordArray = wordArray.length;

  for (let i = 0; i < lenWordArray; i++) {
    const word = wordArray[i];

    // Return null if the length word and indicator more than the spliting length ( > 50) or input word is incorrect.
    if (word.length > maxWordLenAccepted) {
      return null;
    }

    const stringTemp = `${stringResult} ${word}`;

    if (stringTemp.length > lenToSplit) {
      result.push(stringResult);
      count += 1;

      // Return array with length is zero. That means estimatedArrayLen is incorrect.
      // And the next estimatedArrayLen will set at parrent.
      if (count > estimatedArrayLen) {
        return [];
      }

      stringResult = `${getIndicator()} ${word}`;
    } else {
      stringResult = `${stringResult} ${word}`;
    }

    if (lenWordArray - 1 === i) {
      result.push(stringResult);
    }
  }
  // 'result' will be returned with length more thanzero. That means estimatedArrayLen is correct.
  // And break out of the parrent loop.
  return result;
};

// This is main function to split the string.
// - Return 'null' when there is an inputing word is incorrect.
// - And 'array' is the expected result.
export function splitString(value, len = 50) {
  if(hasWordNoSpace(value)) return null;
  // If length of the input value is less then len (50), it will be return value.
  const indicatorDefault = '1/1 ';
  if (value.length <= len - indicatorDefault.length) {
    return [`${indicatorDefault}${value}`];
  }

  let result = [];
  const [minLen, maxLen] = estimatedArrayLengthRange(value, len);
  const words = value.split(' ');

  for (let i = minLen; i <= maxLen; i++) {
    const resultTemp = splitStringWithEstimatedArrayLen(words, i, len);
    if (resultTemp && resultTemp.length > 0) {
      return resultTemp;
    }
    result = resultTemp;
  }

  return result;
}
