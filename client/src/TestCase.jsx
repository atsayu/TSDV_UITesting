import React, { createContext, useContext } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { addAssertElementAction, addAssertUrlAction, addCheckboxAction, addClickAction, addFlowDescribe, addHoverAction, addInputAction, addOpenWebSiteAction, addSelectAction, deleteAction } from './redux/testActionSlice';
import { useDispatch, useSelector } from 'react-redux';
import TestAction from './testAction/TestAction';
import { List, ListItem } from '@mui/material';
import { TestCaseContext } from './App';
export const TestActionContext = createContext();

export default function TestCase() {
    const testcaseIndex = useContext(TestCaseContext);
    const testActions = useSelector(state => state.testAction.testcases[testcaseIndex].actions);
    const selectedIndexes = useSelector((state) => {
        const selectedIndexes = [];
        const actions =  state.testAction.testcases[testcaseIndex].actions;
        actions.forEach((action, index) => {
            if (action.selected) selectedIndexes.push(index);
        }) 
        return selectedIndexes;
    })
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleAddOpenWebsite = (testcaseIndex) => {
        dispatch(addOpenWebSiteAction({testcaseIndex}));
        handleClose();
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

    const handleAddAssertUrl = (testcaseIndex) => {
        dispatch(addAssertUrlAction({testcaseIndex}));
        handleClose();
    }

    const handleAddAssertElement = (testcaseIndex) => {
        dispatch(addAssertElementAction({testcaseIndex}));
        handleClose();
    }

    const deleteSelectedAction = () => {
        

        selectedIndexes.forEach(testActionIndex => {
            dispatch(deleteAction({testcaseIndex, testActionIndex}));
        })
    }
    const handleAddCheckbox = () => {
        dispatch(addCheckboxAction({testcaseIndex}));
        handleClose();
    }

    const handleAddSelect = () => {
        dispatch(addSelectAction({testcaseIndex}));
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
                    <MenuItem onClick={() => handleAddOpenWebsite(testcaseIndex)}>Open website</MenuItem>
                    <MenuItem onClick={() => handleAddClick(testcaseIndex)}>Click</MenuItem>
                    <MenuItem onClick={() => handleAddInput(testcaseIndex)}>Input</MenuItem>
                    <MenuItem onClick={() => handleAddHover(testcaseIndex)}>Hover</MenuItem>
                    <MenuItem onClick={() => handleAddCheckbox(testcaseIndex)}>Checkbox</MenuItem>
                    <MenuItem onClick={() => handleAddSelect(testcaseIndex)}>Select</MenuItem>
                    <MenuItem onClick={() => handleAddAssertUrl(testcaseIndex)}>Verify the URL</MenuItem>
                    <MenuItem onClick={() => handleAddAssertElement(testcaseIndex)}>Verify element exist</MenuItem>
                    <MenuItem onClick={() => handleAddFlow(testcaseIndex)}>Describe Your Procedure</MenuItem>
                </Menu>
            </div>
            <List>

                {
                    testActions.map((testAction, index) => {
                        return <TestActionContext.Provider value={index} key={index}>
                            <ListItem>
                                <TestAction {...testAction} testStep={index + 1}/>
                            </ListItem>
                        </TestActionContext.Provider>
                    })
                }
            </List>
            {
                selectedIndexes.length > 0 
                 && <Button size="small" variant="contained" color='error' onClick={deleteSelectedAction}>Delete selected actions</Button>
            }

        </div>
    )
}
