var layout = (id, sampleAnswer, question) => `
      <div class="container">
  <div class="render center black-text text-darken-3">
    <form action="/questions/${id}" method="post">
      <div class="input-field black-text text-darken-3">
        <input required placeholder="${sampleAnswer}" id="answer" name="answer" type="text" class="validate">
        <label class="black-text text-darken-3" for="answer">${question}</label>
      </div>
      
      <button class="btn blue waves-effect waves-light center center-text" type="submit" name="action">Next 
    <i class="material-icons right">send</i>
  </button>
    </form>
  </div>
</div>`;

module.exports = layout;
