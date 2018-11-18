import React from 'react';
import Popup from "reactjs-popup";

import Header from './Header';
import obj from './MockData';
import '../App.css';
import CreateCampagin from './CreateCampagin';
import comment from './img/comment.png';
import edit from './img/edit.png';
import play from './img/play.png';
import delete_icon from './img/delete.png';
import pause from './img/pause.png';

class MainApp extends React.Component{

  constructor(props){
    super(props);
    this.state={createdCampagin:false,
      campaginId:null,
      campaginPause: true,
      campaginComment: false,
      campgainEdit: false,
      campgainDelete: false,
      comment: ''
    };
    this.createCampagin= this.createCampagin.bind(this);
    this.createCampaginBtn = this.createCampaginBtn.bind(this);
    this.addCommentHandler = this.addCommentHandler.bind(this);
    this.commentChangeHandler = this.commentChangeHandler.bind(this);
  }

/*setting the state for opening the popup*/
  createCampagin(event){
    this.setState({createdCampagin:true});
  }

  /*function for create button */
  createCampaginBtn(id, name, time, event){
    let campagainInfo = {
      id:5,
      name: 'campagin 5- test',
      time: '3:30 pm'
    };
    obj.push(campagainInfo);
    this.setState({createdCampagin:false});
    this.closeModal();
  }

 /* pause and play handlers */
  pauseHandler(id, event){
    this.setState({campaginPause:false});
  }
  playHandler(id, event){
    this.setState({campaginPause:true});
  }

  /*comment handlers */
  commentHandler(id, event){
    this.setState({campaginComment:true});
  }

  commentChangeHandler(event){
    this.setState({comment: event.target.value});
  }

  addCommentHandler(event){
    this.closeModal();
  }

  /* delete handler */
  deleteHandler(id, event){
    for(var i=0; i< obj.length; i++){
      //console.log(obj[i].id);
      if(obj[i].id === id)
          obj.splice(i, 1);
    }
    this.setState({createdCampagin:false});
  }

  listElementClicked(key,id, event){
    console.log('id: '+key+' '+id+ event.target.name);
  }
  closeModal = () => {
    this.setState({ createdCampagin: false, campaginComment: false});
  };

  render(){
    const contentStyle = {
      maxWidth: "600px",
      width: "90%"
    };
    let peopleList='';
    if(obj.length>0){
      peopleList = obj.map( (character, i) => {
      let keyData = character.name;
      let id = character.id;
      let time = character.time;
      return( <ul key = {i}>
        <div style={{display:'inline-block'}}>
        <span>
        <li onClick = {this.listElementClicked.bind(this, keyData, id)}>{i+1} { character.name }</li>
        </span>
        <span>
        {this.state.campaginPause?
          <img style={{width:'30px',height:'30px', padding:'0 15px 0 0'}} src={pause} alt='comment'  onClick={this.pauseHandler.bind(this, id)} />
          : <img style={{width:'30px',height:'30px', padding:'0 15px 0 0'}} src={play} alt='comment' onClick={this.playHandler.bind(this, id)} />
        }
        <img style={{width:'30px',height:'30px', padding:'0 15px 0 0'}} src={comment} alt='comment' onClick={this.commentHandler.bind(this, id)} />
        <img style={{width:'30px',height:'30px',padding:'0 15px 0 0'}} src={edit} alt='comment' />
        <img style={{width:'30px',height:'30px', padding:'0 10px 0 0'}} src={delete_icon} alt='comment' onClick={this.deleteHandler.bind(this, id)} />
        </span>
        </div>
        <li>created on {time}</li>
      </ul>
    );
    });
    }
    return(
      <div className='mainApp'>
      <Header />
      <div className='campaginList'>Campagin List <span><button className='createcamgainBtn' onClick={this.createCampagin}>+ Create New</button></span></div>
      <div>{peopleList}</div>
          {/*creating popup to show form for creating a campaign */}
          <Popup
              open={this.state.createdCampagin}
              closeOnDocumentClick
              onClose={this.closeModal}
              contentStyle={contentStyle}
            >
            {close => (
          <div className="modal">
            <a className="close" onClick={this.closeModal}>
              &times;
            </a>
            <div className="header"> Create Campagain </div>
            <div className="content">
              {" "}
              <CreateCampagin createCampaginBtn={this.createCampaginBtn}/>
            </div>
          </div>
        )}
        </Popup>
        {/*create popup for showing the comment */}
        <Popup
            open={this.state.campaginComment}
            closeOnDocumentClick
            onClose={this.closeModal}
            contentStyle={contentStyle}
          >
          {close => (
        <div className="modal">
          <a className="close" onClick={this.closeModal}>
            &times;
          </a>
          <div className="header"> Add comment </div>
          <div className="content">
            {" "}
            <textarea rows="4" cols="50" onChange={this.commentChangeHandler} value= {this.state.comment} />
            <br />
            <button className="addcomment" onClick={this.addCommentHandler}>Add comment</button>
          </div>
        </div>
      )}
      </Popup>
    </div>
    );
  }
}

export default MainApp;
