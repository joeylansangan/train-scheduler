var firebaseConfig = {
    apiKey: "AIzaSyAUc1sY97qR7kpVYpgf86gb7YP2zwCW5CU",
    authDomain: "train-scheduler-96932.firebaseapp.com",
    databaseURL: "https://train-scheduler-96932.firebaseio.com",
    projectId: "train-scheduler-96932",
    storageBucket: "train-scheduler-96932.appspot.com",
    messagingSenderId: "317827544777",
    appId: "1:317827544777:web:de705808f46f013f"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

// on click event for adding train data
$("#add-data").on("click", function(event){
    event.preventDefault();

    // grab user input
    var trainName = $("#train-input").val().trim();
    var dest = $("#dest-input").val().trim();

    // time converted into seconds
    var firstTrain = moment($("#first-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
    console.log("user input firstTrain: " +firstTrain);

    var freq = $("#freq-input").val().trim();
    
    // create object that will hold train data
    var newTrain = {
        train: trainName,
        destination: dest,
        starts: firstTrain,
        frequency: freq
    };
    
    // // check new object
    // console.log(newTrain);
    
    // upload new object to firebase database
    database.ref().push(newTrain);

    // clear text boxes after submitting
    $("#train-input").val("");
    $("#dest-input").val("");
    $("#first-input").val("");
    $("#freq-input").val("");
});

// on child added function to add new train info on html page
database.ref().on("child_added", function(trainSnap){
    // check snapshot value from firebase database
    console.log("listener trainSnap", trainSnap.val());

    // store data from firebase into a new variable
    var trainName = trainSnap.val().train;
    var dest = trainSnap.val().destination;
    var firstTrain = trainSnap.val().starts;
    var freq = trainSnap.val().frequency;

    console.log("firebase time: " + firstTrain)

    // convert time into minutes
    var minTime = moment().diff(moment.unix(firstTrain),"minutes");
    console.log("time in mins: "+ minTime);

    // get the modulus between train time and frequency
    var tRemainder = minTime % freq;
    console.log("firebase remainder: " + tRemainder);

    // calculate minutes away
    var minAway = freq - tRemainder;
    console.log("firebase minAway: " + minAway);

    // calculate arrival time by adding minAway to current time
    var arriveTime = moment().add(minAway, "m").format("hh:mm A");
    console.log("firebase arrival: " + arriveTime);
    
    // append new data on table
    // create new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        
    )
});