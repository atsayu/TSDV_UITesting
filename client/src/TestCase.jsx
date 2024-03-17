import React, { createContext, useContext } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { addClickAction, addFlowDescribe, addHoverAction, addInputAction } from './redux/testActionSlice';
import { useDispatch, useSelector } from 'react-redux';
import TestAction from './testAction/TestAction';
import { List, ListItem } from '@mui/material';
import { TestCaseContext } from './App';
export const TestActionContext = createContext();

export default function TestCase() {
    const testcaseIndex = useContext(TestCaseContext);
    const testActions = useSelector(state => state.testAction.testcases[testcaseIndex].actions);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleAddClick = (testcaseIndex) => {
        dispatch(addClickAction({ testcaseIndex }));
        setAnchorEl(null);
    }

    const handleAddInput = (testcaseIndex) => {
        dispatch(addInputAction({ testcaseIndex }));
        setAnchorEl(null);
    }

    const handleAddHover = (testcaseIndex) => {
        dispatch(addHoverAction({testcaseIndex}));
        setAnchorEl(null);
    }

    const handleAddFlow = (testcaseIndex) => {
        dispatch(addFlowDescribe({testcaseIndex}));
        handleClose();
    }

    return (
        <div style={{ border: '1px solid black', margin: '5px', padding: '5px' }}>
            <div>
                <Button
                    variant="outlined"
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Add Action
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => handleAddClick(testcaseIndex)}>Click</MenuItem>
                    <MenuItem onClick={() => handleAddInput(testcaseIndex)}>Input</MenuItem>
                    <MenuItem onClick={() => handleAddHover(testcaseIndex)}>Hover</MenuItem>
                    <MenuItem onClick={() => handleAddFlow(testcaseIndex)}>Describe Your Procedure</MenuItem>
                </Menu>
            </div>
            <List sx={{ listStyle: "decimal", pl: 4 }}>

                {
                    testActions.map((testAction, index) => {
                        return <TestActionContext.Provider value={index} key={index}>
                            <ListItem  sx={{ display: "list-item" }}>
                                <TestAction {...testAction}/>
                            </ListItem>
                        </TestActionContext.Provider>
                    })
                }
            </List>

        </div>
    )
}
