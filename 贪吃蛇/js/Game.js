function Game(){
    //行数
    this.row = 20;
    //列数
    this.col = 20;
    //分数
    this.score = 0;
    //初始化节点
    this.init();
    //实例化蛇类
    this.snake = new Snake();
    //初始化食物
    this.food = new Food(this);
    //执行定时器任务
    this.start();
    //键盘的事件监听
    this.bindEvent();

}
Game.prototype.init = function(){
    this.dom = document.createElement("table");
    var tr,td;
    //遍历行和列上树
    for(var i = 0; i < this.row; i++){
        //遍历行，创建节点上树
        tr = document.createElement("tr");
        for(var j = 0; j < this.col; j++){
            //遍历列，创建节点上树
            td = document.createElement("td");    
            //追加到trtd
            tr.appendChild(td);
        }
        //追加节点上树
        this.dom.appendChild(tr);
    }
    
    //表格上树
    document.getElementById("app").appendChild(this.dom);
};
Game.prototype.clear = function() {
    //遍历表格，擦除画布
    for(var i = 0; i < this.row; i++){
        for(var j = 0; j < this.col; j++){
            this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].style.background = "transparent";
            this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML = "";
        }
    }
};
//设置颜色的方法
Game.prototype.setColor = function(row, col, color){
    //让表格的第几行，第几列设置什么颜色
    this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.background = color; 
};
//渲染食物
Game.prototype.setHtml = function(row, col, html){
    this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].innerHTML = html;
};
//设置键盘的事件监听
Game.prototype.bindEvent = function(){
    var self = this;
    //键盘事件
    document.onkeydown = function(event){
        switch(event.keyCode){
            //按下左键
            case 37:
                //先进行判断，如果当前的方式是向右移动，此时我们不能按左键
                if(self.snake.direction == "R")
                    break;
                self.snake.changeDirection("L");
                break;
            //按下上键
            case 38:
                //先进行判断，如果当前的方式是向下移动，此时我们不能按上键
                if(self.snake.direction == "D")
                    break;
                self.snake.changeDirection("U");
                break;
            //按下右键
            case 39:
                //先进行判断，如果当前的方式是向左移动，此时我们不能按右键
                if(self.snake.direction == "L")
                    break;
                self.snake.changeDirection("R");
                break;
            //按下下键
            case 40:
                //先进行判断，如果当前的方式是向上移动，此时我们不能按下键
                if(self.snake.direction == "U")
                    break;
                self.snake.changeDirection("D");
                break;

        }
    }
};
Game.prototype.start = function(){
    //帧编号
    this.f = 0;
    this.timer = setInterval(function() {
        //定时器里面的核心就是游戏的渲染本质，清屏-更新-渲染
        game.f++;score
        document.getElementById("f").innerHTML = "帧编号："+game.f;
        //渲染分数
        document.getElementById("score").innerHTML = "分数："+game.score;
        //清楚屏幕
        game.clear();
        //蛇的更新速度，当蛇边长的时候没速度要加快
        var during = game.snake.body.length < 30 ? 30 - game.snake.body.length : 1;
        //蛇的更新
        game.f % during == 0 && game.snake.update();
        //蛇的渲染
        game.snake.render();
        //渲染食物
        game.food.render();
    }, 20)
};