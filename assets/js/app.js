$(function(){
    window.delayFire = 0;
    window.score = 0;
    var addEnemy = function(){
      var pX = Math.floor(Math.random()*(80-20+1)+20),
          pY = Math.floor(Math.random()*(65-20+1)+20),
          enemy = document.createElement('div');
          enemy = $(enemy).addClass('enemy');
          enemy.css({left: pX+"%", top: pY+"%"})
      $('body').append(enemy);
    }
    var updateScore = function(i){
      window.score += i;
      $('#score').text(window.score);
    }
    addEnemy();
    $(document).on('keydown', function(e){
      var screen = $('body'),
          screenWidth = screen.outerWidth(),
          screenHeight = screen.outerHeight(),
          ship = $(document).find('#ship'),
          pX = parseInt(ship.css('left')),
          pY = parseInt(ship.css('top')),
          speedMove = 10;
      var btn = e.keyCode;
      //Change X Position
      if (btn === 37 || btn === 39) {
        if (btn === 37 && pX > 50) {
          ship.css({left: (pX - speedMove)+"px"});
        } else if (btn === 39 && pX < (screenWidth - 50)) {
          ship.css({left: (pX + speedMove)+"px"});
        }
      }
      //Change Y Position
      if (btn === 38 || btn === 40) {
        if (btn === 38 && pY > 50) {
          ship.css({top: (pY - speedMove)+"px"});
        } else if (btn === 40 && pY < (screenHeight - 50)) {
          ship.css({top: (pY + speedMove)+"px"});
        }
      }
      //Fire Button
      if (btn === 32) {
        var time = new Date().getTime(),
            time = parseInt(time/1000);
        if (time > delayFire) {
          var fire = document.createElement('div');
          fire = $(fire).addClass('fire');
          fire.css({top: (pY-48)+"px", left: pX+"px"})
          screen.append(fire);
          var fireY = parseInt(fire.css('top')),
              fireW = parseInt(fire.css("width")),
              fireX = parseInt(fire.css("left")) - (fireW/2);
          var enemy = $('.enemy');
              enemyY = parseInt(enemy.css("top")) + parseInt(enemy.css("height")),
              enemyW = parseInt(enemy.css("width")),
              enemyX = parseInt(enemy.css("left")) - (enemyW/2);
          var movefire = setInterval(function(){
            if (fireY > 40) {
              if (fireY < enemyY && (fireX+fireW) < (enemyX+enemyW) && fireX > enemyX) {
                enemy.remove();
                fire.remove();
                clearInterval(movefire);
                addEnemy();
                updateScore(50)
              } else {
                fire.css({top: (fireY-50)+"px"});
                fireY = fireY-50;
              }
            } else {
              fire.remove();
              clearInterval(movefire);
            }
          },100);
        }
        delayFire = time;
      }
    });
    console.log('%cSimple Game By Anas RAR\nAssets Get On FaLiLV The Animals in Screen II','color:blue;font-weight:700');
    console.log('%cUse HTML, CSS and Javascript','color:blue;font-weight:700');
  });
