import React from 'react';
// import Popup from "reactjs-popup";
import currentTime from './helper';

class CreateCampagin extends React.Component{
  constructor(props){
    super(props);
    this.state={
      id:null,
      name:null,
      time:null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (evt) {
    let cTime = currentTime();
    if(evt.target.name === 'id')
      this.setState({id:evt.target.value});
    else
      this.setState({name:evt.target.value});
    this.setState({time:cTime});
    // this.setState({ [evt.target.name]: evt.target.value },{time:cTime});
  }
  render(){
    let id =this.state.id;
    let time =this.state.time;
    let name =this.state.name;
    return(
      <div className="createCampagin">
      <label> Id:
      <input type='text' name='id' onChange={this.handleChange} />
      </label>
      <br />
      <label> Campagin Name:
      <input type='text' name='name' onChange={this.handleChange} />
      </label>
      <br />
      <button className='createBtn' onClick={this.props.createCampaginBtn.bind(this,id, name,time)}>Create</button>
      </div>
    );
  }
}

export default CreateCampagin;
