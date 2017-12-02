$(document).ready(function() {
  var characters = {
    scorpion: {
      name: "Scorpion",
      health: 120,
      image: "./assets/image/scorpion.png",
      attack: 30,
      enemyAttack: 15
    },
    kitana: {
      name: "Kitana",
      health: 100,
      image: "./assets/image/kitana.png",
      attack: 15,
      enemyAttack: 7
    },
    raiden: {
      name: "Raiden",
      health: 150,
      image: "./assets/image/raiden.png",
      attack: 25,
      enemyAttack: 4
    },
    goro: {
      name: "Goro",
      health: 150,
      image: "./assets/image/goro.png",
      attack: 25,
      enemyAttack: 4
    }
  };
  var theChosenOne;
  var enemies = [];
  var killed = [];
  var fighting = [];
  var clickedSetUpGame = false;
  var allowFight = true;
  var clicked = $(this).attr("data-char");
  var soundFinishHim = new Audio("./assets/audio/Finish_Him.mp3");

  $(".btn-success").click(setUpGame);

  // setup game with the characters to be chosen

  function setUpGame() {
    if (clickedSetUpGame === false) {
      for (var fighter in characters) {
        generateCard(fighter, characters[fighter], "chooseChar");
      }
      clickedSetUpGame = true;
    }
  }
  // input information into div and push to html

  function generateCard(fighter, fighterObj, placeToRender) {
    // create boxes/divs that the character information will be stored
    console.log(fighter);

    var charCard = $("<div>");
    var img = $("<img>");
    img.attr("id", "characterImg");
    charCard.attr("id", "character");
    charCard.attr("class", "col-md-3");

    // add info to character card - name, image, health
    img.attr("src", fighterObj.image);
    img.attr("data-char", fighter);
    charCard.append(img);
    charCard.append(
      "<br>" +
        "name: " +
        fighterObj.name +
        " Attack: " +
        fighterObj.attack +
        " Heath: " +
        fighterObj.health
    );

    $("#" + placeToRender).append(charCard);
  }
  //When the game starts, the player will choose a character by clicking on the fighter's picture.
  //add an event listener to the card
  //add an id to each character and wait for that click
  $("#chooseChar").on("click", "#characterImg", function() {
    console.log($(this));
    console.log($(this).attr("data-char"));
    var clicked = $(this).attr("data-char");
    //var to hold the player we clicked on
    theChosenOne = characters[clicked];
    console.log(theChosenOne);
    //loop over the object
    //if the key != clicked
    //push into array
    for (var char in characters) {
      if (char != clicked) {
        //be an array to hold enemies
        enemies.push(characters[char]);
      }
    }
    console.log(enemies);

    $("#afterClicked").empty();
    $("#begin").empty();
    generateCard(clicked, theChosenOne, "yourChar");

    for (var i = 0; i < enemies.length; i++) {
      generateCard(enemies[i].name, enemies[i], "enemyBench");
    }
  });
  //The player will fight as that character for the rest of the game.
  //var to hold the player we clicked on
  //grab the entire object, and store that object to the var
  // var to hold all our enemies
  //be an array to hold enemies

  //The player chooses an opponent by clicking on an enemy's picture.
  // event listener  on enemy bench
  $("#enemyBench").on("click", "#characterImg", function() {
    if (allowFight == true) {
      console.log($(this));
      console.log(
        $(this)
          .attr("data-char")
          .toLowerCase()
      );
      var finder = $(this).attr("data-char");
      var clicked = $(this)
        .attr("data-char")
        .toLowerCase();
      //remove them from the enemies to attack
      for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].name == finder) {
          enemies.splice(i, 1);
        }
      }
      //remove enemy
      $("#enemyBench").empty();
      for (var i = 0; i < enemies.length; i++) {
        generateCard(enemies[i].name, enemies[i], "enemyBench");
      }
      //display clicked enemy in fighting
      generateCard(clicked, characters[clicked], "fighting");

      for (var char in characters) {
        if (char == clicked) {
          fighting.push(characters[char]);
        }
      }
      console.log(fighting);
      allowFight = false;
      // BONUS - Toggle visibility of attack button
    }
  });

  // event listener - click attack - to attack fighting enemy
  $("#attacking").click(function() {
    // BONUS ADD ATTACKING SOUNDS

    console.log(theChosenOne.health + " " + theChosenOne.attack);

    // FIGHTING.ANYTHING NOT WORKING -- how do I access the object information?
    // I think it has something to do with "this" or the clicked var
    // update all fighting & fighting.health/enemyAttack to work
    console.log(fighting.health + " " + fighting.enemyAttack);

    //  subtract attack from enemy health
    theChosenOne.health -= fighting.enemyAttack;
    // update info on DOM/card

    // subtract enemyAttack from chosenOne health
    fighting.health -= theChosenOne.attack;
    // update info in DOM card

    // increase chosenOne attack by 5
    theChosenOne.attack += 5;

    // if chosenOne has only more attack to kill, say "finish him"!
    // bonus to have Finish Her Sound for Kitana - only if enough time
    // would have to add fighting.name equal to Or not equal to kitana arguments
    if (fighting.health > 0 && fighting.health <= theChosenOne.attack) {
      soundFinishHim.play();
    }
    // chosenOne attack to kill enemy health, enemy health = 0, turn allow fight to true
    if (fighting.health <= 0) {
      // add to killed array
      killed.push(fighting);
      // remove char card from DOM
      $("#fighting").empty();
      // turn back on allow fight
      allowFight = true;
    }
    // if enemy attack >= chosenOne health, you lose
    if (theChosenOne.health <= 0) {
      // game over -- timer
      // reset?
    }
    // if killed.length = 3, you win!
    if (killed.length === 3) {
      // you win! -- timer
      // reset?
    }
  });
});
