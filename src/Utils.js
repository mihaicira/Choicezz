var current_page = "main";
//CURRENT PAGE = MAIN / WHEEL / LISTS

function newList(lists = null){
    collapseHomeButtons()

    document.getElementsByClassName("wheel-page")[0].style.display="block";
    document.getElementsByClassName("home-btns")[0].style.opacity="0";
    document.getElementsByClassName("lists-page")[0].style.opacity = "0";
    setTimeout(()=>{
        document.getElementById("home-button-new-list").style.display = "none";
        document.getElementById("home-button-load-list").style.display = "none";
        document.getElementsByClassName("wheel-page")[0].style.opacity="1";
        document.getElementsByClassName("home-btns")[0].style.display="none";
        document.getElementsByClassName("lists-page")[0].style.display = "none";
    },500)
    current_page = "wheel"

}

function displayLists(lists){
    collapseHomeButtons()
    document.getElementsByClassName("home-btns")[0].style.opacity = "0";
    document.getElementsByClassName("wheel-page")[0].style.opacity = "0";
    document.getElementsByClassName("lists-page")[0].style.display = "block";
    setTimeout(()=>{
        document.getElementsByClassName("home-btns")[0].style.display = "none";
        document.getElementsByClassName("wheel-page")[0].style.display = "none";
        document.getElementsByClassName("lists-page")[0].style.opacity = "1";
    },500)
}

function collapseHomeButtons(){
    document.getElementsByClassName("navbar")[0].style.height = "10vw";
    document.getElementsByClassName("image-container")[0].style.height = "40vw";
    document.getElementById("home-button-new-list").style.transform = "translateX(-200%)";
    document.getElementById("home-button-load-list").style.transform = "translateX(200%)";
}

function renderMultipleSpins(results){

    document.getElementById("multiple-spins").style.display = "block";
    setTimeout(()=>{
        document.getElementById("multiple-spins").style.opacity = "1";
        //find out max value & populate array of people
        var max_value = 0;
        var contor = 0;
        var arrayOfPersons = []
        for(var key in results){
            if(results[key] > max_value)
                max_value = results[key]
            arrayOfPersons.push({text:key,result:results[key],id:"result-"+contor})
            contor += 1;
        }

        //sort array
        arrayOfPersons.sort((a,b)=>{
            if(a.result < b.result)
                return 1;
            if(a.result > b.result)
                return -1;
            return 0;
        })


        document.getElementById("multiple-spins").insertAdjacentHTML('beforeend',`<h1>${arrayOfPersons[0].text}</h1><h2>(${arrayOfPersons[0].result})</h2>`);

        arrayOfPersons.forEach((item)=>{
            var HTML = `<div class="multiple-spins-item">
                <p>${item.text}</p>
                <div class="result-diagram" style="width:0%" id=${item.id}><span> (${item.result})</span></div>
            </div>
            <hr/>`
            document.getElementById("multiple-spins").insertAdjacentHTML('beforeend',HTML);
        })

        setTimeout(()=>{
            arrayOfPersons.forEach((item)=>{
                const percent = (item.result/max_value) * 10;
                const value = 7 * percent;
                document.getElementById(item.id).style.width = value+"%";
            })
        },200)

    },300)

    document.getElementById("multiple-spins-close").addEventListener("click", ()=>{
        document.getElementById("multiple-spins").style.opacity = "0";
        setTimeout(()=>{
            document.getElementById("multiple-spins").style.display = "block";

            //    empty container
            document.getElementById("multiple-spins").innerHTML = "<button id=\"multiple-spins-close\">x</button>";
        },500)

    });

}

function toggleOptionSwitch(option=null){
    const btnCSS = document.getElementById("optionSwitch").style;
    var styleElem = document.head.appendChild(document.createElement("style"));
    if(option===false)
    {
        styleElem.innerHTML = ".switch:after {transform: translateY(-50%) translateX(-100%);}";
        btnCSS.background = "rgb(52, 205, 52)";
        return true;
    }
    else
    {
        styleElem.innerHTML = ".switch:after {transform: translateY(-50%) translateX(0%);}";
        btnCSS.background = "#b7b5b5";
        return false;
    }

}

const toggleOptionMenu = (switchState)=>{
    const optionsCSS = document.getElementById("options").style;
    if(optionsCSS.opacity === "0" || optionsCSS.opacity.trim() === ""){
        optionsCSS.display="block";
        setTimeout(()=>{
            optionsCSS.opacity = "1";
            if(switchState){
                toggleOptionSwitch(false)
            }
        },200)

    }
    else{
        optionsCSS.opacity = "0";
        setTimeout(()=>{
            optionsCSS.display = "none";
        },200)
    }
}

export {newList, collapseHomeButtons,renderMultipleSpins,toggleOptionSwitch,toggleOptionMenu,displayLists};