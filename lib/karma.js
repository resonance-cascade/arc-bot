function karmaGetter (string) {
  var res = []
  res = res.concat(string.match(/\w+(?=\+{2})/))
  return res
}

exports.karmaGetter = karmaGetter
