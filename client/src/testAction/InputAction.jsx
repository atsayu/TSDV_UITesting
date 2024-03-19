import React, { useContext } from 'react'
import { Input } from '@mui/material'
import { TestActionContext } from '../TestCase'
import { TestCaseContext } from '../App';
import { useDispatch } from 'react-redux';
import { changeValue } from '../redux/testActionSlice';
import { handleChangeValue, handleDescribedLocatorChange } from './handleFunction';
export default function InputAction({describedLocator, value}) {
    const actionIndex = useContext(TestActionContext);
    const testcaseIndex = useContext(TestCaseContext);
    const dispatch = useDispatch();
    
    
  return (
    <>
        <span>Fill </span>
        <Input sx={{input: {fontFamily: 'Times New Roman', textAlign: 'center', fontStyle:'italic'}}}  margin='none' onChange={(e) => handleChangeValue(dispatch, e, testcaseIndex, actionIndex)} defaultValue={value || ''}/>
        <span> into </span>
        <Input sx={{input: {fontFamily: 'Times New Roman', textAlign: 'center', fontStyle:'italic'}}}  margin='none' onChange={(e) => handleDescribedLocatorChange(dispatch, e, testcaseIndex, actionIndex)} defaultValue={describedLocator || ''}/>
    </>
  )
}
