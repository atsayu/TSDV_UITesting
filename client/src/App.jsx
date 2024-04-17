import { createContext, useState } from 'react'
import { Button } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
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
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const getXpath = (action, dict) => {
    const xpath = dict[action.describedLocator];
    console.log(xpath);
    const attributes = xpath.split("and");
    let newXpath = `"`.concat(attributes[0]).concat(`"`);
    attributes.forEach((att, index) => {
      if (index > 0) {
        newXpath = newXpath.concat(`\n\t+ "and`).concat(attributes[index]).concat(`"`);
      }
    })
    return newXpath;
  }
 
  const getScriptOfAction = (action, dict) => {
    switch(action.type) {
      case "open":
        return `\tdriver.get("${action.url}");\n`;
      case "click":
        return `\tdriver.findElement(By.xpath(${getXpath(action, dict)})).click();\n`;
      case "hover":
        return `\tnew Actions(driver)
        .moveToElement(driver.findElement(By.xpath(${getXpath(action, dict)})))
        .perform();\n`;
      case "select":
        return `\tnew Select(driver.findElement(By.xpath(${getXpath(action, dict)}))).selectByVisibleText("${action.describedLocator}");\n`;
      case "checkbox":
        return `\tnew WebDriverWait(driver, Duration.ofSeconds(1)).
        until(ExpectedConditions.elementToBeClickable
                (By.xpath(${getXpath(action, dict)})));
        driver.findElement(By.xpath(${getXpath(action, dict)})).click();\n`;
      case "input":
        return `\tdriver.findElement(By.xpath(${getXpath(action, dict)})).sendKeys("${action.value}");\n`
      case "verifyURL":
        return `\tAssert.assertTrue(driver.getCurrentUrl().equals("${action.url}"));\n`;
      
    }
  }

  const runScript = () => {
    console.log(scriptArray);
    setLoading(true);
    fetch("http://localhost:8083/selenium", {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
      },
      body: JSON.stringify(scriptArray),
      method: "POST",
    })
    .then((response) => {
      console.log(response);
      return response.blob();
    })
    .then((blob) => {
      setLoading(false);
      const url = window.URL.createObjectURL(blob);
            
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', "report");
            
            // Append the link to the document body and click it programmatically
            document.body.appendChild(link);
            link.click();
            
            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      setLoading(false);
      console.error('There was a problem with your fetch operation:', error);
    }); 
  }

  const getScript = () => {
    console.log(JSON.stringify(testcases));
    setLoading(true);
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
        let testcasename = 'Test' + index + 1;
        newScriptString = newScriptString.concat(testcasename + "\n");
        testcase.actions.forEach((action) => {
          testcaseScript = testcaseScript.concat(getScriptOfAction(action, data));
          newScriptString = newScriptString.concat(getScriptOfAction(action, data));
        });
        newScriptString = newScriptString.slice(0, -1);
        newScriptArray.push({
          name: testcasename,
          script: testcaseScript
        });
      });
      setScriptArray(newScriptArray);
      setScriptString(newScriptString);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      console.error('There was a problem with your fetch operation:', error);
    }); 
  }
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
        Processing request...
      </Backdrop>
      <h1 style={{textAlign: 'center', fontFamily: 'sans-serif'}}>TSDV - UET UITesting</h1>
      {
        testcases.map((testcase, index) => {
          return <TestCaseContext.Provider key={index} value={index}>
              <TestCase  />
          </TestCaseContext.Provider>
        })
      }
      <Box display="flex" justifyContent="space-between" width={450}>
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
