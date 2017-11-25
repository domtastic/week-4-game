$(document).ready(function() {
  var character = {
    name: ["Scorpion", "Kitana", "Raiden", "Goro"],
    health: [120, 100, 150, 180]
    // image: ?, ?, ?
  };

  var charCard;

  $(".btn-success").click(setUpGame);
  // setup game with the characters to be chosen
  function setUpGame() {
    // create boxes/divs that the character information will be stored

    for (var i = 0; i < character.name.length; i++) {
      charCard = $("</div>");
      charCard.addClass("character");
      // add info to character card - name, image, health

      //   show in html
      $("#chooseChar").append(charCard);
    }

    // $.each(character.name, function(key, value) {
    //   console.log(character.name + character.health);
    // });
  }
  // input information into div and push to html
});
