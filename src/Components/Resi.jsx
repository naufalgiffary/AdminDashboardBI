import React, { useEffect, useState } from 'react';
import './style.css'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
import HeaderResi from '../View/HeaderResi'
import SideMenu from '../View/Sidemenu'
import Cookies from 'js-cookie'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Swal from 'sweetalert2'

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

const Resi = (props) => {
    const classes = useStyles();
    const [resiData, setresidata] = useState([])
    const [find, setFind] = useState('')
    const [filteredData, setfilteredData] = useState([])
    const [totalResi, setTotalResi] = useState(null)
    const History = useHistory()

    useEffect(() => {
        var tokenCook = Cookies.get('token')
        if (!tokenCook) {
            History.push('/login')
        }
        Axios.get('https://devapi.kmdcargo.com/orders', {
            headers: {
                "Authorization": `Bearer ${tokenCook}`
            }
        })
            .then((res) => {
                console.log(res.data.data);
                setresidata(res.data.data)
                setTotalResi(res.data.data.length)
            }).catch((err) => console.log(err))
    }, [])


    useEffect(() => {
        const getFindData = (data) => {
            if (data) {
                let reduxData = resiData
                var validData = reduxData.filter((val, ind) => {
                    return val.resi.toLocaleLowerCase().includes(data)
                })
                console.log(validData);
                setfilteredData(validData)
            } else {
                setfilteredData('')
            }
        }
        getFindData(find)
    }, [find, resiData])

    var userName = JSON.parse(localStorage.getItem('name'))


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

    const renderTable = () => {
        let allData
        if (!filteredData) {
            let reduxData = resiData
            allData = reduxData.map((resi, index) => {
                return (
                    <TableRow key={index}>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.mark}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.resi}
                            </div>
                        </TableCell>
                        <TableCell>{resi.barcode}</TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.good}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.rmb}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.supp}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.ctns}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.qty}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.weight}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.volume}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.giw}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.loading}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.otw}
                            </div>
                        </TableCell>
                    </TableRow>
                )
            })
        } else {
            allData = filteredData.map((resi, index) => {
                return (
                    <TableRow key={index}>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.mark}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.resi}
                            </div>
                        </TableCell>
                        <TableCell>{resi.barcode}</TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.good}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.rmb}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.supp}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.ctns}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.qty}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.weight}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.volume}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.giw}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.loading}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ width: 'auto' }}>
                                {resi.otw}
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
                            placeholder="Cari dengan Kode Marking atau Resi"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => setFind(e.target.value.toLocaleLowerCase())}
                        />
                    </div>
                    <div className="loginside">
                        <div onClick={logOut} className="welcome hidewelcome"><span className='blockname'>{userName}</span></div>
                    </div>
                </div>
            </div>
            <SideMenu />
            <div className="mainsection">
                <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row-reverse' }}>
                    <Link to='/upload'>
                        <Button style={{ background: 'gray', border: 'none', width: '150px', height: '30px', marginBottom: '10px' }} className='my-2'>
                            Upload Resi
                    </Button>
                    </Link>
                    <div style={{ fontWeight: 'bolder' }}>
                        Menampilkan 1 - 10 dari {totalResi}
                    </div>
                </div>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table" style={{ width: "auto", tableLayout: "auto" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Kode Marking</TableCell>
                                    <TableCell>Resi</TableCell>
                                    <TableCell>Barcode</TableCell>
                                    <TableCell>Barang</TableCell>
                                    <TableCell>RMB</TableCell>
                                    <TableCell>Supp</TableCell>
                                    <TableCell>CTNS</TableCell>
                                    <TableCell>Qty</TableCell>
                                    <TableCell>Berat</TableCell>
                                    <TableCell>Volume</TableCell>
                                    <TableCell>Tgl GIW</TableCell>
                                    <TableCell>Tgl Loading</TableCell>
                                    <TableCell>OTW</TableCell>
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

export default Resi;