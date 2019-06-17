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
    var firstTrain = $("#first-input").val().trim();
    var freq = $("#freq-input").val().trim();
    
    // create object that will hold train data
    var newTrain = {
        train: trainName,
        destination: dest,
        starts: firstTrain,
        frequency: freq
    };
    
    // check new object
    console.log(newTrain);
    
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
    console.log(trainSnap.val());

    // store data from firebase into a new variable
    var trainName = trainSnap.val().train;
    var dest = trainSnap.val().destination;
    var firstTrain = trainSnap.val().starts;
    var freq = trainSnap.val().frequency;

    console.log(trainName);
    console.log(dest);
    console.log(firstTrain);
    console.log(freq);
    
});