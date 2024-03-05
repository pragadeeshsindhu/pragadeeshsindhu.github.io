const min_move = 1;
const max_move = 8;

const alph_min_move=97;
const alph_max_move=104;

const min_BoardCell=0;
const max_BoardCell=63;



const knightValue="knight";
const pawnValue="pawn";
const bishopValue="bishop";
const rookValue="rook";
const commonrValue="commonr";
const queenValue="queen";
const kingValue="king";

const path=new Map([
    ["pawn-b","./coins/pawn-b.svg"],
    ["pawn-w","./coins/pawn-w.svg"],
    ["blank","./coins/blank.png"],
    ["knight-b","./coins/knight-b.svg"],
    ["knight-w","./coins/knight-w.svg"],
    ["bishop-w","./coins/bishop-w.svg"],
    ["bishop-b","./coins/bishop-b.svg"],
    ["commonr-w","./coins/commonr-w.svg"],
    ["commonr-b","./coins/commonr-b.svg"],
    ["queen-b","./coins/queen-b.svg"],
    ["queen-w","./coins/queen-w.svg"],
    ["rook-w","./coins/rook-w.svg"],
    ["rook-b","./coins/rook-b.svg"],
    ["king-b","./coins/king-b.svg"],
    ["king-w","./coins/king-w.svg"],
]);
