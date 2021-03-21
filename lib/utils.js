exports.sample = (arr, count) => {
  const result = new Array(count)
  let len = arr.length
  const taken = new Array(len)

  while (count--) {
    const x = Math.floor(Math.random() * len)
    result[count] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }

  return result
}
