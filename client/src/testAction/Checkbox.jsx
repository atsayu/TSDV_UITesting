import React, { useContext } from 'react'
import { Input } from '@mui/material'
import { useDispatch } from 'react-redux'
import { changeDescribedLocator } from '../redux/testActionSlice';
import  { TestActionContext } from '../TestCase';
import { TestCaseContext } from '../App';
import { handleDescribedLocatorChange } from './handleFunction';
export default function CheckboxAction({describedLocator}) {
    const actionIndex = useContext(TestActionContext);
    const testcaseIndex = useContext(TestCaseContext);
    const dispatch = useDispatch();
  return (
    <>
        <span>Check </span>
        <Input sx={{input: {fontFamily: 'Times New Roman', textAlign: 'center', fontStyle:'italic'}}} margin='none' onChange={(e) => handleDescribedLocatorChange(dispatch, e, testcaseIndex, actionIndex)} defaultValue={describedLocator || ''}/>
    </>
  )
}
