
// Fibonacci Challenge

const fib = (num) => {
    let arr = [0, 1];

    for(let i = 2; i <= num; i++){
        let res1 = arr[i - 1];
        let res2 = arr[i - 2];
        arr.push(res1 + res2);
    }
    return arr[num]
};


const fibRec = (num) => {
    if (num < 2) {
        return num
    };
    return fibRec(num - 1) + fibRec(num - 2)
};

























// const frequencies = (arr) => {
//     return arr.reduce((obj, el) => {
//         obj[el] ? ++obj[el] : obj[el] = 1;
//         return obj
//     }, {})
// }





























// const multipleCheck = (num, factor) => {
//     return num % factor === 0 ? true : false
// }

// const fizzBuzz = (num) => {
//     let finalAnswer = []

//     for(let i = 1; i < num; i++) {
//         switch (true) {
//             case multipleCheck(i, 15):
//                 finalAnswer.push('fizzbuzz');
//                 break;
//             case multipleCheck(i, 5):
//                 finalAnswer.push('buzz');
//                 break;
//             case multipleCheck(i, 3):
//                 finalAnswer.push('fizz');
//                 break;
//             default:
//                 finalAnswer.push(i)
//         }
//     }
//     return finalAnswer.join(', ')
// }




// let answer = []
// for (let i = 1; i < num + 1; i++) {
//     
// return answer.join(',')



// const newObj = (str) => {
//     let obj = {}
//     for (let i in str) {
//         console.log(i)
//         let letter = str.charAt(i).toLowerCase()
//         if (obj[letter]) {
//             obj[letter] += 1
//         } else {
//             obj[letter] = 1
//         }
//     }
//     return obj
// }



// const anagram = (str1, str2) => {
//     let a = newObj(str1)
//     let b = newObj(str2)
//     if (Object.keys(a).length != Object.keys(b).length) {
//         return false
//     }
//     for (let item in a) {
//         if (a[item] !== b[item]) {
//             return false
//         } 
//     }
//     cleanUpInput(str1)
//     return true
    
// }



// const cleanUpInput = (inputStr) => {
//     return inputStr.toLowerCase().replace(/[^a-z\d]/g, '').split('').sort().join('')
    
// }


// const anagram = (str1, str2) => {
//     let first = cleanUpInput(str1)
//     let second = cleanUpInput(str2)
//     return first === second ? true : false
// }







export default frequencies;




































//finding max number of consecutive 0 in binary

//function test(a) {
// let arr = string.toString(2).split('');
// let count = 0;
// let arr1 = []
// console.log(arr)

// if (!arr.includes('0')) {
//     return 0
// } else {
//     for (let i = 1; i < arr.length; i++) {
//         if (arr[arr.length - 1] == 0) {
//             arr.pop()
//         }
//     }
// }

// for (let j = 0; j < arr.length; j++) {
//     switch (arr[j]) {
//         case '0':
//             console.log('test1')
//             count = count + 1
//             break;
//         case '1':
//             console.log('test2')
//             arr1.push(count)
//             count = 0
//             break;
//         default:
//             console.log('nothing works')
//     }
// }
// return Math.max(...arr1)
// }

// const howManyMovies = (movies, flightLength) => {
//     console.log(movies)
//     let lengthMin = flightLength * 60
//     let twoMovies = movies.map(movie => movie.runtime)
//     for (let i = 0; i < twoMovies.length; i++) {

//     }


//     console.log(twoMovies)

// }
