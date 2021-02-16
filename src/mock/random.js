function checkType (val) {
  let result = Object.prototype.toString.call(val)
  result = result.slice(8, -1)
  return result
}

export function randomArr (arr, n, m) {
  /* 
    example:
        [1,2,3,4,5,6]
  */
  if (checkType(arr) !== 'Array') return
  let count
  if (m) {
    if (n > m) return arr
    count = Math.ceil(Math.random() * (m - n + 1)) + (m - n)
  } else {
    count = n
  }
  const newArr = []
  const cloneArr = [...arr]
  while (newArr.length < count) {
    const i = Math.floor(Math.random() * cloneArr.length)
    newArr.push(cloneArr[i])
    cloneArr.splice(i, 1)
  }
  return newArr
}

export function randomOneObjToMoreObj (obj, n, m) {
  /* 
    example:
        {
          name: 'randomArr(arr, n[, m])',
          ...
        }
  */
  let count
  if (m) {
    if (n > m) return
    count = Math.ceil(Math.random() * (m - n + 1)) + (m - n)
  } else {
    count = n
  }
  const goods2 = []
  let newObj = {}
  const keys = Object.keys(obj)
  while (goods2.length < count) {
    keys.forEach(item => newObj[item] = eval(obj[item]))
    goods2.push(newObj)
    newObj = {}
  }
  return goods2
}

export function randomObj (obj, n, m) {
  /* 
    example:
        {
          name: 'xxx',
          age: 123,
          ...
        }
  */
  if (checkType(obj) !== 'Object') return
  if (n > m) return obj
  let newObj
  let keys = Object.keys(obj)
  keys =  randomArr(keys, n, m)
  keys.forEach(key => {
    newObj[key] = obj[key]
  })
  return newObj
}

export function randomPhone () {
  let phone = '1'
  const arr = []
  for(let i = 0; i < 10; i++) {
    arr[i] = Math.floor(Math.random() * 10)
  }
  let after = arr.join().replace(/,/g, '')
  return phone + after // example: 12972442142
}
