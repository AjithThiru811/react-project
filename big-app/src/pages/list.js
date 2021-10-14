import React, { Component } from 'react';
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'
import "../css/list.css";

class List extends Component {

    state = {
        list: [],
        originalList: [],
        columns: [],
        inputSearchText: '',
    }

    componentDidMount = () => {
        this.fetchList();
    }

    fetchList = () => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                return response.json();
            })
            .then(result => {
                var table = [];
                table = result;
                var dataToBeDisplayed = [];
                var object = {};
                for (var i = 0; i < table.length; i++) {
                    object = {
                        'detail': {
                            'name': table[i].name,
                            'mail': table[i].email
                        },
                        'phone': table[i].phone,
                        'userName': table[i].username,
                        'companyName': table[i].company.name,
                    }
                    dataToBeDisplayed.push(object);
                    this.state.originalList = dataToBeDisplayed;
                    this.state.list = dataToBeDisplayed;
                    this.setState(this.state);
                }
            })
            .catch(error => {
                // ""
            });
    }

    searchIconClicked = () => {
        var text = document.getElementById("searchInput").value;
        if(text != '') {
            var searchList = [];
            for(var i = 0; i < this.state.originalList.length; i++) {
                if(this.state.originalList[i].detail.name.includes(text)) {
                    searchList.push(this.state.originalList[i]);
                }
            }
            this.state.list = searchList;
            this.setState(this.state);
        }
        else {
            this.state.list = this.state.originalList;
            this.setState(this.state);
        }
    }

    render() {
        return (
            <div id="listPage">
                <div className="searchBox">
                    {/* <a href="/selector"><span className="link">Selector</span></a> */}
                    <span>
                        <input id="searchInput" placeholder="Search" />
                        <span onClick={this.searchIconClicked}>
                            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"/></svg>
                        </span>
                    </span>
                </div>
                <ReactTable
                    data={this.state.list}
                    columns={[{
                        Header: 'Full Name',
                        accessor: 'detail',
                        Cell: props => <span className='userDetails'><div>{props.value.name}</div><div>{props.value.mail}</div></span>
                    }, {
                        Header: 'Phone',
                        accessor: 'phone',
                    }, {
                        Header: 'User Name',
                        accessor: 'userName',
                    }, {
                        Header: 'Company Name',
                        accessor: 'companyName',
                    }]}
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                          onClick: (e, handleOriginal) => {
                            // console.log('It was in this row:', rowInfo.original.detail.name)
                            window.location = "/selector"
                          }
                        }
                      }}
                />

            </div>
        )
    }
}

export default List;