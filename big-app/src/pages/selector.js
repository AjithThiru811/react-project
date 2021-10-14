import React, { Component } from 'react';
import { userDetails } from "./user_details";
import "../css/selector.css";

class Selector extends Component {

    state = {
        userDetails: userDetails[0],
        dragStartedName: null,
        dragStartedType: null,
        selectedLeftSideElements: [],
        selectedRightSideElements: [],
        selectAllClicked: false,
    }

    componentDidMount = () => {
    }

    dropped = (event, type) => {
        event.preventDefault();
        if (this.state.dragStartedType != type) {
            if (this.state.dragStartedType == "inactive") {
                this.state.userDetails.activePermissions.push(this.state.dragStartedName);
                const index = this.state.userDetails.inActivePermissions.indexOf(this.state.dragStartedName);
                if (index > -1) {
                    this.state.userDetails.inActivePermissions.splice(index, 1);
                }
            }
            else {
                this.state.userDetails.inActivePermissions.push(this.state.dragStartedName);
                const index = this.state.userDetails.activePermissions.indexOf(this.state.dragStartedName);
                if (index > -1) {
                    this.state.userDetails.activePermissions.splice(index, 1);
                }
            }
        }
        this.state.dragStartedName = null;
        this.setState(this.state);
    }

    dragStarted = (type, name) => {
        this.state.dragStartedName = name;
        this.state.dragStartedType = type;
        this.setState(this.state);
    }


    allowDrop = (event) => {
        event.preventDefault();
    }

    selectedOnElement = (dataIndex, tableType) => {
        this.state.selectAllClicked = false;
        if (tableType == "left") {
            this.state.selectedRightSideElements = [];
            const index = this.state.selectedLeftSideElements.indexOf(dataIndex);
            if (index > -1) {
                this.state.selectedLeftSideElements.splice(index, 1);
            }
            else {
                this.state.selectedLeftSideElements.push(dataIndex)
            }
        }
        else {
            this.state.selectedLeftSideElements = [];
            const index = this.state.selectedRightSideElements.indexOf(dataIndex);
            if (index > -1) {
                this.state.selectedRightSideElements.splice(index, 1);
            }
            else {
                this.state.selectedRightSideElements.push(dataIndex)
            }
        }
        this.setState(this.state);
    }

    isIndexSelected = (index, tableType) => {
        if (tableType == "left" && this.state.selectedLeftSideElements.indexOf(index) > -1) {
            return true;
        }
        if (tableType == "right" && this.state.selectedRightSideElements.indexOf(index) > -1) {
            return true;
        }
        return false;
    }

    moveNames = (type) => {
        if (type == "toRight") {
            if (!this.state.selectAllClicked) {
                for (var i = 0; i < this.state.selectedLeftSideElements.length; i++) {
                    this.state.userDetails.activePermissions.push(this.state.userDetails.inActivePermissions[this.state.selectedLeftSideElements[i]]);
                    this.state.userDetails.inActivePermissions.splice(this.state.selectedLeftSideElements[i], 1);
                }
            }
            else {
                for (var i = 0; i < this.state.userDetails.inActivePermissions.length; i++) {
                    this.state.userDetails.activePermissions.push(this.state.userDetails.inActivePermissions[i]);
                }
                this.state.userDetails.inActivePermissions = [];
            }
        }
        else {
            if (!this.state.selectAllClicked) {
                for (var i = 0; i < this.state.selectedRightSideElements.length; i++) {
                    this.state.userDetails.inActivePermissions.push(this.state.userDetails.activePermissions[this.state.selectedRightSideElements[i]]);
                    this.state.userDetails.activePermissions.splice(this.state.selectedRightSideElements[i], 1);
                }
            }
            else {
                for (var i = 0; i < this.state.userDetails.activePermissions.length; i++) {
                    this.state.userDetails.inActivePermissions.push(this.state.userDetails.activePermissions[i]);
                }
                this.state.userDetails.activePermissions = [];
            }
        }
        this.state.selectedLeftSideElements = [];
        this.state.selectedRightSideElements = [];
        this.setState(this.state);
    }

    onSelectAllClicked = (type) => {
        this.state.selectAllClicked = true;
        this.state.selectedLeftSideElements = [];
        this.state.selectedRightSideElements = [];
        if (type == "Left") {
            for (var i = 0; i < this.state.userDetails.inActivePermissions.length; i++) {
                this.state.selectedLeftSideElements.push(i);
            }
        }
        else {
            for (var i = 0; i < this.state.userDetails.activePermissions.length; i++) {
                this.state.selectedRightSideElements.push(i);
            }
        }
        this.setState(this.state);
    }

    render() {
        return (
            <div id="selectorPage">
                <div className="selectorPageInnerWrapper">
                    <a href="/list">Back</a>
                    <div style={{ marginTop: "20px" }}>{this.state.userDetails.userName}</div>
                    <div className="permissionWrapper">
                        <div className="inactivePermission d-inline-block" onDragOver={(event) => this.allowDrop(event)} onDrop={(event) => this.dropped(event, "inactive")}>
                            <div className="tableData" onClick={() => this.onSelectAllClicked("Left")}>Select All</div>
                            {
                                this.state.userDetails.inActivePermissions.map((item, index) => {
                                    var className = "tableData";
                                    if (this.isIndexSelected(index, "left")) {
                                        className = "tableData selected";
                                    }
                                    return (
                                        <div draggable="true" className={className} onClick={() => this.selectedOnElement(index, "left")} onDragStart={() => this.dragStarted("inactive", item)}>{item}</div>
                                    )
                                })
                            }
                        </div>
                        <div className="dividerCol d-inline-block">
                            <div className="moveToRight" onClick={() => this.moveNames("toRight")}></div>
                            <div className="moveToLeft" onClick={() => this.moveNames("toLeft")}></div>
                        </div>
                        <div className="activePermission d-inline-block" onDragOver={(event) => this.allowDrop(event)} onDrop={(event) => this.dropped(event, "active")}>
                            <div className="tableData" onClick={() => this.onSelectAllClicked("Right")}>Select All</div>
                            {
                                this.state.userDetails.activePermissions.map((item1, index) => {
                                    var className = "tableData";
                                    if (this.isIndexSelected(index, "right")) {
                                        className = "tableData selected";
                                    }
                                    return (
                                        <div draggable="true" className={className} onClick={() => this.selectedOnElement(index, "right")} onDragStart={() => this.dragStarted("active", item1)}>{item1}</div>
                                    )
                                })
                            }</div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Selector;