import React, { useContext } from 'react'
import { Box, Button, Stack, TextField } from '@mui/material'
import { TestCaseContext } from '../App'
import { TestActionContext } from '../TestCase';
import { useDispatch, useSelector } from 'react-redux';
import { changeFlow, insertActions } from '../redux/testActionSlice';



export default function Flow() {
    const testcaseIndex = useContext(TestCaseContext);
    const actionIndex = useContext(TestActionContext);
    const testFlow = useSelector(state => state.testAction.testcases[testcaseIndex].actions[actionIndex].flow);
    const dispatch = useDispatch();

    const handleChangeFlow = (e) => {
        const newFlow = e.target.value;
        dispatch(changeFlow({testcaseIndex, actionIndex, newFlow}));
    }
    const turnFlowToAction = () => {
        const lines = testFlow.split("\n");
        const newActions = [];

        lines.forEach((line) => {
            line = line.replace(/^[^A-Za-z]+/, '');
            const words = line.match(/(?:[^\s"]+|"[^"]*")+/g);
            switch (words[0].toLowerCase()) {
                case "open":
                    newActions.push({
                        type: "open",
                        url: words[1]
                    });
                    break;
                case "click":
                    newActions.push({
                        type: "click",
                        describedLocator: words.splice(1).join(" "),
                    });
                    break;
                case "fill":
                    newActions.push({
                        type: "input",
                        describedLocator: words.splice(3).join(" "),
                        value: words[1]
                    });
                    break;
                case "hover":
                    newActions.push({
                        type: "hover",
                        describedLocator: words.splice(2).join(" "),
                    });
                    break;
            }
        });
        console.log(newActions);
        dispatch(insertActions({testcaseIndex, actionIndex, newActions}));
    }
    return (
        <>
            <TextField onChange={handleChangeFlow} variant='outlined' multiline rows={5} fullWidth placeholder='Describe your test procedure' />
            <Button onClick={turnFlowToAction} size='small' variant='outlined'>Turn to element</Button>
        </>
    )
}
