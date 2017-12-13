$(document).ready(function() {
  $("#add-item-input").click(function() {
    $(".form-fields").append(
      '<div class="field inline"><input type="text" name="item" placeholder="What do you mean? African or European swallow?"><button class="circular ui icon mini button delete-field" type="button"><i class="icon minus"></i></button></div>'
    );
  });

  $(".form-fields").on("click", ".delete-field", function(e) {
    e.preventDefault();
    $(this)
      .parent("div")
      .remove();
  });
});
