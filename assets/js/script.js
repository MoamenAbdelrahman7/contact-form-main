const input_fields=document.querySelectorAll("form fieldset input");

function showErrorMsg(field){
    console.log("showErrorMsg")
    if (field.value === ""){
        field.style.border="1.4px solid red";
        let field_error_msg=document.getElementById(field.id+"-error");
        field_error_msg.style.visibility="visible";
    }
}

function hideErrorMsg(field){
    console.log("hideErrorMsg")
    field.style.border="1.4px solid hsl(169, 82%, 27%)";
    let field_error_msg=document.getElementById(field.id+"-error");
    field_error_msg.style.visibility="hidden";
}


input_fields.forEach(field => {
    if ((field.attributes.type.value !== "radio"))
    field.addEventListener("blur", ()=> showErrorMsg(field));
    field.addEventListener("keyup", ()=> hideErrorMsg(field));
});

const message_field =document.getElementById("message");
message_field.addEventListener("blur", ()=> showErrorMsg(message_field));
message_field.addEventListener("keyup", ()=> hideErrorMsg(message_field));


//  add radio input effect
const queryTypeChoices=document.querySelectorAll("form fieldset .row .choice");
console.log(queryTypeChoices)

queryTypeChoices.forEach(choice => {
    choice.addEventListener("click",() => {
        console.log(choice.id+" - "+" choice")
        queryTypeChoices.forEach(unSelectedChoice => {
            unSelectedChoice.classList.remove("selected");
        });
        choice.querySelector("input").checked="true";
        choice.classList.add("selected");
        
        hideQueryTypeError();
    });
});

const consent_input=document.getElementById("consent");
const consent_error=document.getElementById("consent-error");
consent_input.addEventListener("click", ()=> {
    if (consent_input.checked){
        consent_error.style.visibility="hidden";
    }
    else{
    consent_error.style.visibility="visible";
    }
});


// add validation on form submittion
const form = document.querySelector("main .container form");
const submitBt= document.getElementById("submitBt");

submitBt.addEventListener("click", () => {
    input_fields.forEach(field => {
        if (field.value === ""){
            showErrorMsg(field);
        }
    });
    showErrorMsg(message_field);
    let isChoosen=false;
    queryTypeChoices.forEach(choice => {
        console.log(choice.querySelector("input").checked)
        if (choice.querySelector("input").checked === true){
            isChoosen=true;
        }
        
    });
    if (isChoosen === true){
        hideQueryTypeError();
    }
    else{
        showQueryTypeError();
    }

    if (consent_input.checked){
        consent_error.style.visibility="hidden";
    }
    else{
    consent_error.style.visibility="visible";
    }

});

function showQueryTypeError(){
    document.getElementById("queryType-error").style.visibility="visible";
}

function hideQueryTypeError(){
    document.getElementById("queryType-error").style.visibility="hidden";
}


function showSuccessMsg(){
    const message_sent_alert=document.querySelector("main .container .message-sent-alert");
    console.log("form submitted successfully from showSuccessMsg");
    setTimeout(()=>{
        message_sent_alert.style.display="flex";
    },1000)
    setTimeout(()=>{
        message_sent_alert.style.display="none";
    },3000)
    
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log("form submitted successfully from event listener");
    showSuccessMsg();
    queryTypeChoices.forEach(unSelectedChoice => {
        unSelectedChoice.classList.remove("selected");
    });
    form.reset();
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional: 'smooth' for smooth scrolling, 'auto' for instant scrolling
    });
});









