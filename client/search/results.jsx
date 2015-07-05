Results = React.createClass({
  render: function(){
    var searchNodes = Meteor.searchResults.map(function (item) {
      if(AppUtils.searchType === 'stack'){
        return getStackRes(item);
      } else {
        return getGitRes(item);
      }

    });
    return (
      <div>{searchNodes}</div>
    );
  }
});
