import { createContext, useState } from 'react'
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { addTestCase } from './redux/testActionSlice';
import Box from '@mui/material/Box';
import TestCase from './TestCase';
export const TestCaseContext = createContext();
function App() {
  const testcases = useSelector(state => state.testAction.testcases);
  const dispatch = useDispatch();
  

  const parseInput = () => {
    let inputActions = input.split("\n");
    let locators = [];
    let actionstype = [];
    console.log(actions);
    let structuredInput = {
      url: '',
      actionList: []
    };

    actions.forEach((action) => {
      let words = action.match(/(?:[^\s"]+|"[^"]*")+/g);
      switch (words[0]) {
        case "open":
          structuredInput.url = words[1];
          break;
        case "click":

      }
    })
  }

  const handleParseScript = () => {
    setOutput(parseInput());
  }

  const inputToActions = () => {
    console.log("parse")
    let inputLines = input.split("\n");
    let tempActions = [];
    inputLines.forEach((line) => {
      let words = line.match(/(?:[^\s"]+|"[^"]*")+/g);
      switch (words[0]) {
        case "open":
          tempActions.push({
            type: "open",
            url: words[1],
          });
          break;
        case "click":
          tempActions.push({
            type: "click",
            describedLocator: words.slice(1).join(" "),
          })
          break;
        case "input":
          tempActions.push({
            type: "input",
            describedLocator: words[1].slice(1, words[1].length - 2),
            value: words[3].slice(1, words[3].length - 2),
          })
          break;
        case "hover":
          tempActions.push({
            type: "hover",
            describedLocator: words.slice(2).join(" "),
          })
          break;
      }
    });
    setActions(tempActions);
  }

  const getScript = () => {
    console.log(JSON.stringify(testcases));
    fetch("http://localhost:8080/locator", {
      body: JSON.stringify(testcases),
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
      },
      method: "POST",
      // mode: "no-cors"
    })
    .then((response) => {
      console.log(response);
      return response.text();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('There was a problem with your fetch operation:', error);
    }); 
  }
  return (
    <>
      {
        testcases.map((testcase, index) => {
          return <TestCaseContext.Provider key={index} value={index}>
              <TestCase  />
          </TestCaseContext.Provider>
        })
      }
      <Box display="flex" justifyContent="space-between" width={300}>
        <Button size="small" variant="contained" color='primary' onClick={() => dispatch(addTestCase())}>Add Test Case</Button>
        <Button size="small" variant="contained" color='primary' onClick={getScript}>Turn to Script</Button>
      </Box>

    </>
  )
}

export default App
