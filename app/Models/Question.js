

export default class Question {
  constructor({ type, question, correct_answer, incorrect_answers }) {
    this.type = type
    this.question = question
    this.correctAnswer = correct_answer
    this.choices = ["True", "False"]
    if (this.type == "multiple") {
      this.choices = incorrect_answers
      let randIndex = Math.floor(Math.random() * 3)
      this.choices.splice(randIndex, 0, this.correctAnswer)
    }
  }
  get Template() {
    //choices.indexOf(c) == 0 ? 'primary' : choices.indexOf(c) == 1 ? 'secondary' : choices.indexOf(c) == 2 ? 'alert' : 'warning'
    let template = `<h1 class="text-center mt-5">${this.question}</h1>
    <div class="d-flex flex-column">
    `
    this.choices.forEach(c => {
      template += `<button class="btn my-2 ${this.choices.indexOf(c) == 0 ? 'btn-primary' : this.choices.indexOf(c) == 1 ? 'btn-secondary' : this.choices.indexOf(c) == 2 ? 'btn-warning' : 'btn-warning'}" onclick="app.questionsController.checkAnswer('${c}')">${c}</button>`
    });
    template += `</div>
    `
    return template
  }
}