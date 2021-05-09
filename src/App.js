import './App.css';
import {Navbar,Image,BtnLine} from './Objects';
import React, {Component} from 'react';
import {newList,renderMultipleSpins,toggleOptionSwitch,toggleOptionMenu,displayLists} from './Utils';
import UniqueId from 'react-html-id';
class App extends Component{
    constructor(props) {
        super(props);
        UniqueId.enableUniqueIds(this);
        this.state = {
            choices: [
                // {id:this.nextUniqueId(),text:"Hotdog",fav:false},
                // {id:this.nextUniqueId(),text:"Pizza",fav:false},
                // {id:this.nextUniqueId(),text:"Paste",fav:false},
                // {id:this.nextUniqueId(),text:"Burger",fav:false}
            ],
            spinNumber: 1,
            withAnimation: true,
            Lists:[
                ["Food",
                    {id:"default-food1",text:"Burger",fav:false},
                    {id:"default-food2",text:"Pizza",fav:false},
                    {id:"default-food3",text:"Pasta",fav:false},
                    {id:"default-food4",text:"Sushi",fav:false},
                    {id:"default-food5",text:"Salmon",fav:false},
                    {id:"default-food5",text:"Lasagna",fav:false}
                ],
                ["Movies",
                    {id:"default-movie1",text:"76 Days",fav:false},
                    {id:"default-movie2",text:"Identifying Features",fav:false},
                    {id:"default-movie3",text:"Quo Vadis, Aida?",fav:false},
                    {id:"default-movie4",text:"Mayor",fav:false},
                    {id:"default-movie5",text:"MLK/FBI",fav:false},
                    {id:"default-movie6",text:"Minari",fav:false},
                    {id:"default-movie7",text:"The Father",fav:false},
                    {id:"default-movie8",text:"Billie Eilish: The World's a Little Blurry",fav:false},
                    {id:"default-movie9",text:"Shiva Baby",fav:false},
                    {id:"default-movie10",text:"The Reason I Jump",fav:false},
                    {id:"default-movie11",text:"Assassins",fav:false},
                    {id:"default-movie12",text:"The Truffle Hunters",fav:false},
                    {id:"default-movie11",text:"Slaxx",fav:false},
                    {id:"default-movie11",text:"Judas And The Black Messiah",fav:false},
                    {id:"default-movie11",text:"Stray",fav:false},
                    {id:"default-movie11",text:"The Human Voice",fav:false},
                    {id:"default-movie11",text:"Test Pattern",fav:false},
                    {id:"default-movie11",text:"Raya And The Last Dragon",fav:false},
                    {id:"default-movie11",text:"Lucky",fav:false},
                    {id:"default-movie11",text:"About Endlessness",fav:false},
                    {id:"default-movie13",text:"Two of us",fav:false}
                    ]

            ]
        //    "Burger","Pizza","Pasta","Sushi","Salmon","Lasagna"
        };
        this.isSpinActive = true;
        // if(localStorage.getItem("LISTS")===undefined){
        //     localStorage.setItem("LISTS",JSON.stringify([this.state.Lists[0],this.state.Lists[1]]))
        // }
    }

    removeTap = (id,uuid)=>{
        const toRemove = document.getElementById(uuid);

        toRemove.style.animation="1s object-disappear forwards";


        setTimeout(()=>{
            var temp = this.state.choices;
            temp.splice(id,1);
            this.setState({
                choices: temp
            });
        },600)

    }

    sendList = ()=>{

        const text = document.querySelector("#save-list-input input").value;

        console.log("Text: ",text);

        var newList = this.state.choices;
        newList = [text,...newList];

        var tempList = this.state.Lists
        tempList.push(newList)
        this.setState({Lists:tempList})

        localStorage.setItem("LISTS",JSON.stringify(tempList))

        this.closeSaveListInputMenu()
    }

    closeSaveListInputMenu = ()=>{
        document.getElementById("save-list-input").style.opacity = "0";
        setTimeout(()=>{
            document.getElementById("save-list-input").style.display = "none";
        },300)
    }


    newInput = () =>{
        const value = document.querySelector("#plus input").value.trim();
        var choices = this.state.choices
        const id = this.nextUniqueId()+value

        const guard = this.state.choices.filter((obj)=>(obj.text === value))

        if(guard.length > 0 || value === ""){
            console.log("no-no!")
            return;
        }

        //reset text input
        document.querySelector("#plus input").value="";

        //hide plus button
        document.querySelector("#plus button").style.transform= "scale(0) translateX(-200%)";

        //insert new values into choices and save choices
        choices.push({id:id,text:value,fav:false})
        this.setState({
            choices: choices
        });
    }

    favTap(id){
        var temp = this.state.choices
        temp[id].fav === true ? temp[id].fav=false : temp[id].fav=true ;

        const starCSS = document.getElementsByClassName("objectLine")[id].children[2].style;

        temp[id].fav===true? starCSS.filter="grayscale(0)" : starCSS.filter = "grayscale(100%)";
    }

    spin = (options) =>{
        //daca se face spam cu isSpinACtive sau choices nu are elemente
        if(!this.isSpinActive || this.state.choices.length === 0)
            return


        //initializez si populez array
        var array = [];
        this.state.choices.forEach((elem)=>{
            array.push(elem)
            if (elem.fav === true)
                array.push(elem)
        })

        // console.log("Spin array: ",array)

        //blochez butonul de Spin
        this.isSpinActive = false;


        //daca se vrea animatie, asa facem
        const wheelCSS = document.getElementById("wheel").style;
        if(options.withAnimation){
            // document.getElementById("wheel").scrollIntoView();
            window.scrollTo(0, 0)
            wheelCSS.animation = "5s rotateWheel normal";
        }

        //timeout for wheel animation
        setTimeout(()=>{
            //resetez animatia de la wheel
            wheelCSS.animation = "none";
            //transparenta buton SPIN
            document.querySelector("#spin").style.opacity="0.6";

            //daca se vrea un singur spin
            if(options.spinNumber === 1){
                //se calculeaza random
                var item = array[Math.floor(Math.random() * array.length)];

                document.getElementById(item.id).scrollIntoView({block: "center"}); // se modifica pozitia view-ului pe pagina
                const textbox = document.querySelector("#"+item.id + ">div")  // se animeaza text-box-ul care a iesit in urma random-ului
                textbox.style.animation="1s blink infinite";

                //random pentru incheiere animatii & activare buton spin
                setTimeout(()=>{
                    textbox.style.animation= "none";
                    textbox.style.boxShadow="none";
                    document.querySelector("#spin").style.opacity="1";
                    this.isSpinActive = true;
                },4000)
            }
            else{
                //se calculeaza random, se retine in dictionarul results
                var results = {};
                for(var i = 0; i < options.spinNumber ; i++){
                    item = array[Math.floor(Math.random() * array.length)];
                    if(results[item.text] === undefined){
                        results[item.text] = 1;
                    }
                    else{
                        results[item.text] = results[item.text] + 1
                    }
                }
                //se deschide chenarul cu rezultate
                 renderMultipleSpins(results);

                //timeout pentru incheiere animatii & activare buton spin
                setTimeout(()=>{
                    document.querySelector("#spin").style.opacity="1";
                    this.isSpinActive = true;
                },2000)// After animation is done
            }
        },options.withAnimation === true ? 5000 : 10)
    }

    handleChange(e){
        //PLUS button appear when there is text on input field
        if(e.target.value.length > 0){
            document.querySelector("#plus button").style.transform= "scale(1) translateX(0)";
        }
        else{
            document.querySelector("#plus button").style.transform= "scale(0) translateX(-200%)";
        }

    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            if(document.querySelector("#plus input").value.trim() !== ""){
                this.newInput()
            }
        }
    }

    openSaveListInput = ()=>{
        document.getElementById("save-list-input").style.display = "block";
        setTimeout(()=>{
            document.getElementById("save-list-input").style.opacity = "1";
        },300)
    }

    render(){
        return <>
            <Navbar/>
            <Image/>
            <div className="home-btns">
            <BtnLine
                st={
                    <button className="style1" onClick={newList} id="home-button-new-list">New list</button>
                }
                nd={
                    <button className="style1" onClick={()=>{displayLists(this.state.Lists)}} id="home-button-load-list">Load list</button>
                }
            />
            </div>

            <div className="wheel-page">
                <div className="input-text-container">
                    {
                        this.state.choices.map((value,index) =>{
                            return(<div className="objectLine" key={value.id} id={value.id}>
                                <button onClick={()=>{this.removeTap(index,value.id)}}></button>
                                <div className="objectText">{value.text}</div>
                                <button onClick={()=>{this.favTap(index)}}></button>
                            </div>)
                        })
                    }
                    <div className="menu-line" id="plus">
                        <input placeholder="write new object here" onChange={(e) => {this.handleChange(e)}} onKeyPress={this.handleKeyPress}/>
                        <button onClick={this.newInput} >+</button>
                    </div>

                </div>

                <div className="menu-line" id="spin">
                        <button onClick={()=>{this.spin({withAnimation: this.state.withAnimation,
                            spinNumber: this.state.spinNumber
                        })}}>Spin</button>
                    </div>

                <div className="menu-line">
                        <button onClick={()=>{toggleOptionMenu(this.state.withAnimation)}}>Options</button>
                        <button onClick={()=>{displayLists(this.state.Lists)}}>Load list</button>
                    </div>

                <div className="menu-line">
                        <button onClick={this.openSaveListInput}>Save list</button>
                    </div>

                <div id="multiple-spins">
                    <button id="multiple-spins-close">x</button>
                </div>

                <div id="options">
                    <div className="option">
                        <p>Wheel animation</p>
                        <button className="switch" id="optionSwitch" onClick={()=>{
                            this.state.withAnimation = toggleOptionSwitch(this.state.withAnimation)
                        }}></button>
                    </div>
                    <hr/>
                    <div className="option">
                        <span>Simulate</span>
                        <p id="number-of-spins">{this.state.spinNumber}</p>
                        <span>spins</span>
                    </div>

                    <div className="option" id="increment-options">
                        <button onClick={()=>{
                            if(this.state.spinNumber <= 100)
                                this.setState({spinNumber:this.state.spinNumber+1})
                        }}>+</button>
                        <button onClick={()=>{
                            if(this.state.spinNumber > 1)
                                this.setState({spinNumber:this.state.spinNumber-1})
                        }}>-</button>
                    </div>
                    <hr/>
                    <button onClick={toggleOptionMenu}>Close</button>

                </div>

                <div id="save-list-input">
                    <h2>Write your list's name below</h2>
                    <input/>
                    <button onClick={this.sendList}>Save</button>
                    <button onClick={this.closeSaveListInputMenu}>Close</button>
                </div>
            </div>

            <div className="lists-page">
                <p>Press on the list to load it</p>
                <h2>Default lists</h2>
                <div className="list-obj" onClick={()=>{
                this.setState({choices:[]})
                newList()}}>New list</div>
                <div className="list-obj" onClick={()=>{
                    const [,...tail] = this.state.Lists[0]
                    this.setState({choices:tail})
                    newList()}}>Food</div>
                <div className="list-obj" onClick={()=>{
                    const [,...tail] = this.state.Lists[1]
                    this.setState({choices:tail})
                    newList()}}>Movies</div>

                <h2>Your own lists</h2>
                {
                    localStorage.getItem("LISTS") !== null &&
                    JSON.parse(localStorage.getItem("LISTS")).map((key,index)=>{
                        if(index >= 2){
                        return(<div className="list-obj" id={"unique-personal-list-"+index} onClick={()=>{
                        const [,...tail] = key
                        this.setState({choices:tail})
                        newList()}}>{key[0]}</div>)
                        }
                   })
                }
                {
                    localStorage.getItem("LISTS") === null &&
                    <p>You don't have any saved lists...</p>
                }

                <button onClick={()=>{newList(this.state.choices)}}>Wheel Page</button>
            </div>

        </>
    }
}


export default App;
