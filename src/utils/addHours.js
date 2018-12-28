function addHours(date, mins) {
    date.setTime(date.getTime() + (mins * 60 * 60 * 1000))
    return date
}

module.exports = addHours
