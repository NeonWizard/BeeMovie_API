let app = require("express")(),
    cors = require("cors"),
    fs = require("fs")

app.use(cors())

let read_file = function() {
  let data = []

  let lines = fs.readFileSync("raw.txt", { encoding: "utf-8" }).split("\n")

  let section = ""
  let skipnext = false

  for (let line of lines) {
    if (skipnext) {
      skipnext = false
      continue
    }

    if (line == "") {
      data.push(section)
      section = ""
      skipnext = true
      continue
    }

    if (section) { section += " " }

    section += line
  }

  return data
}

lines = read_file()

console.log(lines[0]);
console.log("\n" + lines[1] + "\n");

app.get("/line", function(req, res) {
  let line = lines[Math.floor(Math.random() * lines.length)]
  res.json({ "line": line })
})

app.listen(3054, function() {
  console.log("Listening, bag boi")
})
