import React, {useEffect, useState, useRef} from 'react';
import {Toolbar, Drawer, Divider} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {useSelector} from "react-redux";
import ReactMarkdown from "react-markdown";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles( (theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    typography: {
        fontSize: 16,
    },
    table: {
        minWidth: 650,
    },
}));


const MainWindow = () => {
    const classes = useStyles();
    const postState = useSelector( state => state.postState);
    const s7State = useSelector( state => state.s7State);

    const render_toolbar = () => {
        return <main className={classes.content}>
                 <Toolbar />
                    <Typography paragraph className={classes.typography}>
                      <ReactMarkdown source={postState.posts[postState.selected_post_idx-1].body} />
                    </Typography>
               </main>
    }

    const render_main = () => {
        if(postState.selected_post_idx === 100) {
            return <main className={classes.content}>
                     <Toolbar />
                        <TableContainer component={Paper}>
                          <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="right">air_uuid</TableCell>
                                <TableCell align="right">bg_amount</TableCell>
                                <TableCell align="right">bg_description</TableCell>
                                <TableCell align="right">bg_unit</TableCell>
                                <TableCell align="right">bg_weight</TableCell>
                                <TableCell align="right">code</TableCell>
                                <TableCell align="right">last_name</TableCell>
                                <TableCell align="right">name</TableCell>
                                <TableCell align="right">passport</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {s7State.s7baggages.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell align="right">{row.air_uuid}</TableCell>
                                    <TableCell align="right">{row.baggabe_amount}</TableCell>
                                    <TableCell align="right">{row.baggabe_description}</TableCell>
                                    <TableCell align="right">{row.baggabe_unit}</TableCell>
                                    <TableCell align="right">{row.baggabe_weight}</TableCell>
                                    <TableCell align="right">{row.code_description}</TableCell>
                                    <TableCell align="right">{row.passanger_last_name}</TableCell>
                                    <TableCell align="right">{row.passanger_name}</TableCell>
                                    <TableCell align="right">{row.passanger_passport}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                   </main>
        } else if(postState.selected_post_idx === -1) {
            return <div> </div>
        } else {
            return render_toolbar()
        }
    }

    return (
                render_main()
    );
};

const mapStateToProps = state => ({
    posts: state.postState,
    s7: state.s7State,
});

export default MainWindow;
