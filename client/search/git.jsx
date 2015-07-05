getGitRes = function(item){
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
