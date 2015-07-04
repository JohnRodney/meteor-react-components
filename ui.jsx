var Formaldehyde;
if(Meteor.isClient){
  console.log(Meteor.Poetic.Formaldehyde);
  Formaldehyde = Meteor.Poetic.Formaldehyde;
}
var ThemeManager = new MaterialUI.Styles.ThemeManager();
var searchTerm;
var searchResults = [];
var App = React.createClass({

  componentDidMount: function(){
    var that = this;
    Formaldehyde.register('q', function(value){
      searchTerm = value;
      that._queryGitHub();
    });
  },

  getInitialState: function() {
      return {
          textFieldValue: ''
      };
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  handleClick: function(event) {
    Formaldehyde.set('q', searchTerm);
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  _handleTextFieldChange: function(e){
    searchTerm = $(e.currentTarget).val();
  },

  _queryGitHub: function(){
    var that = this;
    $.get('https://api.github.com/search/repositories?q='+ searchTerm +'+language:javascript&order=asc', function(data){
      searchResults = sortByStars(data.items);
      that.forceUpdate();
    });
  },

  render: function() {
    return (
        <div>
          <MaterialUI.AppBar title='Git Search' iconClassNameRight="muidocs-icon-navigation-expand-more"/>
            <div onClick={this.handleClick} style={{float: 'left'}}>
              <MaterialUI.RaisedButton
               style={{margin: '30px'}}
               label="Search"></MaterialUI.RaisedButton>
            </div>
            <MaterialUI.TextField
                style={{margin: '30px'}}
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
                  float: 'left'
                }}/>
              <MaterialUI.CardHeader
                title="Owner"
                subtitle={item.owner.login}
                avatar={item.owner.avatar_url}
                style={{
                  margin: '1%',
                  float: 'left'
                }}/>
               <MaterialUI.CardHeader
                title="Stars"
                subtitle={item.stargazers_count}
                avatar="http://www.wpclipart.com/cartoon/stars/star_angry.png"
                style={{
                  margin: '1%',
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
