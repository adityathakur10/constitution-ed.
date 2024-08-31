const mongoose = require('mongoose');
const Cases = require('../db/connection'); // Adjust the path to your model file
const fs = require('fs');
const path = require('path');

async function saveCaseData(jsonData) {
  try {
    // Extract and save articles
    const articles = jsonData.game.case.articles.map(article => ({
        article: article.article,
        description: article.description
      }));
      console.log(articles);

    // Extract and save rounds
    const rounds = jsonData.game.rounds.map(roundData => ({
      roundNo: roundData.roundNo,
      description: roundData.description,
      player: {
        selectArticle: roundData.player.selectArticle,
        articleOptions: roundData.player.articleOptions,
        selectArgument: roundData.player.selectArgument,
        argumentOptions: roundData.player.argumentOptions,
        selectEvidence: roundData.player.selectEvidence,
        evidenceOptions: roundData.player.evidenceOptions,
        selectRebuttal: roundData.player.selectRebuttal,
        rebuttalOptions: roundData.player.rebuttalOptions,
        finalArgument: roundData.player.finalArgument,
        argumentOptions: roundData.player.argumentOptions,
      },
      opponent: {
        responses: roundData.opponent.responses.map(response => ({
          argumentText: response.argumentText,
          opponentArguments: response.opponentArguments,
          opponentEvidence: response.opponentEvidence,
        })),
      },
      judge: {
        feedback: roundData.judge.feedback.map(feedback => ({
          argumentText: feedback.argumentText,
          response: feedback.response,
          points: feedback.points,
        })),
      }
    }));

    // Create and save the case
    const caseData = new Cases({
      title: jsonData.title,
      description: jsonData.description,
      articles: articles,
      rounds: rounds,
    });

    await caseData.save();

    console.log('Case data saved successfully!');
  } catch (error) {
    console.error('Error saving case data:', error);
  }
}

module.exports=saveCaseData;