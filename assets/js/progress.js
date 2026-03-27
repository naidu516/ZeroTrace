// SAVE SCORE
function saveScore(points){
    let score = localStorage.getItem("score") || 0;
    score = parseInt(score) + points;
    localStorage.setItem("score", score);
}

// GET SCORE
function getScore(){
    return localStorage.getItem("score") || 0;
}