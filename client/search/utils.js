AppUtils = {};

AppUtils.sortByStars = function(repos){
  return _.sortBy(repos, function(o) { return o.stargazers_count; }).reverse();
};

AppUtils.sortByScore = function (questions){
  return _.sortBy(questions, function(o) { return o.question_score; }).reverse();
};
