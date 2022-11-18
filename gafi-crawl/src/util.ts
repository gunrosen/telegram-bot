const fs= require("fs")

const utcEpochToDateString = (epoch: number) => {
  let temp = new Date(0)
  temp.setUTCSeconds(epoch)
  return temp.toISOString()
}

const ellipsisStr = (str: string, length: number): string => {
  if (length < 10 || str.length < length) return str
  return str.slice(0, length - 3) + "..."
}

const ellipsis = (str : string) :string => {
  return ellipsisStr(str, 50)
}

const writeToFile = (filePath: string, contents: string) =>{
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
    fs.writeFile(filePath, contents, function (err: any) {
      if (err) return console.log(err);
      console.log('Write to file - Done');
    });
  } else {
    fs.writeFile(filePath, contents, function (err: any) {
      if (err) return console.log(err);
      console.log('Write to file - Done');
    });
  }
}

export {
  utcEpochToDateString,
  ellipsis,
  writeToFile
}