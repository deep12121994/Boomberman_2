var bomberManBoard=[
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""]
];
    

function genrateTable(){
var body = document.getElementsByTagName("body")[0];
var table = document.createElement("table");
var tblBody = document.createElement("tbody");
for(var i=0;i<9;i++)
{
    var row = document.createElement("tr");
    for(var j=0;j<9;j++){
        var cell = document.createElement("td");
        cell.setAttribute("onClick","clickOnCell(this,"+i+","+j+")");
        cell.setAttribute("onmousedown","rightclick("+i+","+j+")");
        
        row.appendChild(cell);
    }
    tblBody.appendChild(row);
}

table.appendChild(tblBody);
table.setAttribute("border", "2");
body.appendChild(table);
}

var l=0;
while(l!=10){
  let a=Math.floor(Math.random()*9); // returns a random integer from 0 to 9
  let b=Math.floor(Math.random()*9);
  if(bomberManBoard[a][b]!=="1"){
    bomberManBoard[a][b]="1";
    console.log("board:"+bomberManBoard[a][b]);
    l++;
  }
}

var count=0;
var bcount=0;
function selectCell(k,j)
{
    if(j-1>=0){
        if(!document.querySelectorAll("td")[k*9+(j-1)].classList.contains("green"))
            document.querySelectorAll("td")[k*9+(j-1)].classList.add("coral");
        if(bomberManBoard[k][j-1]==="1")
            bcount++;
    }
    if(!document.querySelectorAll("td")[k*9+j].classList.contains("green"))
        document.querySelectorAll("td")[k*9+j].classList.add("coral");
    if(bomberManBoard[k][j]==="1")
            bcount++;
    if(j+1<9){
        if(!document.querySelectorAll("td")[k*9+(j+1)].classList.contains("green"))
            document.querySelectorAll("td")[k*9+(j+1)].classList.add("coral");
        if(bomberManBoard[k][j+1]==="1")
            bcount++;
    }

}

function rightclick(i,j) {
    var e = window.event;
    if (e.which == 3)
    { 
        //alert("hi");
        if(bomberManBoard[i][j]==="1"){
            document.querySelectorAll("td")[i*9+j].innerHTML="!";
        }
    }
}

function clickOnCell(element,i,j){
    bcount = 0;
    if(bomberManBoard[i][j]==="1"){
        for(var p=0;p<9;p++){
            for(var q=0;q<9;q++){
            // for highlight all cell that contains bomb
            if(bomberManBoard[p][q]==="1"){
                document.querySelectorAll("td")[q+p*9].classList.add("red");
                console.log("q:"+ [q+p*9]);
                document.querySelectorAll("td")[q+p*9].innerHTML="💣";
            }
            document.querySelectorAll("td")[q+p*9].setAttribute("onclick","");
            }
        }
        document.querySelectorAll('button')[0].classList.remove();
       document.getElementById("winner").innerHTML="<strong>Your Score is </strong>"+"<strong>"+count+"</strong>";
    }
    else{
        if(i==0)
        {
            console.log("i==0");
            for(var k=i;k<=i+1;k++)
            {
                console.log("k:"+k);
                selectCell(k,j);
            }
        }
        else if(i==8)
        {
            console.log("i==8");
            for(var k=i;k>=i-1;k--){
                selectCell(k,j);
            }
        }
        else{
            console.log("else");
            for(var k=i-1;k<=i+1;k++)
            {
                selectCell(k,j);
            }
        }
        count++;
        document.querySelectorAll("td")[i*9+j].classList.remove("coral");
        document.querySelectorAll("td")[i*9+j].classList.add("green");
        document.querySelectorAll("td")[j+i*9].innerHTML=bcount;

    }
    if(count===71){
        document.getElementById("winner").innerHTML="<strong>Congratualtion you won the game</strong>";
    }

}
  
// reload the current board
function reset(){
location.reload();
}