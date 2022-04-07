function Snake(){
    //蛇的初始化身体
    this.body = [
        {"row":3, "col":5},
        {"row":3, "col":4},
        {"row":3, "col":3},
        {"row":3, "col":2}
    ];
    //信号量，设置的运行方向
    this.direction = "R";
    //即将改变的方向，目的是为了防止出现原地调头的情况
    this.willDirection = "R";
}
//蛇的运行
Snake.prototype.update = function() {
    //让当前的direction接受以下willDirection
    this.direction = this.willDirection;
    switch(this.direction){
        case "R":
            //向右移动
            this.body.unshift({"row":this.body[0].row, "col":this.body[0].col + 1});
            break;  
        case "D":
            //向下移动
            this.body.unshift({"row":this.body[0].row + 1, "col":this.body[0].col});
            break;
        case "L":
            //向左移动
            this.body.unshift({"row":this.body[0].row, "col":this.body[0].col - 1});
            break;
        case "U":
            //向上移动
            this.body.unshift({"row":this.body[0].row - 1, "col":this.body[0].col});
            break;
    }
    //死亡的判断，超出了表格边缘的部分  
    if(this.body[0].col > game.col-1 || this.body[0].row > game.row - 1 || this.body[0].col < 0 || this.body[0].row < 0){ 
        
        alert("游戏结束！您当前的得分为："+game.score+"分。");
        this.body.shift();
        clearInterval(game.timer);
        
    }
    //自己撞到了自己的时候，也会判定死亡
    for(var i = 1; i <this.body.length; i++){
        //如何能够判断死亡，也就是当前的蛇的头部与身体的某一部分的col和row完全重合的时候
        if (this.body[0].col == this.body[i].col && this.body[0].row == this.body[i].row){
            alert("游戏结束！您当前的得分为："+game.score+"分。");
            clearInterval(game.timer);
        }
    }
    //蛇吃食物
    //判断如果当前的蛇的头部没有和食物进行重合，就代表此时没有吃到食物，此时就进行尾部删除，如果重合了就代表吃到了，此时我们不进行尾部删除。
    if(this.body[0].row == game.food.row &&  this.body[0].col == game.food.col){
        //此时的情况只有头部增加了，尾部没有删除
        //创建新的食物
        game.food = new Food(game);
        //加分数
        game.score++;
        //让帧编号归0，因为蛇会蹿一下
        game.f = 0;
    }else{        
        this.body.pop();
    }
    
};
//蛇的方向改变，防止的是在一次渲染之前会出现调头的情况
Snake.prototype.changeDirection = function(d){
    this.willDirection = d;

}
Snake.prototype.render = function(){
    // 蛇头的渲染
    game.setColor(this.body[0].row, this.body[0].col, '-webkit-radial-gradient(center center , pink, red)');
    //蛇身的渲染
    for(var i = 1; i < this.body.length; i++){
        game.setColor(this.body[i].row, this.body[i].col, '-webkit-radial-gradient(center center , orange, red)');
    }
}