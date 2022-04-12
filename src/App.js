import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {saveAs} from 'file-saver';
import qs from 'qs';

import logo from './logo.svg';
import './App.css';
import {Button, Divider} from '@material-ui/core';
import {AllInboxSharp} from '@material-ui/icons';

function App() {

    const studyInstanceUID = [
        '1.2.410.2000010.82.220.11004040701',
        '1.2.840.113704.1.111.4224.1270126658.1',
        '1.2.410.2000010.82.220.11003310039'
    ]

    const person = [
        'AN_ID_20220104090650',
        'AN_ID_20220104141947',
        'AN_ID_20220104101802',
    ]


    // const studyInstanceUID = [
    //     '1.2.840.113704.1.111.8580.1406613632.1',
    //     '1.2.410.2000010.82.220.11407260822',
    //     '1.2.410.2000010.82.220.11407170258',
    //     '1.2.410.2000010.82.220.11407101344',
    //     '1.2.410.2000010.82.220.11406250865',
    //     '1.2.410.2000010.82.220.11406181270',
    //     '1.2.410.2000010.82.220.11406131826',
    //     '1.2.840.113704.1.111.5616.1402378455.1',
    //     '1.2.410.2000010.82.220.11405161791',
    //     '1.2.410.2000010.82.220.11405131922',
    //     '1.2.410.2000010.82.220.11501051545',
    //     '1.2.410.2000010.82.220.11412250048',
    //     '1.2.840.113704.1.111.4240.1419317599.1',
    //     '1.2.410.2000010.82.220.11411220728',
    //     '1.2.410.2000010.82.220.11411200135',
    //     '1.2.410.2000010.82.220.11411090609',
    //     '1.2.840.113704.1.111.7528.1414636145.1',
    //     '1.2.840.113704.1.111.6156.1414040867.1',
    //     '1.2.840.113704.1.111.1088.1411452613.1',
    //     '1.2.840.113704.1.111.7872.1407202792.1'
    // ];

    const condition = [
        'sarcopenia',
        'sarcopenia',
        'sarcopenia',
        'sarcopenia',
        'sarcopenia',
        'sarcopenia',
        'sarcopenia',
        'sarcopenia',
        'sarcopenia',
        'sarcopenia',
        'sarcopenia',
        'sarcopenia',
        'sarcopenia',
        'sarcopenia',
        'sarcopenia',
        'sarcopenia',
        'sarcopenia',
        'sarcopenia',
        'sarcopenia',
        'sarcopenia'
    ];

    const modality = [
        'CT',
        'CT',
        'CT',
        'CT',
        'CT',
        'CT',
        'CT',
        'CT',
        'CT',
        'CT',
        'CT',
        'CT',
        'CT',
        'CT',
        'CT',
        'CT',
        'CT',
        'CT',
        'CT',
        'CT'
    ];

    // const person = [
    //     'AN_ID_20220111162834',
    //     'AN_ID_20220111151635',
    //     'AN_ID_20220125100257',
    //     'AN_ID_20220125100355',
    //     'AN_ID_20220125100453',
    //     'AN_ID_20220125101328',
    //     'AN_ID_20220125100556',
    //     'AN_ID_20220111163144',
    //     'AN_ID_20220125101632',
    //     'AN_ID_20220125101930',
    //     'AN_ID_20220125085708',
    //     'AN_ID_20220111163045',
    //     'AN_ID_20220111151749',
    //     '30303232',
    //     'AN_ID_20220125085841',
    //     'AN_ID_20220111162737',
    //     'AN_ID_20220125100716',
    //     'AN_ID_20220125100818',
    //     'AN_ID_20220125101231',
    //     'AN_ID_20220125100917'
    // ];

    const api = axios.create({
        baseURL: 'https://api.localhost',
        responseType: 'blob',
      });
      

    const getStatus = () => {
        axios
            .get("https://api.localhost/stream/total/download")
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error);
            })

        }

    const translate_query = (params) => {
        return qs.stringify(params, {arrayFormat: 'repeat'});

    }

    const getFileSaver = () => {

        for (var i = 0; i <= studyInstanceUID.length - 1; i++) {

            let file_name = studyInstanceUID[i]
            file_name+='.zip'

            console.log(file_name)


           
            api
                .get(`/stream/total/download`, {
                    params: {
                        studyInstanceUID: studyInstanceUID[i],
                        condition: condition[i],
                        modality: modality[i],
                        dicom: 'true',
                        image: 'false',
                        excel: 'true',
                        mode: 'BASIC',
                        email: 'medikim3551@gmail.com',
                        option:'None'
                        
                    }
                })
                .then((response) => {
                    console.log(response.data)

                    const url = window.URL.createObjectURL(response.data);
                    const link = document.createElement('a');
                    link.href = url;
                    
                    link.setAttribute('download', file_name);
                    document.body.appendChild(link);
                    link.click();
            
                  
            
                }).catch((error) => {
                  console.log(error);
                });
           
              

        }

    }
    return (
        <div className="App">

            <Button variant='contained' onClick={getFileSaver()}>Axios</Button>

        </div>
    );
}

export default App;
