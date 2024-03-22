import React, { useContext } from 'react'
import { Input } from '@mui/material'
import { useDispatch } from 'react-redux'
import { changeUrl } from '../redux/testActionSlice';
import  { TestActionContext } from '../TestCase';
import { TestCaseContext } from '../App';
import { handleChangeUrl } from './handleFunction';
export default function AssertURLAction({url}) {
    const actionIndex = useContext(TestActionContext);
    const testcaseIndex = useContext(TestCaseContext);
    const dispatch = useDispatch();
  return (
    <>
        <span>Verify current URL is </span>
        <Input sx={{input: {fontFamily: 'Times New Roman', textAlign: 'center', fontStyle:'italic'}}} margin='none' onChange={(e) => handleChangeUrl(dispatch, e, testcaseIndex, actionIndex)} defaultValue={url || ''}/>
    </>
  )
}
