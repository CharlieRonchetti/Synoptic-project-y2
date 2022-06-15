function alertSOS() {
    let confirmed = confirm("Are you sure you need to alert SOS?")

    if(confirmed) {
        alert("our SOS services have been alerted of your position and are on the way!")
    } else {
        alert("SOS call has been cancelled")
    }
}