const debounce = (cb: Function, delay: number) => {
  let timer: number

  return (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(cb, delay, e)
  }
}

export default debounce
