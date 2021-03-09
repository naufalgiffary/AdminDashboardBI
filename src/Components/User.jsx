import React, { useEffect, useState } from 'react';
import './style.css'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios'
import SideMenu from '../View/Sidemenu'
import HeaderUser from '../View/HeaderUser'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'gray',
        '&:hover': {
            backgroundColor: 'gainsboro',
        },
        marginRight: theme.spacing(70),
        marginTop: '5px',
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '35ch',
        },
    }
}));

const Users = (props) => {
    const classes = useStyles();
    const [userData, setuserData] = useState([])
    const [totalUser, settotalUser] = useState(null)
    const [find, setFind] = useState('')
    const [filterPerson, setfilterPerson] = useState([])
    const History = useHistory()

    useEffect(() => {
        var tokenCook = Cookies.get('token')
        if (!tokenCook) {
            History.push('/login')
        }
        Axios.get('https://devapi.kmdcargo.com/users', {
            headers: {
                "Authorization": `Bearer ${tokenCook}`
            }
        })
            .then((res) => {
                console.log(res.data.data);
                setuserData(res.data.data)
                settotalUser(res.data.data.length)
            }).catch((err) => console.log(err))
    }, [])


    useEffect(() => {
        const getFindData = (data) => {
            if(data) {
                let reduxPeople = userData
                var validperson = reduxPeople.filter((val, ind)=> {
                    return val.email.toLocaleLowerCase().includes(data)
                })
                console.log(validperson);
                setfilterPerson(validperson)
            } else {
                setfilterPerson('')
            }
        }
        getFindData(find)
    },[find, userData])

    const logOut = () => {
        Swal.fire({
            title: 'Yakin keluar?',
            text: "Anda akan keluar dari web admin!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, keluar!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear()
                Cookies.remove('token')
                Cookies.remove('name')
                Swal.fire(
                    'Telah Keluar!',
                    'Anda telah keluar.',
                    'success'
                )
                window.location.href = window.location.origin
            }
        })
    }

    var userName = JSON.parse(localStorage.getItem('name'))

    const renderTable = () => {
        let allData
        if(!filterPerson) {
            let reduxPeople = userData
            allData = reduxPeople.map((user, index) => {
                return (
                    <TableRow key={index}>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {user.name}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {user.email}
                            </div>
                        </TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {user.address}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {user.ktp ? user.ktp : "belum ada"}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {user.mark ? user.mark : "belum ada"}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                data: {user.data_id}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto', boxSizing: 'border-box', backgroundColor: 'gainsboro' }}>
                                {user.active ? "Sudah di Acc" : "Belum di Acc"}
                            </div>
                        </TableCell>
                    </TableRow>
                )
            })
        } else {
            allData = filterPerson.map((user, index) => {
                return (
                    <TableRow key={index}>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {user.name}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {user.email}
                            </div>
                        </TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {user.address}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {user.ktp ? user.ktp : "belum ada"}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {user.mark ? user.mark : "belum ada"}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                data: {user.data_id}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto', boxSizing: 'border-box', backgroundColor: 'gainsboro' }}>
                                {user.active ? "Sudah di Acc" : "Belum di Acc"}
                            </div>
                        </TableCell>
                    </TableRow>
                )
            })
        }
        return allData
    }

    return (
        <>
            <div className='header'>
                <div className="section">
                    <div className="logoside">
                        <div className="hamburger"><span><i className="fas fa-bars"></i></span></div>
                        <div className="thelogo">
                            <div className="insidelogo">
                                <img width='100%' height='100%' alt="logo" />
                            </div>
                        </div>
                    </div>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Cari dengan Email"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e)=> setFind(e.target.value.toLocaleLowerCase())}
                        />
                    </div>
                    <div className="loginside">
                        <div onClick={logOut} className="welcome hidewelcome"><span className='blockname'>{userName}</span></div>
                    </div>
                </div>
            </div>
            <SideMenu />
            <div className="mainsection">
                <div style={{ fontWeight: 'bolder', marginBottom: '10px' }}>
                    Menampilkan 1 - 10 dari {totalUser}
                </div>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table" style={{ width: "auto", tableLayout: "auto" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nama</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Nomor HP</TableCell>
                                    <TableCell>Alamat</TableCell>
                                    <TableCell>KTP</TableCell>
                                    <TableCell>Kode Marking</TableCell>
                                    <TableCell>Password</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {renderTable()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </>
    )
}

export default Users;