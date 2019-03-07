function SendTimeRow(){
    //Take value from textfield
    var ValueFromRowField = $('.timeRowField').val();

    var array = [];
    var count = 0;
    var number = "";

    //loop which create array from string
    for (var i = 0; i < ValueFromRowField.length; i++) {
        var ch = ValueFromRowField.charAt(i);
        if(ch != " "){
            number = number + ch;
        } else {
            if(number != ""){
                array[count] = number;
                count++;
                var number = "";
            }
        }
    }
    if(number != ""){
        array[count] = number;
    } 
    $('.timeRowField').val("");
  
    //create object for serializing and send data to server 
    var objectMessage = new Object();
    objectMessage.TimeRow = array;
    objectMessage.TimeRowLength = array.length;

    //object to string (sdon)
    var jsonArray = JSON.stringify(objectMessage);
    console.log(jsonArray);

    //Ajax request with time row to server (http - post)
    $.ajax({
        url: "http://localhost:80/average",
        method: "POST",
        data : { sendedData: jsonArray},
        success : function(data){
            var messageFromServer = JSON.parse(data)
            console.log(data)
            console.log(messageFromServer)
            $('form').after('</br><div  class="mid-value-div">Временной ряд: ' + messageFromServer.TimeRow +';</br> Среднее значение: ' + messageFromServer.MiddleValue + ';</div>');
        }
    });

    return false
}