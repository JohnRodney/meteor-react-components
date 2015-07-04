var Formaldehyde,
    ThemeManager = new MaterialUI.Styles.ThemeManager(),
    searchTerm,
    searchResults = [],
    searchType = 'stack';

var menuItems = [
   { payload: '1', text: 'Github' },
   { payload: '2', text: 'Stackoverflow' },
   { payload: '3', text: 'Stackoverflow' },
   { payload: '4', text: 'Stackoverflow' }
];


if(Meteor.isClient){
  console.log(Meteor.Poetic.Formaldehyde);
  Formaldehyde = Meteor.Poetic.Formaldehyde;
}

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
  _changeSearchType: function(e){
    if($(e.currentTarget).val().toLowerCase().indexOf('stack') > -1){
      searchType = 'stack';
    } else {
      searchType = 'git';
    }
  },

  _handleTextFieldChange: function(e){
    searchTerm = $(e.currentTarget).val();
  },

  _queryGitHub: function(){
    var that = this;
    var url;
    console.log(searchType);
    var stack = "https://api.stackexchange.com/2.2/search/excerpts?body="+searchTerm+"&site=stackoverflow";
    var git = 'https://api.github.com/search/repositories?q='+ searchTerm +'&order=asc';
    if(searchType === "stack"){
      url = stack;
    } else {
      url = git;
    }
    $.get(url, function(data){
      if(searchType === "stack"){
        searchResults = sortByScore(data.items);
      } else {
        searchResults = sortByStars(data.items);
      }
      that.forceUpdate();
    });
  },

  render: function() {

    return (
        <div>
          <MaterialUI.AppBar title='Git Search' iconClassNameRight="muidocs-icon-navigation-expand-more"/>
            <MaterialUI.Toolbar>
              <MaterialUI.ToolbarGroup key={0} float="left">
                <MaterialUI.TextField
                  style={{marginLeft: '10px'}}
                  onEnterKeyDown ={this.handleClick}
                  onChange={this._handleTextFieldChange}
                  hintText="Click Here To Search" />
              <MaterialUI.ToolbarSeparator/>
              </MaterialUI.ToolbarGroup>
              <MaterialUI.ToolbarGroup key={1} float="left">
                <MaterialUI.ToolbarSeparator/>
                <MaterialUI.TextField
                  style={{marginLeft: '10px'}}
                  onEnterKeyDown ={this.handleClick}
                  onChange={this._changeSearchType}
                  hintText="Enter Github or Stackoverflow" />
              </MaterialUI.ToolbarGroup>

              <MaterialUI.ToolbarGroup key={2} float="right">
                <MaterialUI.ToolbarTitle text="Click or press Enter" />
                <MaterialUI.ToolbarSeparator/>
                <div onClick={this.handleClick} style={{margin: '10px', float: 'left'}}>
                  <MaterialUI.RaisedButton label="Search" secondary={true} />
                </div>
              </MaterialUI.ToolbarGroup>
            </MaterialUI.Toolbar>
          <Results />
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

function sortByScore(questions){
  return _.sortBy(questions, function(o) { return o.question_score }).reverse();
}

var Results = React.createClass({
  render: function(){
    var searchNodes = searchResults.map(function (item) {
      console.log(item);
      if(searchType === 'stack'){
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

function getStackRes(item){
  var link = "http://stackoverflow.com/questions/" + item.question_id;
  return (
      <a className='no-underline' href={link}>
        <div className='git-card'>
          <MaterialUI.Card
          style={{
            backgroundColor: 'transparent',
            boxShadow: '1px 1px 3px black'
          }}>
            <MaterialUI.CardHeader
              title="Title"
              subtitle={item.title}
              avatar="http://gillespaquette.ca/images/stack-icon.png"
              style={{
                margin: '1%',
                width: '700px',
                overflow: 'hidden',
                float: 'left'
              }}/>
            <MaterialUI.CardHeader
              title="Answers"
              subtitle={item.answer_count}
              avatar="http://godlessmom.com/wp-content/uploads/2015/05/Question-mark-red-3D-glossy.jpg"
              style={{
                margin: '1%',
                width: '250px',
                overflow: 'hidden',
                float: 'left'
              }}/>
             <MaterialUI.CardHeader
              title="Score"
              subtitle={item.question_score}
              avatar="http://becu.studentchoice.org/assets/1/7/free-fico-score-experian.jpg"
              style={{
                margin: '1%',
                width: '200px',
                overflow: 'hidden',
                float: 'left'
              }}/>
           <MaterialUI.CardText
              style={{
                margin: '1%',
                clear: 'both',
                fontSize: '12px'
              }}>
              {item.body}
            </MaterialUI.CardText>
          </MaterialUI.Card>
        </div>
      </a>
  );
}

function getGitRes(item){
  return (
      <a className='no-underline' href={item.clone_url}>
        <div className='git-card'>
          <MaterialUI.Card
          style={{
            backgroundColor: 'transparent',
            boxShadow: '1px 1px 3px black'
          }}>
            <MaterialUI.CardHeader
              title="Repo"
              subtitle={item.name}
              avatar="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png"
              style={{
                margin: '1%',
                width: '350px',
                overflow: 'hidden',
                float: 'left'
              }}/>
            <MaterialUI.CardHeader
              title="Owner"
              subtitle={item.owner.login}
              avatar={item.owner.avatar_url}
              style={{
                margin: '1%',
                width: '250px',
                overflow: 'hidden',
                float: 'left'
              }}/>
             <MaterialUI.CardHeader
              title="Stars"
              subtitle={item.stargazers_count}
              avatar="http://stylinova.com/img/admin/star-icon.png"
              style={{
                margin: '1%',
                width: '200px',
                overflow: 'hidden',
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
        </div>
      </a>
  );
}
