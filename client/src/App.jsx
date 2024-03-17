import { createContext, useState } from 'react'
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { addTestCase } from './redux/testActionSlice';
import Box from '@mui/material/Box';
import TestCase from './TestCase';
import TestScript from './TestScript';
export const TestCaseContext = createContext();
function App() {
  const testcases = useSelector(state => state.testAction.testcases);
  const dispatch = useDispatch();
  const [scriptArray, setScriptArray] = useState([]);
  const [scriptString, setScriptString] = useState('');

  const getScriptOfAction = (action, dict) => {
    switch(action.type) {
      case "open":
        return `\tdriver.get("${action.url}");\n`;
      case "click":
        return `\tdriver.findElement(By.xpath("${dict[action.describedLocator]}")).click();\n`;
      case "input":
        return `\tdriver.findElement(By.xpath("${dict[action.describedLocator]}")).sendKeys("${action.value}");\n`
    }
  }

  const runScript = () => {
    console.log(scriptArray);
    fetch("http://localhost:8082/selenium", {
      body: JSON.stringify(scriptArray),
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
      },
      method: "POST",
    })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('There was a problem with your fetch operation:', error);
    }); 
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
    })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let newScriptArray = [];
      let newScriptString = '';
      testcases.forEach((testcase, index) => {
        let testcaseScript = '';
        let testcasename = 'Test ' + index + 1;
        newScriptString = newScriptString.concat(testcasename + "\n");
        testcase.actions.forEach((action) => {
          testcaseScript = testcaseScript.concat(getScriptOfAction(action, data));
          newScriptString = newScriptString.concat(getScriptOfAction(action, data));
        });
        newScriptArray.push({
          name: testcasename,
          script: testcaseScript
        });
      });
      setScriptArray(newScriptArray);
      setScriptString(newScriptString);
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
        <Button size="small" variant="contained" color='primary' onClick={getScript}>Generate Script</Button>
        {
          scriptArray.length != 0 && <Button size="small" variant="contained" color='primary' onClick={runScript}>Run Script</Button>
        }
      </Box>
      {
        scriptString !== '' && <TestScript code={scriptString}/>
      }

    </>
  )
}

export default App
