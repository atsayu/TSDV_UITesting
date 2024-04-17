import React, { useContext } from 'react'
import ClickAction from './ClickAction'
import InputAction from './InputAction'
import HoverAction from './Hover'
import Flow from './Flow'
import { Checkbox, Divider } from '@mui/material'
import OpenWebsiteAction from './OpenWebsiteAction'
import AssertURLAction from './AssertURL'
import AssertElementAction from './AssertElement'
import { toogleSelectAction } from '../redux/testActionSlice'
import { useDispatch, useSelector } from 'react-redux'
import  { TestActionContext } from '../TestCase';
import { TestCaseContext } from '../App'
import SelectAction from './Select'
import CheckboxAction from './Checkbox'
export default function TestAction({ type, describedLocator, value, url, testStep }) {
    const actionIndex = useContext(TestActionContext);
    const testcaseIndex = useContext(TestCaseContext);
    const selected = useSelector((state) => {
        return state.testAction.testcases[testcaseIndex].actions[actionIndex].selected;
    })
    const dispatch = useDispatch();
    let ActionComponent;
    switch (type) {
        case "open":
            ActionComponent = <OpenWebsiteAction url={url}/>
            break;
        case "click":
            ActionComponent = <ClickAction describedLocator={describedLocator} />
            break;
        case "input":
            ActionComponent = <InputAction describedLocator={describedLocator} value={value} />
            break;
        case "hover":
            ActionComponent = <HoverAction describedLocator={describedLocator} />
            break;
        case "flow":
            ActionComponent = <Flow />
            break;
        case "verifyURL":
            ActionComponent = <AssertURLAction url={url}/>
            break;
        case "verifyElement":
            ActionComponent = <AssertElementAction describedLocator={describedLocator}/>
            break;
        case "select":
            ActionComponent = <SelectAction describedLocator={describedLocator}/>
            break;
        case "checkbox":
            ActionComponent = <CheckboxAction describedLocator={describedLocator} />
            break;
    }
    return (
        <div>
            <Checkbox size='small' onClick={() => dispatch(toogleSelectAction({testcaseIndex, actionIndex}))} checked={selected ? true : false}></Checkbox>
            <span style={{margin: '10px'}}>{testStep}</span>
            {ActionComponent}
            <Divider variant='fullWidth'/>
        </div>

    )
}
