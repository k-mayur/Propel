import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import moment from 'moment'
// import DialogContentText from '@material-ui/core/DialogContentText';
// import TextField from '@material-ui/core/TextField';

export default class FormDialog extends React.Component {
    state = {
        input: '',
        date: '2019-05-04T10:30',
        open: false,
    };

    addTask = (e) => {
        if (this.state.input !== '' && this.state.date !== ''){
            this.props.addNewTask(this.state.input, this.state.date)
            this.setState({open:false})
        }
    }

    inputChange = (e) => this.setState({ input: e.target.value })

    dateChange = (e) => this.setState({ date: e.target.value })

    handleClickOpen = () => {
        this.setState({ open: true});
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Add Task</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add New Task</DialogTitle>
                    <DialogContent>
                        <textarea onChange={this.inputChange} placeholder="add text Drag down if needed"/>
                        <input onChange={this.dateChange} style={{ width: '200px' }} id="datetime-local" type="datetime-local" defaultValue={this.state.date}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.addTask} color="primary">
                            Add 
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
