function karmaGetter (string) {
  return string.match(/\w+(?=\+{2})/)
}

exports.karmaGetter = karmaGetter
