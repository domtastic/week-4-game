$(document).ready(function() {
  var characters = {
    scorpion: {
      name: "Scorpion",
      health: 130,
      image: "./assets/image/scorpion.png",
      baseAttack: 12,
      attack: 12,
      enemyAttack: 15
    },
    kitana: {
      name: "Kitana",
      health: 210,
      image: "./assets/image/kitana.png",
      attack: 8,
      baseAttack: 8,
      enemyAttack: 5
    },
    raiden: {
      name: "Raiden",
      health: 150,
      image: "./assets/image/raiden.png",
      baseAttack: 10,
      attack: 10,
      enemyAttack: 20
    },
    goro: {
      name: "Goro",
      health: 180,
      image: "./assets/image/goro.png",
      attack: 7,
      baseAttack: 7,
      enemyAttack: 25
    }
  };
  var theChosenOne;
  var enemies = [];
  var killed = [];
  var fighting;
  var clickedSetUpGame = false;
  var allowFight = true;
  var allowAttack = false;
  // var clicked = $(this).attr("data-char");
  var soundFinishHim = new Audio("./assets/audio/Finish_Him.mp3");
  var soundScorpion = new Audio(
    "./assets/audio/Mortal_Kombat_3_Scorpion_Sound_Effect.mp3"
  );
  var soundScorpionWins = new Audio(
    "./assets/audio/MK3_Scorpion_Wins_Sound_Effect.mp3"
  );
  var soundKitana = new Audio(
    "./assets/audio/Mortal_Kombat_3_Kitana_Sound_Effect.mp3"
  );
  var soundKitanaWins = new Audio(
    "./assets/audio/MK3_Kitana_Wins_Sound_Effect.mp3"
  );
  var soundRaiden = new Audio(
    "./assets/audio/Mortal_Kombat_3_Raiden_Sound_Effect.mp3"
  );
  var soundRaidenWins = new Audio(
    "./assets/audio/MK3_Raiden_Wins_Sound_Effect.mp3"
  );
  var soundGoro = new Audio("./assets/audio/Goro_Roar_Sound_Effect.mp3");
  var soundGoroWins = new Audio(
    "./assets/audio/MK4_Goro_Wins_Sound_Effect.mp3"
  );
  var soundFatality = new Audio(
    "./assets/audio/Fatality-Mortal-Kombat-Sound-Effect.mp3"
  );
  var MKThemeSong = new Audio(
    "./assets/audio/Mortal-Kombat-Theme-Song-Original.mp3"
  );
  MKThemeSong.play();
  function winsLoss(wL) {
    $("#winLoss").html(wL);
    setTimeout(wipeOut, 3000);
  }

  function wipeOut() {
    $("#winLoss").html("");
    // reset game
    reset();
  }

  $(".btn-success").click(setUpGame);

  // setup game with the characters to be chosen

  function setUpGame() {
    if (clickedSetUpGame === false) {
      $("#afterClicked").css("visibility", "visible");

      for (var fighter in characters) {
        generateCard(fighter, characters[fighter], "chooseChar");
      }
      clickedSetUpGame = true;
      $("#begin").empty();
    }
    clickEnemyBench();
    clickChooseChar();
    clickAttack();
  }
  // input information into div and push to html

  function generateCard(fighter, fighterObj, placeToRender) {
    // create boxes/divs that the character information will be stored
    console.log(fighter);

    var charCard = $("<div>");
    var img = $("<img>");
    var spanHealth = $("<span id='h-" + fighter + "'> Health: </span>");
    // var spanAttack = $("<span id='a-" + fighter + "'> Attack: </span>");
    var spanName = $("<span id='n-" + fighter + "'></span>");
    img.attr("id", "characterImg");
    charCard.attr("id", "character");
    // charCard.attr("class", "col-md-3");

    // add info to character card - name, image, health
    img.attr("src", fighterObj.image);
    img.attr("data-char", fighter);
    charCard.append(spanName);
    charCard.append(img);
    spanName.append(fighterObj.name);
    spanHealth.append(fighterObj.health);
    // spanAttack.append(fighterObj.attack);
    charCard.append($("<br>"));
    charCard
      // .append(spanName)
      // .append(spanAttack)
      .append(spanHealth);

    $("#" + placeToRender).append(charCard);
  }
  //When the game starts, the player will choose a character by clicking on the fighter's picture.
  //add an event listener to the card
  //add an id to each character and wait for that click
  function clickChooseChar() {
    $("#chooseChar").on("click", "#characterImg", function() {
      $("#fightLine").css("visibility", "visible");
      MKThemeSong.pause();
      MKThemeSong.currentTime = 0;

      console.log($(this));
      console.log($(this).attr("data-char"));
      var clicked = $(this).attr("data-char");
      //var to hold the player we clicked on
      theChosenOne = characters[clicked];
      console.log(theChosenOne);
      if (theChosenOne.name === "Scorpion") {
        soundScorpion.play();
      } else if (theChosenOne.name === "Kitana") {
        soundKitana.play();
      } else if (theChosenOne.name === "Raiden") {
        soundRaiden.play();
      } else if (theChosenOne.name === "Goro") {
        soundGoro.play();
      }
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

      generateCard(clicked, theChosenOne, "yourChar");

      for (var i = 0; i < enemies.length; i++) {
        generateCard(enemies[i].name, enemies[i], "enemyBench");
      }
    });
  }
  //The player will fight as that character for the rest of the game.
  //var to hold the player we clicked on
  //grab the entire object, and store that object to the var
  // var to hold all our enemies
  //be an array to hold enemies

  //The player chooses an opponent by clicking on an enemy's picture.
  // event listener  on enemy bench
  function clickEnemyBench() {
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
        allowAttack = true;

        for (var char in characters) {
          if (char == clicked) {
            fighting = characters[char];
          }
        }
        console.log(fighting);
        allowFight = false;
      }
    });
  }

  // event listener - click attack - to attack fighting enemy
  function clickAttack() {
    $("#attacking").on("click", function() {
      if (allowAttack == true) {
        // BONUS ADD ATTACKING SOUNDS

        console.log(theChosenOne.health, theChosenOne.attack);

        // update all fighting & fighting.health/enemyAttack to work
        console.log(fighting.health, fighting.enemyAttack);

        //  subtract attack from enemy health
        theChosenOne.health -= fighting.enemyAttack;
        // update info on DOM/card

        // subtract enemyAttack from chosenOne health
        fighting.health -= theChosenOne.attack;
        // update info in DOM card

        // increase chosenOne attack by 5
        theChosenOne.attack += theChosenOne.baseAttack;
        $("#fighting").empty();
        $("#yourChar").empty();
        generateCard(fighting.name, fighting, "fighting");
        generateCard(theChosenOne.name, theChosenOne, "yourChar");

        // if chosenOne has only more attack to kill, say "finish him"!
        // bonus to have Finish Her Sound for Kitana - only if enough time
        // would have to add fighting.name equal to Or not equal to kitana arguments
        if (
          fighting.health > 0 &&
          fighting.health <= theChosenOne.attack &&
          theChosenOne.health > 0
        ) {
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
          allowAttack = false;
        }
        // if enemy attack >= chosenOne health, you lose
        if (theChosenOne.health <= 0) {
          allowAttack = false;
          soundFatality.play();
          winsLoss('<p class="result">Fatality!</p>');
        } else if (killed.length === 3) {
          // if killed.length = 3, you win!

          caches;
          console.log("reset working");
          console.log(theChosenOne.name);

          if (theChosenOne.name === "Scorpion") {
            soundScorpionWins.play();
          } else if (theChosenOne.name === "Kitana") {
            soundKitanaWins.play();
          } else if (theChosenOne.name === "Raiden") {
            soundRaidenWins.play();
          } else if (theChosenOne.name === "Goro") {
            soundGoroWins.play();
          }
          // you win! timer & reset
          winsLoss('<p class="result">Victorious!</p>');
        }
      }
    });
  }

  function reset() {
    clickedSetUpGame = false;
    $("#afterClicked").append("<h2>Choose your character</h2>");
    $("#afterClicked").append("<div class='row' id='chooseChar'></div>");
    $("#yourChar").empty();
    characters["scorpion"].health = 130;
    characters["scorpion"].attack = 12;
    characters["kitana"].health = 210;
    characters["kitana"].attack = 8;
    characters["raiden"].health = 150;
    characters["raiden"].attack = 10;
    characters["goro"].health = 180;
    characters["goro"].attack = 7;
    $("#fightLine").css("visibility", "hidden");
    setUpGame();
    MKThemeSong.play();

    // for (var fighter in characters) {
    //   console.log(characters[fighter].health, characters[fighter].attack);
    // }
  }
});
