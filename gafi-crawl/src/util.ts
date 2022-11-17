const utcEpochToDateString = (epoch: number) => {
  let temp = new Date(0)
  temp.setUTCSeconds(epoch)
  return temp.toISOString()
}

export {
  utcEpochToDateString
}