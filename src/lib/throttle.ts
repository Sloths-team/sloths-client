const throttle = (cb: Function, delay: number) => {
  let timer: number | null = null

  return (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) return

    timer = setTimeout(
      () => {
        cb(e)
        timer = null
      },
      delay,
      e
    )
  }
}

export default throttle
