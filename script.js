let resetHighLight = [];
let lastClickedButton;
let coinSwap = "white";
let crossedWhitePieces = [];
let corssedBlackPieces = [];
let isCheckArr=[];
let verticalLimit = ["a", "b", "c", "d", "e", "f", "g", "h"];
let countMove=1;
// const box = document.getElementById('chess');
// box.addEventListener('dragstart', event => {
//   event.preventDefault();
// });
// box.addEventListener('drop', event => {
//   event.preventDefault();
// });
function func(btn) {
    
    console.log("----->highlight arr" + resetHighLight);
    let isClickedinHighLight = isClickedInHiglight(lastClickedButton, resetHighLight, btn);
    console.log("1. is clicked in highlight ..." + isClickedinHighLight);
    console.log("2.resetting highlight for buttons arr" + resetHighLight);
    console.log("3.Clicked btn id :: " + btn.id + " and Clicked btn value :: " + btn.value);
    //checking upward or downward.
    const bOrw = check(btn);
    console.log("Button clicked is " + bOrw);
    if (isClickedinHighLight || btn.value == "blank") {} else if (bOrw != coinSwap) {
        alert("its opponent player chance...");
    } else {
        //highlight move
        var possibleMoves = showPossibleMoves(btn.id, btn.value, bOrw);
        console.log("4.possibleMoves for clicked btn id " + btn.id + " btn value " + btn.value + "  = = " + possibleMoves);
        resetHighLight = possibleMoves;
        for (let j = 0; j < possibleMoves.length; j++) {
            var id = getIdAndValue(possibleMoves[j]);
            if(id.classList.contains('black'))id.classList.remove('black');
            else id.classList.remove('white');
            id.classList.add('glow');
        }
        lastClickedButton = getIdAndValue(btn.id);
        console.log("lastClicked button " + lastClickedButton.id);
    }
    
    const collection = document.getElementsByTagName("Button");
    const isCheckMateArr=getKingPositionFromBoard(collection);
    
    // console.log("last button clicked = "+lastClickedButton.id);
}


function getKingPositionFromBoard(collection)
{
    let king=[];
    for(let i=min_BoardCell;i<=max_BoardCell;i++)
    {
        if(collection[i].value.startsWith("king"))
        {
            let temp='';
            temp+=collection[i].value+","+collection[i].id;
            king.push(temp);
        }
    }
    if(king.length==1)
    {
        const temp=king[0].split(',');
        if(temp[0].startsWith('king-b'))alert('Black Player wins the Match!!!');
        else alert('White Player wins the Match!!!');
        restart();
    }
    console.log('king arr='+king);
}
function check(btn) {
    if (btn.value.charAt(btn.value.length - 1) == "b") {
        return "black";
    } else if (btn.value.charAt(btn.value.length - 1) == "w") {
        return "white";
    } else return "blank";
}

function isClickedInHiglight(source, arr, destination) {
    let isClickedInHiglight = false;
    let isCoinMovedOrCrossed = false;
    remoevHighlight(resetHighLight);
    // console.log("checking isClickedInHiglight source="+source+" resetHighlightArr="+arr+" destination ="+destination.id );
    for (let i = 0; i < arr.length; i++) {
        // console.log("checking "+arr[i]+" : "+source);
        if (arr[i] == destination.id) {
            isCoinMovedOrCrossed = true;
            console.log("can move " + source.id + " to destination = " + destination.id);
            document.getElementById("p").innerHTML="move "+countMove+++" source - "+source.value+" destination - "+destination.value;
            if (destination.value != "blank") crossPiece(source, destination);
            else move(source, destination);

             if(isCheck(destination))
             {
                alert("Check!!!..");
            }
            isClickedInHiglight = true;
        }
    }
    if (isCoinMovedOrCrossed) coinSwap = coinSwap == "white" ? "black" : "white";
    return isClickedInHiglight;
}

function move(sid, did) {
    console.log("sid and did value =  " + sid.value + " " + did.value);
    console.log("srcc= " + sid.id + "img and  dess = " + did.id + "img");
    var srcc = getIdAndValue(sid.id + "img");
    var dess = getIdAndValue(did.id + "img");
    console.log("srccId= " + srcc.id + " dessId = " + dess.id);
    srcc.src = path.get(did.value);
    dess.src = path.get(sid.value);
    srcc.name = sid.value;
    dess.name = did.value;
    //swapping buttin values
    let temp = sid.value;
    sid.value = did.value;
    did.value = temp;
}

function crossPiece(sid, did) {
    console.log("Crossing sid and did value =  " + sid.value + " " + did.value);
    console.log("Crossing srcc= " + sid.id + "img and  dess = " + did.id + "img");
    var srcc = getIdAndValue(sid.id + "img");
    var dess = getIdAndValue(did.id + "img");
    srcc.src = path.get("blank");
    dess.src = path.get(sid.value);
    srcc.name = "blank";
    dess.name = did.value;
    //swapping buttin values
    let temp = sid.value;
    sid.value = "blank";
    did.value = temp;
}

function remoevHighlight(arr) {
    console.log("removing highlight for array-->" + arr);
    let start='white';
    let first='a';
    while(first.charAt(0)!='i')
    {
        for(let id=1;id<=8;id++)
        {
            let curr=getIdAndValue(first+id);
            curr.classList='';
            curr.classList.add(start);
            if(id!=8)
            start=(start=='white')?'black':'white';
        }

        first = String.fromCharCode(first.charAt(0).charCodeAt(0) + 1);
    }
    resetHighLight = [];
}

function getRookMoves(slide, idInNumber, movesId, id, limit) {
    //left right..
    console.log("side rt starts " + (idInNumber + 1) + "ends at" + max_move);
    for (let i = idInNumber + 1; i <= max_move; i++) {
        if (check(getIdAndValue(slide + i)) == coinSwap) break;
        else if (verticalLimit.includes(slide) && check(getIdAndValue(slide + i)) == "blank") {
            console.log("appended right" + slide + i);
            movesId.push(slide + i);
        } else {
            movesId.push(slide + i);
            console.log("appended right" + slide + i);
            break;
        }
        if (limit == 1) break;
    }
    console.log("side left starts " + (idInNumber - 1) + "ends at" + min_move);
    for (let i = idInNumber - 1; i >= min_move; i--) {
        if (check(getIdAndValue(slide + i)) == coinSwap) break;
        else if (verticalLimit.includes(slide) && check(getIdAndValue(slide + i)) == "blank") {
            console.log("appended left" + slide + i);
            movesId.push(slide + i);
        } else {
            console.log("appended left" + slide + i);
            movesId.push(slide + i);
            break;
        }
        if (limit == 1) break;
    }
    //up down
    let characterCode = id.charAt(0).charCodeAt(0);
    console.log("starts " + (characterCode + 1) + "ends at" + alph_max_move);
    for (let i = characterCode + 1; i <= alph_max_move; i++) {
        let originalChar = String.fromCharCode(i);
        if (check(getIdAndValue(originalChar + idInNumber)) == coinSwap) break;
        else if (verticalLimit.includes(originalChar) && check(getIdAndValue(originalChar + idInNumber)) == "blank") {
            movesId.push(originalChar + idInNumber);
            console.log("appended downward" + originalChar + idInNumber);
        } else {
            movesId.push(originalChar + idInNumber);
            console.log("appended downward" + originalChar + idInNumber);
            break;
        }
        if (limit == 1) break;
    }
    console.log("upward starts " + (characterCode - 1) + "ends at " + alph_min_move);
    for (let i = characterCode - 1; i >= alph_min_move; i--) {
        let originalChar = String.fromCharCode(i);
        console.log("orginial char =" + originalChar);
        if (check(getIdAndValue(originalChar + idInNumber)) == coinSwap) break;
        else if (verticalLimit.includes(originalChar) && check(getIdAndValue(originalChar + idInNumber)) == "blank") {
            movesId.push(originalChar + idInNumber);
        } else {
            movesId.push(originalChar + idInNumber);
            break;
        }
        if (limit == 1) break;
    }
}

function showPossibleMoves(id, pieceName, blackOrWhite) {
    var movesId = []; //horizontal 123 || vertical abc
    if (blackOrWhite == "blank") console.log("nothing to show as it is clicked in blank area");
    return bothUpwardDownward(id, pieceName, movesId, blackOrWhite);
    // if(blackOrWhite=='black')
    // {
    //    return downward(id,pieceName,movesId);
    // }
    // else if(blackOrWhite=="white")
    // {
    //    return  upward(id,pieceName,movesId);
    // }
    // else {}
}

function getIdAndValue(id) {
    return document.getElementById(id);
}

function getCommonrMoves(idInNumber, slide, movesId, limit) {
    let breakAtibool = false;
    let breakAtjbool = false;
    for (let i = 1; i <= max_move; i++) {
        let j = i;
        let increId = idInNumber + i;
        let increSlide = String.fromCharCode(slide.charAt(0).charCodeAt(0) + i);
        let increIdDownId = idInNumber - j;
        let increSLideDown = String.fromCharCode(slide.charAt(0).charCodeAt(0) - j);
        console.log("checking downward rt " + increSlide + increId + " ");
        if (verticalLimit.includes(increSlide) && increId <= 8 && increId >= 1 && !breakAtibool) {
            if (check(getIdAndValue(increSlide + increId)) == coinSwap) {
                breakAtibool = true;
            } else if (check(getIdAndValue(increSlide + increId)) == "blank") {
                movesId.push(increSlide + increId);
            } else {
                movesId.push(increSlide + increId);
                breakAtibool = true;
            }
        } else {
            console.log("outside board or stopped due to breakAt i bool " + increSlide + increId);
            breakAtibool = true;
        }
        //minus
        if (verticalLimit.includes(increSLideDown) && increIdDownId <= 8 && increIdDownId >= 1 && !breakAtjbool) {
            if (check(getIdAndValue(increSLideDown + increIdDownId)) == coinSwap) {
                breakAtjbool = true;
            } else if (check(getIdAndValue(increSLideDown + increIdDownId)) == "blank") {
                movesId.push(increSLideDown + increIdDownId);
            } else {
                movesId.push(increSLideDown + increIdDownId);
                breakAtjbool = true;
            }
        } else {
            console.log("outside board or stopped due to breakAt j bool " + increSLideDown + increIdDownId);
            breakAtjbool = true;
        }
        console.log("----==----" + breakAtibool + breakAtjbool);
        if (breakAtibool && breakAtjbool) {
            console.log("breakati and j bool same exit...");
            break;
        }
        if (limit == 1) {
            console.log("king");
            break;
        }
    }
    // for secondCross /
    console.log("FOr oppsite slope ./");
    breakAtibool = false;
    breakAtjbool = false;
    for (let i = 1; i <= max_move; i++) {
        let j = i;
        let increId = idInNumber - i;
        let increSlide = String.fromCharCode(slide.charAt(0).charCodeAt(0) + i);
        let increIdDownId = idInNumber + j;
        let increSLideDown = String.fromCharCode(slide.charAt(0).charCodeAt(0) - j);
        console.log("checking opp lt " + increSlide + increId + " ");
        if (verticalLimit.includes(increSlide) && increId <= 8 && increId >= 1 && !breakAtibool) {
            if (check(getIdAndValue(increSlide + increId)) == coinSwap) {
                breakAtibool = true;
            } else if (check(getIdAndValue(increSlide + increId)) == "blank") {
                movesId.push(increSlide + increId);
            } else {
                movesId.push(increSlide + increId);
                breakAtibool = true;
            }
        } else {
            console.log("outside board or stopped due to breakAt i bool " + increSlide + increId);
            breakAtibool = true;
        }
        //minus
        if (verticalLimit.includes(increSLideDown) && increIdDownId <= 8 && increIdDownId >= 1 && !breakAtjbool) {
            if (check(getIdAndValue(increSLideDown + increIdDownId)) == coinSwap) {
                breakAtjbool = true;
            } else if (check(getIdAndValue(increSLideDown + increIdDownId)) == "blank") {
                movesId.push(increSLideDown + increIdDownId);
            } else {
                movesId.push(increSLideDown + increIdDownId);
                breakAtjbool = true;
            }
        } else {
            console.log("outside board or stopped due to breakAt j bool " + increSLideDown + increIdDownId);
            breakAtjbool = true;
        }
        console.log("----==----" + breakAtibool + breakAtjbool);
        if (breakAtibool && breakAtjbool) {
            console.log("breakati and j bool same exit...");
            break;
        }
        if (limit == 1) {
            console.log("king");
            break;
        }
    }
}
function getKnightMoves(slide,idInNumber,movesId)
{
  if(verticalLimit.includes(slide))
  {
    if(idInNumber<=max_move && idInNumber>=1 && check(getIdAndValue(slide+(idInNumber)))==coinSwap);
    else if (idInNumber <= 8 && idInNumber >= 1 && check(getIdAndValue(slide + (idInNumber ))) != coinSwap) movesId.push(slide + (idInNumber));

  }
}
function bothUpwardDownward(id, pieceName, movesId, blackOrWhite) {
    let sign = blackOrWhite == "white" ? "-" : "+";
    console.log("sign --->" + sign);
    //pawn
    if (pieceName.startsWith(pawnValue)) {
        console.log("pawn coin");
        let idInNumber = Number(id.charAt(1));
        let slide = sign == "+" ? String.fromCharCode(id.charAt(0).charCodeAt(0) + 1) : String.fromCharCode(id.charAt(0).charCodeAt(0) - 1);
        var familiarMove = getIdAndValue(slide + idInNumber);
        if (familiarMove.value == "blank")
        {
            if(id.charAt(0) == "b" || (id.charAt(0) == "g"))
            {
                let splMove = sign == "+" ? String.fromCharCode(id.charAt(0).charCodeAt(0) + 2) : String.fromCharCode(id.charAt(0).charCodeAt(0) - 2);
                var splmovebtn=getIdAndValue(splMove+idInNumber);
                // console.log("checking  splMove" + splMove + idInNumber);
                if(splmovebtn.value=="blank")
                movesId.push(splMove + idInNumber);
            }
        }
           
        if (familiarMove.value == "blank") {
            movesId.push(slide + idInNumber);
            console.log("checking " + slide + idInNumber);
        }
        if (idInNumber + 1 >= 1 && idInNumber + 1 <= 8) {
            var isBlank = getIdAndValue(slide + (idInNumber + 1)); //document.getElementById(slide+(idInNumber+1));
            if (isBlank.value != "blank" && check(isBlank) != coinSwap) {
                movesId.push(slide + (idInNumber + 1));
                console.log("checking " + slide + idInNumber);
            }
        }
        if (idInNumber - 1 >= 1 && idInNumber - 1 <= 8) {
            var isBlank = getIdAndValue(slide + (idInNumber - 1));
            if (isBlank.value != "blank" && check(isBlank) != coinSwap) {
                movesId.push(slide + (idInNumber - 1));
                console.log("checking " + slide + idInNumber);
            }
        }
        return movesId;
    } else if (pieceName.startsWith(knightValue)) {
        console.log("knight coin");
        let idInNumber = Number(id.charAt(1));
        //up and down
        let slide = String.fromCharCode(id.charAt(0).charCodeAt(0) + 2);
        console.log("checking up moves " + slide + idInNumber + " -----idinnum can vary");
        getKnightMoves(slide,idInNumber+1,movesId);
        getKnightMoves(slide,idInNumber-1,movesId);

        slide = String.fromCharCode(id.charAt(0).charCodeAt(0) - 2);
        console.log(verticalLimit.includes(slide));
        console.log("checking down moves " + slide + idInNumber + " -----idinnum can vary");
        getKnightMoves(slide,idInNumber+1,movesId);
        getKnightMoves(slide,idInNumber-1,movesId);

        //left and right
        idInNumber = Number(id.charAt(1)) + 2;
        slide = String.fromCharCode(id.charAt(0).charCodeAt(0) - 1);
        console.log("checking right moves " + slide + idInNumber + " ----slide can vary");
        getKnightMoves(slide,idInNumber,movesId);

        slide = String.fromCharCode(id.charAt(0).charCodeAt(0) + 1);
        console.log("checking right moves " + slide + idInNumber + " ----slide can vary");
        getKnightMoves(slide,idInNumber,movesId);

        idInNumber = Number(id.charAt(1)) - 2;
        slide = String.fromCharCode(id.charAt(0).charCodeAt(0) - 1);
        console.log("checking left moves " + slide + idInNumber + " 1st----slide can vary");
        getKnightMoves(slide,idInNumber,movesId);

        slide = String.fromCharCode(id.charAt(0).charCodeAt(0) + 1);
        console.log("checking left moves " + slide + idInNumber + " 2nd----slide can vary");
        getKnightMoves(slide,idInNumber,movesId);

        return movesId;
    } else if (pieceName.startsWith(rookValue)) {
        console.log("rookValue coin");
        let idInNumber = Number(id.charAt(1));
        let slide = String.fromCharCode(id.charAt(0).charCodeAt(0));
        getRookMoves(slide, idInNumber, movesId, id, 0);
    } else if (pieceName.startsWith(commonrValue)) {
        console.log("commonr coin");
        let idInNumber = Number(id.charAt(1));
        //up and down
        let slide = String.fromCharCode(id.charAt(0).charCodeAt(0));
        getCommonrMoves(idInNumber, slide, movesId, 0);
        return movesId;
    } else if (pieceName.startsWith(queenValue)) {
        console.log("queen coin");
        let idInNumber = Number(id.charAt(1));
        let slide = String.fromCharCode(id.charAt(0).charCodeAt(0));
        getRookMoves(slide, idInNumber, movesId, id, 0);
        getCommonrMoves(idInNumber, slide, movesId, 0);
    } else if (pieceName.startsWith(kingValue)) {
        console.log("king coin");
        let idInNumber = Number(id.charAt(1));
        let slide = String.fromCharCode(id.charAt(0).charCodeAt(0));
        let limit = 1;
        getRookMoves(slide, idInNumber, movesId, id, limit);
        getCommonrMoves(idInNumber, slide, movesId, limit);
        
    }
    return movesId;
}

function isCheck(destination)
{
    let isCheck=false;
    const bOrw = check(destination);
    console.log("got this final replaced btn for checking check "+destination.value+" id = "+destination.id);
    let possibleArr=bothUpwardDownward(destination.id,destination.value,isCheckArr,bOrw);
    console.log("inside is check for king [] = "+isCheckArr);

    for(let i=0;i<possibleArr.length;i++)
    {
        if(getIdAndValue(possibleArr[i]).value.startsWith("king"))isCheck=true;
    }
    isCheckArr=[];
    return isCheck;
}
function restart()
{
    console.log("dddd");
    if(confirm("Do you want to restart the Game?..."))
    {
        window.location.reload();
    }
}
function isCheckMate()
{

}
