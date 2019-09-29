import React, { Component } from 'react';
import './MyDash.css';
import Card from './Card/Card';
import PlusIcon from '../../../../img/plus-icon.png';
import { Modal, Button, Input, DatePicker, Checkbox, notification } from 'antd';
import chroma from 'chroma-js';
import Select from 'react-select';
import { connect } from 'react-redux';

import { GetMadorsHandler, DeleteMadorsHandler, ShowModalHandler, HandleOKHandler, HandleCancelHandler, HandleChangeHandler, onChangeHandler, onSubmitHandler, OnUpdateHandler, UpdateMissionDataHandler, UpdateMissionDateHandler, GetDataHandler } from '../../../../store/actions/MyDashboards';


const openNotificationWithIcon = type => {
  notification[type]({
    message: 'המשימה הוספה בהצלחה',
    description:
      'תוכל לראותה בלו"ז משימות משתוף.',
  });
};



class MyDash extends Component {
  state = {
    missions: [
      { name: 'arik', mission: 'blah' },
      { name: 'lior', mission: 'blah blah' }
    ],
    checked: false
    // visible: false,
    // selectedOptions: [],
  }


  componentDidMount() {
    if (this.props.mydata.flagLoop == null)
      this.props.GetMadors(this.props.login.socket,this.props.login.userID);
      this.props.GetData(this.props.login.socket,this.props.login.userID);
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
    const dateFormatList = ['DD-MM-YYYY', 'DD-MM-YY'];
    const { TextArea } = Input;
    const { description, stand, date, budgetsum, creator, network, sitenumber, sitename, note } = this.props.mydata.missionData;
    const { teams } = this.props.mydata.missionData;
    // console.log(this.props.mydata.madorselected)
    // const { selectedOptions } = this.state;
    return (
      <div className='container'>
        <h6 className='Mission'>המשימות שלי</h6>
        <div className='Cards'>
          <div className='CardPlus' onClick={this.props.showModal}>
            <img className='plusIcon' src={PlusIcon} alt="PlusIcon" />
          </div>
          {this.state.missions.map((card) =>
            <Card
              name={card.name}
              mission={card.mission}
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
          destroyOnClose= {true}
          footer={[
            
            <div>
              <div>
                <Button key="back" onClick={this.props.handleCancel}>
                  צא
                </Button>
                <Button key="submit" type="primary" onClick={() => (this.props.onSubmit(this.props.login.socket,this.props.mydata.missionData,this.props.login.userID),openNotificationWithIcon('success'))}>
                  סיים
                </Button>
              </div>
            </div>
          ]}
        >
          <div className='MadorArea'>
            <div className="InputArea">
              <Input className='inputData' placeholder="תיאור המשימה"
                value={description}
                onChange={(e) => this.props.UpdateMissionData(e)}
                name='description'
              />
              <DatePicker placeholder="בחר תאריך" className='inputData' format={dateFormatList}
                onChange={(date,dateString) => this.props.UpdateMissionDate(dateString)}
              />
              <Input className='inputData' placeholder="תקציב"
                value={budgetsum}
                onChange={(e) => this.props.UpdateMissionData(e)}
                name='budgetsum'
              />
              <TextArea className='inputData Notes' placeholder="הערות" autosize={{ minRows: 6, maxRows: 6 }}
                value={note}
                onChange={(e) => this.props.UpdateMissionData(e)}
                name='note'
              />
              <Input className='inputData' placeholder="רשת"
                value={network}
                onChange={(e) => this.props.UpdateMissionData(e)}
                name='network'
              />

              <Input className='inputData' placeholder="מספר אתר"
                value={sitenumber}
                onChange={(e) => this.props.UpdateMissionData(e)}
                name='sitenumber'              
              />
              <Input className='inputData' placeholder="שם אתר"
                value={sitename}
                onChange={(e) => this.props.UpdateMissionData(e)}
                name='sitename'  
              />
            </div>
            <div className='checkBoxArea'>
              <h4>בחירת משתתפים במשימה</h4>
              {this.props.mydata.madors.map((check) =>
                <Checkbox
                  onChange={this.props.onChange}
                  value={check.value}
                  label={check.label}
                  // checked={this.state.checked}
                >
                  {check.label}
                </Checkbox>
              )}
            </div>
            <div className='inputMadorArea'>
              {this.props.mydata.madorselected.map((mador) =>
              
                <div className='InputMadorData'>
                  <h4 >{mador.label}</h4>
                  <Input className='inputData' placeholder="תקציב"
                    value={this.props.mydata.madorselected.length > 0 ? teams[mador.value].budget : ""}
                    onChange={(e) => this.props.updateHandler(e, mador.value)}
                    name='budget' 
                  />
                  <TextArea className='inputData Notes' placeholder="הערות" autosize={{ minRows: 3, maxRows: 3 }}
                  value={this.props.mydata.madorselected.length > 0 ? teams[mador.value].notes: ""}
                  onChange={(e) => this.props.updateHandler(e, mador.value)}
                  name='notes' 
                  />
                </div>
              )}

            </div>
          </div>

        </Modal>
        {/* <button onClick={() => this.props.updateHandler(123123) }>click me</button>
        <button onClick={() => this.props.updateHandler(321321) }>click me</button>
        <button onClick={() => this.props.updateHandler(456654) }>click me</button> */}
        {/* <button onClick={() => Modal.destroyAll() }>click me1</button> */}

      </div>
    )
  }
}




const mapStateToProps = state => {
  return {
    mydata: state.MyDashboards,
    login: state.login,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    GetMadors: (socket,user) => dispatch(GetMadorsHandler(socket,user)),
    DeleteMadors: () => dispatch(DeleteMadorsHandler()),
    showModal: () => dispatch(ShowModalHandler()),
    handleOk: () => dispatch(HandleOKHandler()),
    handleChange: (selected) => dispatch(HandleChangeHandler(selected)),
    handleCancel: () => dispatch(HandleCancelHandler(Modal)),
    onChange: (e) => dispatch(onChangeHandler(e)),
    onSubmit: (socket,mission,user) => dispatch(onSubmitHandler(socket,mission,user)),
    updateHandler: (e,id) => dispatch(OnUpdateHandler(e,id)),
    UpdateMissionData: (e) => dispatch(UpdateMissionDataHandler(e)),
    UpdateMissionDate: (date) => dispatch(UpdateMissionDateHandler(date)),
    GetData: (socket,user) => dispatch(GetDataHandler(socket,user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDash);