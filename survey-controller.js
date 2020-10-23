//get required modules
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var fs = require('fs');

//reads JSON data from specified file
function readData(fileName) {
    let dataRead = fs.readFileSync('./data/' + fileName + '.json');
    let infoRead = JSON.parse(dataRead);
    return infoRead;
}

//writes JSON data to specified file
function writeData(info, filename) {
    let data = JSON.stringify(info);
    fs.writeFileSync('./data/' + filename + '.json', data);
}

function combineCounts(name, value) {
    let info = readData(name);
    let found = 0;
    for (let i = 0; i<info.length; i++){
        if (info[i][name] === value){
            info[i].count = parseInt(info[i].count) + 1;
            found = 1;
        }
    }

    if (found === 0) {
        info.push({[name] : value, count: 1});
    }
    writeData(info, name);
}

//this is the controller and it sets up get / post requests
module.exports = function (app) {

    //when the user goes to localhost:3000/analysis, display the analysis page with provided data
    app.get('/analysis', function(req, res){
        var age = readData("age");
        var q1 = readData("q1");
        var q2 = readData("q2");
        var q3 = readData("q3");
        var q4 = readData("q4");
        var q5 = readData("q5");
        var q6 = readData("q6");
        var name = readData("name");
        var gender = readData("gender");
        var comments = readData("comments");
        res.render('survey-analysis', {results: [age, q1, q2, q3, q4, q5, q6, comments, name, gender]});
    });

    //when the user goes to localhost:3000/appleSurvey, display this static page
    app.get('/appleSurvey', function(req, res){
        res.sendFile(__dirname+'/views/survey.html');
    });

    //when the user goes to localhost:3000/, display this static page
    app.get('/', function(req, res) {
        res.sendFile(__dirname+'/views/survey.html');
    });

    //when a user submits the survey form this will run the post
    app.post('/appleSurvey', urlencodedParser, function(req, res){
        //do nothing for now
        console.log(req.body);

        var json = req.body;
        for (var key in json){
            console.log(key + ": " + json[key]);
            if (key != "fname" && key != "lname") {
                if (key === "q3" && (json[key].length === 2)){
                    for (let item in json[key]){
                        combineCounts(key, json[key][item]);
                    }
                } else {
                    combineCounts(key, json[key]);
                }
            }
        }

        res.sendFile(__dirname + "/views/survey.html");
    });
};