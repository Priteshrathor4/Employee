function clearErrors() {
    errors = document.getElementsByClassName('errors');
    for (let item of errors) {
        item.innerHTML = "";
    }
}
function seterror(id, error) {
    //sets error inside tag of id 
    element = document.getElementById(id);
    element.getElementsByClassName('errors')[0].innerHTML = error;

}

function stateCity() {
    // let MP = ['Mandsaur','Indore','Ratlam']
    // let RJ = ['Udaipur','jaipur','Pratapghar']
    // let GJ = ['Rajkot','Ahmadabad','Surat']
    // var city = document.getElementById('city');
    var state = document.getElementById('state').value;
    if (state == "mp") {
        document.getElementById('c1').innerHTML = "Mandsaur";
        document.getElementById('c2').innerHTML = "Indore";
        document.getElementById('c3').innerHTML = "Ratlam";

    }
    else if (state == "rj") {
        document.getElementById('c1').innerHTML = "Udaipur";
        document.getElementById('c2').innerHTML = "Jaipur";
        document.getElementById('c3').innerHTML = "Pratapghar";

    }
    else if (state == "gj") {
        document.getElementById('c1').innerHTML = "Rajkot";
        document.getElementById('c2').innerHTML = "Ahmadabad";
        document.getElementById('c3').innerHTML = "Surat";
    }
}
function readlocalstorage2() {
    stateCity();
    clearErrors();
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        // console.log(key);//get localstorge key
        // alert(`${key}: ${localStorage.getItem(key)}`); //all values of key
        let retrive = JSON.parse(localStorage.getItem(key));
        // console.log(retrive);// how many values we have stored
        for (let key in retrive) {
            // console.log( key ); // in value(object) get main key
            for (let value in retrive[key]) { // this key used to get key ->name email our phone empco 
                //  console.log([value]); // per data key
                // console.log(retrive[key][value]); //  main data allready insert
                if (retrive[key][value] == document.getElementById("empcoS").value) {
                    document.getElementById('fname').value = retrive[key]['namer']
                    document.getElementById("femail").value = retrive[key]['emailr']
                    document.getElementById('fphone').value = retrive[key]['mobile_no']
                    document.getElementById('empco').value = retrive[key]['empco']
                    document.getElementById('gender').value = retrive[key]['genderr']
                    document.getElementById('state').value = retrive[key]['stater']
                    // document.getElementById('city').value = retrive[key]['cityr']
                    let dropDown = document.getElementById('city');// we need to store input id in var anf
                    dropDown.options[0].text = retrive[key]['cityr'];// store dropdown option value in dropdown index
                }
                else if (retrive[key][value] != document.getElementById("empcoS").value) {
                //   else {
                    //    alert("This is user not exists");
                    //    return true;
                }
            }
        }
    }
}

function myfun() {
    clearErrors();
    returnval = true;
    var namer = document.getElementById('fname').value;
    var emailr = document.getElementById('femail').value;
    var mobile_no = document.getElementById('fphone').value;
    var empco = document.getElementById('empco').value;
    var genderr = document.getElementById('gender').value;
    var stater = document.getElementById('state').value;
    var cityr = document.getElementById('city').value;
    var finalname;
    var finalemail;
    var finalphoneno;
    var finalempco;
    var finalgender;
    var finalstate;
    var finalcity;
    var userrec = new Object();
    userrec = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : []

    if (!namer.match(/^[A-Za-z]{4,20}$/) || namer.length == "") {
        seterror("nameerror", "Enter proper Name");
        returnval = false;
    }
    else {
        finalname = namer;
        console.log(finalname);
    }
    if (!emailr.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) || emailr.length == "") {
        seterror("error2", "Enter proper Email");
        returnval = false;
    }
    else {
        finalemail = emailr;
        console.log(finalemail);
    }
    if (!mobile_no.match(/^[6-9]\d{9}$/) || mobile_no.length == "") {
        seterror("error3", "Enter proper mobile no");
        returnval = false;
    }
    else {
        finalphoneno = mobile_no;
        console.log(finalphoneno);

    }
    if (genderr == "") {
        seterror("error5", "Select your gender");
        returnval = false;
    }
    else {
        finalgender = genderr;
        console.log(finalgender);
    }
    if (stater == "") {
        seterror("error6", "Please select state");
        retrive = false;
    }
    else {
        finalstate = stater;
        console.log(finalstate);
        if (cityr == "") {
            seterror("error7", "Please select city")
            returnval = false;
        }
        else {
            finalcity = cityr;
            console.log(finalcity);
        }
    }
    if (userrec.some((v) => { return v.empco == empco })) {
        seterror("error4", "Duplicate EMP code");
    }
    else if (!empco.match(/^[a-zA-Z]{3}[0-9]{1,10}$/) || empco.length == 0) {
        seterror("error4", "Enter proper EMP code");
        returnval = false;
    }
    else {
        finalempco = empco;
        console.log(finalempco);

    }
    if (!finalcity == 0 && !finalname == 0 && !finalemail == 0 && !finalempco == 0 && !finalgender == 0 && !finalstate == 0 && !finalphoneno == 0) {
        userrec.push({
            "namer": namer,
            "emailr": emailr,
            "mobile_no": mobile_no,
            "empco": empco,
            "genderr": genderr,
            "stater": stater,
            "cityr": cityr
        })
        localStorage.setItem('users', JSON.stringify(userrec));
        alert("Employee data insert succesfully");
    }
    else {
        seterror("error8", "Enter all data in properfomr");
    }

}

