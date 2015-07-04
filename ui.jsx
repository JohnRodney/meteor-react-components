var ThemeManager = new MaterialUI.Styles.ThemeManager();
var searchTerm;
var searchResults = [];
var App = React.createClass({

  getInitialState: function() {
      return {
          textFieldValue: ''
      };
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  handleClick: function(event) {
    console.log(event);
    this._queryGitHub();
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  _handleTextFieldChange: function(hey){
    searchTerm = $(hey.currentTarget).val();
  },

  _queryGitHub: function(){

    $.get('https://api.github.com/search/repositories?q='+ searchTerm +'+language:javascript&order=asc', function(data){
      searchResults = sortByStars(data.items);
    });
    this.forceUpdate();
  },

  render: function() {
    return (
        <div>
          <MaterialUI.AppBar title='Git Search' iconClassNameRight="muidocs-icon-navigation-expand-more"/>
            <div onClick={this.handleClick} style={{float: 'left'}}>
              <MaterialUI.RaisedButton
               style={{margin: '15px'}}
               label="Search"></MaterialUI.RaisedButton>
            </div>
            <MaterialUI.TextField
                style={{margin: '15px'}}
                onEnterKeyDown ={this.handleClick}
                onChange={this._handleTextFieldChange}
                hintText="Hint Text" />
          <Card />
        </div>
    );
  }
});

if (Meteor.isClient) {
  Meteor.startup(function () {
    React.render(<App />, document.getElementById('root'));
  });
}

function sortByStars(repos){
  return _.sortBy(repos, function(o) { return o.stargazers_count }).reverse();
}

var Card = React.createClass({
  render: function(){
    var searchNodes = searchResults.map(function (item) {
      console.log(item);
      return (
          <a className='no-underline' href={item.clone_url}>
            <MaterialUI.Card
            style={{
              margin: '1%',
              width: '98%'
            }}>
              <MaterialUI.CardHeader
                title="Repo"
                subtitle={item.name}
                avatar="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png"
                style={{
                  margin: '1%',
                  float: 'left',
                  width: '30%'
                }}/>
              <MaterialUI.CardHeader
                title="Stars"
                subtitle={item.stargazers_count}
                avatar="http://www.wpclipart.com/cartoon/stars/star_angry.png"
                style={{
                  margin: '1%',
                  float: 'right',
                  width: '30%'
                }}/>
              <MaterialUI.CardHeader
                title="Owner"
                subtitle={item.owner.login}
                avatar={item.owner.avatar_url}
                style={{
                  margin: '1%',
                  width: '30%',
                  float: 'left'
                }}/>
              <MaterialUI.CardText
                style={{
                  margin: '1%',
                  clear: 'both',
                  fontSize: '12px'
                }}>
                {item.description}
              </MaterialUI.CardText>
            </MaterialUI.Card>
          </a>
      );
    });
    return (
      <div>{searchNodes}</div>
    );
  }
});
