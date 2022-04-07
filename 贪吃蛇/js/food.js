function Food(gameSnake){
    var self = this;
    //食物的位置
    //下面的do-while循环语句作用是先创建一个row和col，然后判断这个row和col是否在蛇的身上
    do{
        this.row = parseInt(Math.random() * gameSnake.row);
        this.col = parseInt(Math.random() * gameSnake.col);
    }while((function(){
        //遍历蛇的row和col，然后和Food新随机出来的row和col来进行判断，是否重合
        for(var i = 0; i < gameSnake.snake.body.length; i++){
            if(gameSnake.snake.body[i].row == self.row || gameSnake.snake.body[i].col == self.col){
                return true;
            }
        }
        return false;
    })());
    console.log(this.row, this.col);
}

Food.prototype.render = function() {
    game.setHtml(this.row, this.col, "♥");
}