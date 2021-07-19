
export default class NotificationService {
  static async correctAnswer(title = 'You did it!', text = "Congrats!") {
    try {
      const res = await Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: 'secondary',
        confirmButtonText: 'Next Question'
      })
    } catch (error) {
      console.error(error)
    }
  }
  static async incorrectAnswer(title = 'Oh, no!') {
    try {
      const res = await Swal.fire({
        title: title,
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: 'secondary',
        confirmButtonText: 'Try Again'
      })
    } catch (error) {
      console.error(error)
    }
  }

  static toast(title = 'Default Toasty', display = 'success') {
    Swal.fire({
      title: title,
      icon: display,
      position: 'bottom-right',
      timer: 2000,
      toast: true,
      showConfirmButton: false
    })
  }
}