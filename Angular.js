
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
                    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Tolstoy", "Austen"], answer: "Shakespeare" }
                ],
                "Mathematics": [
                    { question: "What is 5 + 3?", options: ["5", "15", "12", "8"], answer: "8" },
                    { question: "What is 12 / 4?", options: ["2", "3", "4", "6"], answer: "3" }
                ],
                "Science": [
                    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
                    { question: "What is the chemical symbol for water?", options: ["O2", "CO2", "H2O", "HO"], answer: "H2O" }
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
