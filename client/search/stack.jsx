getStackRes = function(item){
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
