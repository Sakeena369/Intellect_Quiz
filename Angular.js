
        var app = angular.module('quizApp', []);
        app.controller('QuizController', function($scope, $interval) {
            $scope.genres = ["General Knowledge", "Mathematics", "Science"];
            $scope.leaderboard = []; // Array to store leaderboard data
            $scope.userName = ""; // User's name
            $scope.nameSubmitted = false; // Flag to check if name is submitted
            $scope.showLeaderboard = false; // Flag to show/hide leaderboard
            var timer;

            var questionBank = {
                "General Knowledge": [
                    { question: "What is the capital of France?", options: ["Madrid", "Berlin", "Paris", "Rome"], answer: "Paris" },
                    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Tolstoy", "Austen"], answer: "Shakespeare" },
                    { question: "What is the hardest natural substance on Earth?", options: ["Gold","Iron","Diamond","Quartz"], answer: "Diamond"},
                    { question: "Which country is known as the Land of the Rising Sun?", options:["China","Japan","South Korea","Thailand"], answer:"Japan"},
                    { question: "Which country is famous for inventing the Olympic Games?", options:["Italy","France","Greece","Germany"], answer: "Greece"}
                ],
                "Mathematics": [
                    { question: "What is 5 + 3?", options: ["5", "15", "12", "8"], answer: "8" },
                    { question: "What is 12 / 4?", options: ["2", "3", "4", "6"], answer: "3" },
                    { question: "What is the area of a rectangle with length 10 cm and width 5 cm?", options: ["30 cm2","40 cm2","50 cm2","60 cm2"], answer:"50 cm2"},
                    { question: "What is ³√27?", options: ["90 deg","180 deg","270 deg","360 deg"], answer:"180 deg"},
                    { question: "Which shape has only one curved surface and no edges?", options: ["Cube","Cone","Sphere","Cylinder"], answer:"Sphere"}
                ],
                "Science": [
                    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
                    { question: "What is the chemical symbol for water?", options: ["O2", "CO2", "H2O", "HO"], answer: "H2O" },
                    { question: "What is the powerhouse of the cell?", options:["Nuclues","Ribosome","Mitochondria","Endoplasmic Reticulum"], answer:"Mitochondria"},
                    { question: "What is the pH value of pure water?", options:["5","7","9","12"], answer: "7"},
                    { question: "Which element is a liquid at room temperature?", options:["Mercury","Sodium","Iron","Copper"], answer: "Mercury"}
                ]
            };

            $scope.startQuiz = function(genre) {
                $scope.questions = questionBank[genre];
                $scope.quizStarted = true;
                $scope.currentQuestion = 0;
                $scope.score = 0;
                $scope.quizOver = false;
                $scope.answered = false;
                startTimer();
            };

            function startTimer() {
                if (timer) $interval.cancel(timer);
                $scope.timeLeft = 10;
                timer = $interval(function() {
                    if ($scope.timeLeft > 0) {
                        $scope.timeLeft--;
                    } else {
                        $scope.nextQuestion();
                    }
                }, 1000);
            }

            $scope.selectAnswer = function(option) {
                if (!$scope.answered) {
                    $scope.answered = true;
                    $scope.selectedAnswer = option;
                    if (option === $scope.questions[$scope.currentQuestion].answer) {
                        $scope.score++;
                    }
                    $interval.cancel(timer);
                }
            };

            $scope.nextQuestion = function() {
                if ($scope.currentQuestion < $scope.questions.length - 1) {
                    $scope.currentQuestion++;
                    $scope.answered = false;
                    startTimer();
                } else {
                    $scope.quizOver = true;
                }
            };

            $scope.submitName = function() {
                if ($scope.userName) {
                    $scope.leaderboard.push({ name: $scope.userName, score: $scope.score });
                    $scope.nameSubmitted = true;
                    $scope.showLeaderboard = true; // Show leaderboard after name submission
                }
            };

            $scope.restartQuiz = function() {
                $scope.quizStarted = false;
                $scope.quizOver = false;
                $scope.nameSubmitted = false;
                $scope.showLeaderboard = false;
                $scope.userName = ""; // Reset user name
            };
        });
