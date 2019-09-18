import React, { Component } from 'react';
import './MyDash.css';
import Card from './Card/Card';
import PlusIcon from '../../../../img/plus-icon.png';
import { Modal, Button , Input , DatePicker, Checkbox  } from 'antd';
import chroma from 'chroma-js';
import Select from 'react-select';
import { connect } from 'react-redux';

import { GetMadorsHandler, DeleteMadorsHandler, ShowModalHandler , HandleOKHandler, HandleCancelHandler, HandleChangeHandler , onChangeHandler } from '../../../../store/actions/MyDashboards';






class MyDash extends Component {
  state = {
    missions: [
      {name: 'arik' , mission: 'blah'}, 
      {name: 'lior' , mission: 'blah blah'}
    ],
    // visible: false,
    // selectedOptions: [],
  }


  componentDidMount() {
    if(this.props.mydata.flagLoop == null)
      this.props.GetMadors(this.props.login.socket);
  }

  // function onChange(e) {
  //   console.log(`checked = ${e.target.checked}`);
  // }


  // showModal = () => {
  //   console.log("mador befor", this.props.mydata.madors)
  //   this.props.GetMadors(this.props.login.socket);
  //   console.log("mador after", this.props.mydata.madors)
  //   this.setState({
  //     visible: true,
  //   });
  // };

  // handleOk = e => {
    
  //   // console.log(e);
  //   // this.props.DeleteMadors();

  //   this.setState({
  //     visible: false,
  //     selectedOptions: []
  //   });
  //   this.props.DeleteMadors();
  // };

  // handleCancel = e => {
  //   // this.props.DeleteMadors();
  //   // console.log(e);
  //   this.setState({
  //     visible: false,
  //     selectedOptions: []
  //   });
  //   this.props.DeleteMadors();
  // };

  // handleChange = (selectedOptions) => {
  //   this.setState({ madorselected });
  // }

  render() {
    const statePanel = "start";
    const dateFormatList = ['DD-MM-YYYY', 'DD-MM-YY'];
    const { TextArea } = Input;
    console.log(this.props.mydata.madorselected)
    // const { selectedOptions } = this.state;
    return (
      <div className='container'>
        <h6 className='Mission'>המשימות שלי</h6>
        <div className='Cards'>
        <div className='CardPlus' onClick={this.props.showModal}>
          <img className='plusIcon' src={PlusIcon} alt="PlusIcon"  />
        </div>
        {this.state.missions.map((card) =>
          <Card
          name = {card.name}
          mission= {card.mission}
          />
          )}
        {/* <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/> */}
        </div>
          <Modal className='Model'
          visible={this.props.mydata.visible}
          title="יצירת משימה חדשה"
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          footer={[
            <Button key="back" onClick={this.props.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary"  onClick={this.props.handleOk}>
              Submit
            </Button>,
          ]}
        >
        <div className="InputArea">
          <Input className='inputData' placeholder="תיאור המשימה" />
          <DatePicker placeholder="בחר תאריך" className='inputData' format={dateFormatList} />
          <Input className='inputData' placeholder="תקציב" />
          <TextArea className='inputData Notes'  placeholder="הערות"  autosize={{ minRows: 6, maxRows: 6 }} />
          <Input className='inputData' placeholder="רשת" />
          <Input className='inputData' placeholder="מספר אתר" />
          <Input className='inputData' placeholder="שם אתר" />
          </div>
          <div className='checkBoxArea'> 
          <h4>בחירת משתתפים במשימה</h4>
          {this.props.mydata.madors.map((check) =>
            <Checkbox
              onChange={this.props.onChange}
              value={check.value}
              label={check.label}
            >
            {check.label}
            </Checkbox>
          )}
          </div>
        </Modal>
        

      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
      mydata: state.MyDashboards,
      login : state.login,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    GetMadors: (socket) => dispatch(GetMadorsHandler(socket)),
    DeleteMadors: () => dispatch(DeleteMadorsHandler()),
    showModal: () => dispatch(ShowModalHandler()),
    handleOk: () => dispatch(HandleOKHandler()),
    handleChange: (selected) => dispatch(HandleChangeHandler(selected)),
    handleCancel: () => dispatch(HandleCancelHandler()),
    onChange: (e) => dispatch(onChangeHandler(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDash);