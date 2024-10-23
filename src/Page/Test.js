
// function sumOfAllNumbers(n) {
//     let sum = 0;
//     for (let i = 1; i <= n; i++) {
//         if (i % 2 === 0) {
//             sum += i
//         }
//     }
//     return sum
// }



// console.log(sumOfAllNumbers(10))


// function factorial(n) {
//     let result = 1
//     for (let i = 1; i <= n; i++) {
//         result *= i
//     }
//     return result
// }
// console.log(factorial(10))


// function fibonacci(n) {
//     if (n === 0) return [0];

//     let first = 0;
//     let second = 1;
//     let sequence = [first, second]
//     for (let i = 2; i <= n; i++) {
//         let track = first + second;
//         sequence.push(track);

//         first = second;
//         second = track
//     }
//     return sequence.slice(0, n + 1);
// }
// console.log(fibonacci(5))

// function isPalindrome(str) {

//     let cleanedString = str.toLowerCase().replace(/[^\w]/g, '');
//     let reveredString = cleanedString.split('').reverse().join('');

//     if (cleanedString === reveredString) {
//         return ("True, Given string in Palindrome.")
//     } else {
//         return ("False, Given string is not Palindrome.")
//     }
// }

// console.log(isPalindrome("A man, a plan, a canal, Panama!"))

// for (let i = 1; i <= 5; i++) {
//     let result = ""
//     for (let j = 1; j <= i; j++) {
//         result += "*"
//     }
//     console.log(result)
// }


// function Vowels(str) {
//     const lowerCase = str.toLowerCase();
//     let vowelCount = 0;
//     let consonantsCount = 0;

//     for (let char of lowerCase) {
//         if (char === "a" || char === "e" || char === "i" || char === "o" || char === "u") {
//             vowelCount++;
//         } else if (char >= 'a' && char <= 'z') {
//             consonantsCount++;
//         }
//     }
//     return { "Vowels": vowelCount, "Consonants": consonantsCount }
// }

// console.log(Vowels("dineshkartik123123123123"))

// function fizzBuzz(n) {

//     for (let i = 1; i <= n; i++) {
//         let output = '';

//         if (i % 3 === 0 && i % 5 === 0) {
//             output = "FizzBuzz"
//         } else if (i % 3 === 0) {
//             output = "Fizz"
//         } else if (i % 5 === 0) {
//             output = "Buzz"
//         }else{
//             output = i.toString();
//         }
//         console.log(output)
//     }
// }

// fizzBuzz(50)

// function isPalindrome(str) {
//     let cleanedString = str.toLowerCase().replace(/[^\w]/g, '');
//     let reversedSTR = cleanedString.split('').reverse().join('')

//     if (cleanedString == reversedSTR) {
//         console.log("True, It's Palindrome")
//     }
//     else {
//         console.log("False, It's not Palindrome")
//     }
// }

// isPalindrome("NITIN")
