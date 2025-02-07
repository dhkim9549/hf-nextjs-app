'use client'

import { useState } from 'react';
import { useEffect } from 'react';

import Title from '@/app/ui/title';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';

import TGraphics from './t-graphics';

export default function RentLoanMultiInfo() {

  return (
    <div className="">
      <div className="text-center my-10 py-10 lg:text-left lg:m-10 lg:p-10">
        <blockquote className="text-2xl font-bold italic text-slate-900">
          THREE
        </blockquote>
      </div>
      <div className="m-4 flex flex-wrap">
        <div className="mb-4 w-full text-center">
          three.js test
        </div>
        <div className="">
          <TGraphics chartData={{}}/>
        </div>
      </div>
    </div>
  )
}

