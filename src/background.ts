const bgTest = () => {
  console.count('bgTest')
  setTimeout(bgTest, 1000 * 1)
}
bgTest()
