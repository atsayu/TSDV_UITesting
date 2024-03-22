import  { useContext } from 'react'
import { Input } from '@mui/material'
import { useDispatch } from 'react-redux'
import  { TestActionContext } from '../TestCase';
import { TestCaseContext } from '../App';
import { handleDescribedLocatorChange } from './handleFunction';
export default function AssertElementAction({describedLocator}) {
    const actionIndex = useContext(TestActionContext);
    const testcaseIndex = useContext(TestCaseContext);
    const dispatch = useDispatch();
  return (
    <>
        <span>Verify the element exist </span>
        <Input sx={{input: {fontFamily: 'Times New Roman', textAlign: 'center', fontStyle:'italic'}}} margin='none' onChange={(e) => handleDescribedLocatorChange(dispatch, e, testcaseIndex, actionIndex)} defaultValue={describedLocator || ''}/>
    </>
  )
}
