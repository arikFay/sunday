      //-----React & CSS -------//
import React, { Component } from 'react'
import './SharedDasd.css';
import "react-table/react-table.css";

      //------antd------//
import {  Icon, Modal, Button } from 'antd';

     //-----import status img-----//
import successImg from '../../../../img/checked.png';
import failImg from '../../../../img/error.png';
import progressImg from '../../../../img/time-left.png';

    //-------teams color select-------//
import chroma from 'chroma-js';
import Select from 'react-select';

    //------Bootstrap React Table-----//
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

    //-------Redux--------//
import { connect } from 'react-redux';

    //----------import Actions---------//
import { openSessionHandler , openModalHandler , closeModalHandler , onDeleteMadorHandler , ifselecthandler,ifnoselecthandler ,SelectMador  } from '../../../../store/actions/dataDashboards';
import { onlineusersHandler } from '../../../../store/actions/General';
import { sync } from 'glob';
import { async } from 'q';


//---------------Add Teams--------------//

const colourOptions = [
  { value: '1', label: 'Ocean', color: '#00B8D9', isFixed: true }
];


const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};




const jobTypes = [ {
  value: '1',
  text: 'בוצע'
}, {
  value: '2',
  text: 'ממתין'
}, {
  value: '3',
  text: 'בתהליך'
} ];


// validator function pass the user input value and should return true|false.
function validatorText(value) {
  const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
  if (!value) {
    response.isValid = false;
    response.notification.type = 'error';
    response.notification.msg = 'Value must be inserted';
    response.notification.title = 'Requested Value';
  } 
  return response;
}

function jobStatusValidator(value) {
  const nan = isNaN(parseInt(value, 10));
  if (nan) {
    return 'Job Status must be a integer!';
  }
  return true;
}


//--------------------------------//

class SharedDash extends Component  {
  constructor(props){
    super(props);
    this.onSelectAll = this.onSelectAll.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
    this.state = {
    //   // data: [],
      socket: this.props.login.socket,
      selected: [],
      currPage: 1,
      oldvalue: "",
      teams: [],
    //   popId: [],
    //   visible: false,
      selectedOptions: [],
    }
  }

  componentDidMount(){
    this.props.openSession(this.props.login.socket);
    this.props.onlineUsers(this.props.login.socket);
    }

   
  onAfterInsertRow = (row) => {
    var rowStr = '';
    rowStr += "{"
    for (const prop in row) {
        rowStr += "\"" + prop + "\"" + ': ' + "\""  + row[prop] + "\","  + '\n';
    }
    rowStr = rowStr.substring(0, rowStr.length - 2);
    rowStr += "}"
    alert('The new row is:\n ' + rowStr);
    this.props.login.socket.emit("create", rowStr);
    return false;
  }

  onRowSelect = ({msd}, isSelected) => {
    console.log(msd)
    if (isSelected ) {
      this.setState({
        selected: [ ...this.state.selected, msd ].sort(),
        currPage: this.refs.table.state.currPage
      });
    } else {
      this.setState({ selected: this.state.selected.filter(it => it !== msd) });
    }
    return false;
  }

  onSelectAll(isSelected) {
    if (!isSelected) {
      this.setState({ selected: [] });
    }
    return false;
  }


  invalidJobStatus = (cell, row) => {
    // console.log(`${cell} at row id: ${row.id} fails on editing`);
    return 'invalid-jobstatus-class';
  }

  editingJobStatus = (cell, row) => {
    this.setState({ oldvalue : cell})
    // console.log(`${cell} at row id: ${row.id} in current editing`);
    return 'editing-jobstatus-class';
  }


  onAfterSaveCell = (row, cellName, cellValue, cellOldValue) => {
    // alert(`Save cell ${cellName} with value ${cellValue}`);
    console.log("old",cellOldValue)
  if(cellValue == this.state.oldvalue){
    console.log("same value")
    return false;
  }
    var rowStr = '';
    // rowStr += "["
    rowStr += "{"
    for (const prop in row) {
        rowStr += "\"" + prop + "\"" + ': ' + "\""  + row[prop] + "\","  + '\n';
    }
      
    rowStr = rowStr.substring(0, rowStr.length - 2);
 

    rowStr += "}"
    // rowStr += "]"
    this.props.login.socket.emit("editrec", rowStr);
    // alert('Thw whole row :\n' + rowStr);
  }
  
   onBeforeSaveCell = (row, cellName, cellValue, celloldvalue) => {
    // console.log("old" , celloldvalue);
    //  console.log(cellName);
      if((cellName == "date") && (cellValue == ''))
      {
       alert("לא נמצא תאריך !")
       return false;
      }
       return true;
  }

  buttonFunction = (cell,row) => {
    return (
      <Icon className='btnInfo'  type="info-circle" onClick={() =>  this.showModal(cell,row)} />
    )
  }


   showModal =  async (cell,row) => {
    // console.log("fff", row);
     await row.teams.forEach((teams) => {
        this.props.SelectM(teams);
    })
    // for(var i of row.teams){
    //   console.log("value",i._id,"name",i.name)
    //   this.setState({
    //     teams: [ ...this.state.teams, {value: i._id, label: i.name, color: '#666666'} ].sort()
    //   });
    // }
    // console.log("teams" + this.state.teams)
    // console.log(this.state.teams)
    // console.log("teams", row.teams)
    this.setState({visible: true});
    console.log("madors", this.props.sharedash.madors)
    // console.log("yay", this.state.teams)
    //   this.props.Changeid(row)
    // console.log(this.props.data.id);
    // this.props.data.id.teams.ForEach(item => (
    //   colourOptions.push({value: item.id, label: item.name, color: '#666666'})
    //   // <li key={item}>{item}</li>
    // ))

    // this.state.popId.teams.map((tesdf ))
    // for(var i in this.state.popId.teams){
    //   // colourOptions.push({ value: })
    // // console.log("name: " + i.teams.name + " id: "+i.teams.id)
    // colourOptions.push({value: i.teams.id, label: i.teams.name, color: '#666666'})
    // }
  };

  handleOk = e => {
    console.log(this.state.selectedOptions)
    // console.log(this.state.popId.msd)
    // console.log(this.state.popId.teams)
    this.setState({
      visible: false,
      selectedOptions: []
    });
    this.props.DeleteMador()
  
  };

  handleCancel = e => {
    console.log(this.state.selectedOptions)
    this.setState({
      visible: false,
      selectedOptions: []
    });
    this.props.DeleteMador()
  };

  handleChange = (selectedOptions) => {
    this.setState({ selectedOptions });
  }
  


  // onRowSelect = ({msd}, isSelected) => {
  //   if (isSelected ) {
  //     this.setState({
  //       selected: [ ...this.state.selected, msd ].sort(),
  //       currPage: this.refs.table.state.currPage
  //     });
  //   } else {
  //     this.setState({ selected: this.state.selected.filter(it => it !== msd) });
  //   }
  //   console.log("selected", this.state.selected)
  //   return false;
  // }


  onDeleteRow = () => { 
    console.log("selected!!!",this.state.selected);
    this.props.login.socket.emit("delete", this.state.selected);

    this.setState({ selected: [] });

  }
  
  render(){

    const {
      currPage
    } = this.state;


    const selectRowProp = {
      mode:'checkbox',
      clickToSelect: true,
      onSelect: this.onRowSelect,
      selected: this.state.selected
    };

    const cellEditProp = {
      mode: 'dbclick',
      blurToSave: true,
      beforeSaveCell: this.onBeforeSaveCell, // a hook for before saving cell
      afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell
    };

 

    const qualityType = {
      1: <div>בוצע<img className='imgStatus' src={successImg} alt="successImg" /></div>,
      2: <div>ממתין<img className='imgStatus' src={failImg} alt="failImg" /></div>,
      3: <div>בתהליך<img className='imgStatus' src={progressImg} alt="progressImg" /></div> 
      
    };

    
    function enumFormatter(cell, row, enumObject) {
      return enumObject[cell];
    }

    const { selectedOptions } = this.state;

    const options = {
      afterInsertRow: this.onAfterInsertRow,   // A hook for after insert rows
      sizePerPageList: [ 5, 10, 15, 20 ],
      sizePerPage: 10,
      page: currPage,
      sortName: 'msd',
      sortOrder: 'desc',
      onDeleteRow: this.onDeleteRow,
      page: 1,  // which page you want to show as default
      sizePerPageList: [ {
        text: '11', value: 11
      }], // you can change the dropdown list for size per page
      sizePerPage: 11,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: 'קודם', // Previous page button text
      nextPage: 'הבא', // Next page button text
      firstPage: 'ראשון', // First page button text
      lastPage: 'אחרון', // Last page button text
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      // paginationPosition: 'top'  // default is bottom, top and both is all available
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
    };
   

    
  return (
    
    
    <div className='SharedDasd'>

    <h1 className='header'>לוח פעילות משותף</h1>
    <div class="btn-group btn-group-sm" role="group">
      <button type="button" class="btn btn-success react-bs-table-csv-btn  hidden-print">
        <span>
          <i class="fa glyphicon glyphicon-export fa-download"></i>
           יצא לאקסל
          </span>
      </button>
      <button type="button" class="btn btn-info react-bs-table-add-btn ">
        <span><i class="fa glyphicon glyphicon-plus fa-plus">
          </i> 
          חדש
        </span>
      </button>
      <button type="button" class="btn btn-warning react-bs-table-del-btn " onClick={() => this.onDeleteRow(this.props.login.socket,this.state.selected)}>
        <span>
          <i class="fa glyphicon glyphicon-trash fa-trash"></i> 
          מחיקה
        </span>
      </button>
    </div>
    
    
<BootstrapTable 
          striped hover condensed
          className='dataTable' 
          ref='table'
          data={ this.props.sharedash.data } 
          cellEdit={this.props.login.role == "admin" ? cellEditProp : false} 
          toggle= {<button>click</button>}
          // insertRow={this.props.login.role == "admin" ? true : false }
          selectRow={ this.props.login.role == "admin" ? selectRowProp : false}
          // deleteRow={this.props.login.role == "admin" ? true : false }
          // exportCSV= {this.props.login.role == "admin" ? true : false }
          search
          options={ options }
          pagination
          headerStyle={ { fontSize: '2rem' } }
          bodyStyle={ { fontSize: '2rem' } }
            >

          <TableHeaderColumn 
          // width='70' 
          className='columnStyle'  
          dataField="button" 
          editable={ false }  
          dataFormat={this.buttonFunction}
          >
          מידע נוסף
          </TableHeaderColumn>

          <TableHeaderColumn 
          className='columnStyle' 
          // width='95' 
          dataField='status' 
          editColumnClassName={ this.editingJobStatus } 
          invalidEditColumnClassName={ this.invalidJobStatus }
          dataAlign='right'
          dataFormat={ enumFormatter }
          formatExtraData={ qualityType }
          editable={ { type: 'select', options: { values: jobTypes } }} 
          >
            סטאטוס
          </TableHeaderColumn>

          <TableHeaderColumn 
          width='200' 
          className='columnStyle' 
          dataField='description' 
          editable={ this.props.login.role == "admin" ? { validator: validatorText } : false } 
          editColumnClassName={ this.editingJobStatus } 
          invalidEditColumnClassName={ this.invalidJobStatus }
          dataAlign='right'>
            פירוט משימה
          </TableHeaderColumn>

          <TableHeaderColumn 
          className='columnStyle' 
          // width='70' 
          dataField='sitenumber' 
          editable={ this.props.login.role == "admin" ? { validator: validatorText } : false }
          editColumnClassName={ this.editingJobStatus } 
          invalidEditColumnClassName={ this.invalidJobStatus }
          dataAlign='right'>
            מספר אתר
          </TableHeaderColumn>


          <TableHeaderColumn 
          // width='80' 
          className='columnStyle' 
          dataField='sitename' 
          editable={ this.props.login.role == "admin" ? { validator: validatorText } : false } 
          editColumnClassName={ this.editingJobStatus } 
          invalidEditColumnClassName={ this.invalidJobStatus }
          dataAlign='right'>
            שם אתר
          </TableHeaderColumn>

          <TableHeaderColumn
          // width='100'
          className='columnStyle'
          dataField='budgetunit' 
          dataAlign='right' 
          hidden={true}
          >
          יחידה מתקצבת
          </TableHeaderColumn>

          <TableHeaderColumn 
          // width='90' 
          className='columnStyle' 
          dataField='contact' 
          editable={ this.props.login.role == "admin" ? { validator: validatorText } : false }
          dataAlign='right'>
            איש קשר
          </TableHeaderColumn>

          <TableHeaderColumn 
          // width='90'
          className='columnStyle' 
          dataField='network' 
          editable={ this.props.login.role == "admin" ? { validator: validatorText } : false }
          editColumnClassName={ this.editingJobStatus } 
          invalidEditColumnClassName={ this.invalidJobStatus }
          dataAlign='right'>
            רשת
          </TableHeaderColumn>

          <TableHeaderColumn  
          width='170'
          className='columnStyle'
          dataField='datetime' 
          editable={ this.props.login.role == "admin" ? { type: 'date' } : false }
          dataAlign='right'>
          תאריך
          </TableHeaderColumn>

          <TableHeaderColumn
          width='160'
          className='columnStyle'
          dataAlign='right' 
          dataField='msd' 
          // editable={ false } 
          isKey={ true }>
          מס"ד
          </TableHeaderColumn>
        
 </BootstrapTable>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Select
            closeMenuOnSelect={false}
            value={selectedOptions}
            onChange={this.handleChange}
            // defaultValue={}
            isMulti
            options={this.props.sharedash.madors}
            styles={colourStyles}
           />
        </Modal>

      
        </div>
    )
  }
};

const mapStateToProps = state => {
  return {
      login : state.login,
      sharedash: state.dataDashboards,
      data: state.General
  }
}

const mapDispatchToProps = dispatch => {
  return {
      openSession: (socket) => dispatch(openSessionHandler(socket)),
      // onDeleteRow: (socket, id) => dispatch(onDeleteRowHandler(socket, id)),
      openModal: (id) => dispatch(openModalHandler(id)),
      closeModal: (id) => dispatch(closeModalHandler(id)),

      onlineUsers: (socket) => dispatch(onlineusersHandler(socket)),
      // onRowSelect: (page) => dispatch(onRowSelectedHandler(page)),
      ifselect: (msd,page) => dispatch(ifselecthandler(msd,page)),
      ifnoselect: (msd,page,selected) => dispatch(ifnoselecthandler(msd,page,selected)),
      SelectM: (data) => dispatch(SelectMador(data)),
      DeleteMador: () => dispatch(onDeleteMadorHandler()),
      // onGridRowsUpdated: (fromRow, toRow, updated) => dispatch(onGridRowsUpdatedHandler(fromRow, toRow, updated))
      

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharedDash);

