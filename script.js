let container = document.createElement("div");
container.className="container"
container.id= "containerid"

let carddiv = document.createElement("div")
carddiv.className = "main"
carddiv.innerHTML =`<div class="card" >
<h5 class="card-header">Dictionary</h5>
<div class="card-body"id ="card-body" >
</div>
</div>`

let content_div = document.createElement("div")
content_div.id = "content-div"
container.append(carddiv,content_div)
document.body.append(container)

inputbox_append();

//This function appends the input box to the card-body.
function inputbox_append(){
    let inputbox = document.createElement("div")
    inputbox.className = "input-box"
    inputbox.innerHTML =`<div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="inputGroup-sizing-default">Enter The Word:</span>
    </div>
    <input type="text" class="form-control" id="input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>
    </div>`
    let cardele = document.getElementById("card-body")

    let button = document.createElement("button")
    button.className = "btn btn-primary"
    button.setAttribute("type","button")
    button.innerHTML="Search"
    button.setAttribute("onclick","search()")
    cardele.append(inputbox,button)


}

//This function fetch the the meaning,partsofspeech and defintions from the dictionary api. 
async function search(){
    let content_div_id = document.getElementById("content-div")
    content_div_id.innerHTML="";
    try {
    let input_value = document.getElementById("input").value

    let api_url = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input_value}`)
    let response = await api_url.json()
    let meanings = response[0].meanings
    console.log(meanings)
    for(i=0;i<meanings.length;i++){
        let result_card = document.createElement("div")
        result_card.id = "result-card"
        let synonyms = meanings[i].synonyms;
        let synonymshtml = ""
        if(synonyms && synonyms.length>0){
            synonymshtml = `<p><b>Synonyms:</b>${synonyms}.<p>`
        }
        result_card.innerHTML = `<div class="card">
        <h4 class="card-header">Word: ${input_value}.</h4>
        <div class="card-body">
        <p><b>PartOfSpeech : </b>${meanings[i].partOfSpeech}.</p>
        ${synonymshtml}
        <p><b>Definitions:</b>${meanings[i].definitions[0].definition}<p>
        </div>
      </div>` 
      content_div.append(result_card)
    }
        
    } catch (error) {
        // alert("Word Not Found in the dictionary!")
        let content_div_id = document.getElementById("content-div")
        content_div_id.innerHTML="";
        let error_card = document.createElement("div")
        error_card.id = "error-card"
        error_card.innerHTML = `<div class="card">
        <div class="card-body">
        <p class ="errorp"><b>Word Not Found !! </b></p>
        </div>
      </div>` 
      content_div.append(error_card)
    }  
}
