import Link from 'next/link';
import Head from 'next/head';
import '../styles.scss';
import React, { useState, useRef } from "react";
import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import * as Yup from 'yup';
import mutation from '../mutations/Shorten';
import ShortenerForm from '../components/Forms/ShortenerForm';
import { withApollo } from '../lib/apollo';
import {Input, Segment} from "semantic-ui-react";

const UrlSchema = Yup.object().shape({
    url: Yup.string()
        .required('Required')
});

const Index = () => {
    const [outputValue, setOutputValue] = useState('');
    const outputElement = useRef(null);
    const [trimlink, {loading}] = useMutation(mutation);

    const copyToClipboard = () => {
        if(outputValue){
            outputElement.current.focus();
            outputElement.current.select();
            try {
                document.execCommand('copy');
            } catch( error ){
                console.error(error);
            }
        }
    };

    return (
        <React.Fragment>
            <Head>
                <title>Shortena</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link href="https://fonts.googleapis.com/css?family=Dosis|Josefin+Sans&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
            </Head>
            <section className="content">
                <div className="wrapper">
                    <div className="logo"></div>
                    <span>Enter the url you want to shorten below</span>
                    <Formik
                        render={props => <ShortenerForm {...props} />}
                        initialValues={{url: ''}}
                        validationSchema={UrlSchema}
                        onSubmit={ async ({url}) => {
                            try {
                                const {data: {shorten}} = await trimlink({variables: {url}});
                                if(shorten){
                                    setOutputValue(shorten.short);
                                }
                            }catch(error){
                                console.error(error);
                            }
                        }}
                    />
                    <Segment inverted >
                        <Input
                            ref={outputElement}
                            id="output"
                            name="output"
                            type="text"
                            size="large"
                            value={outputValue}
                            action={{
                                placeholder: '',
                                color: 'teal',
                                icon: 'copy',
                                onClick: () => {
                                    copyToClipboard();
                                }
                            }}
                            defaultValue=''
                        />
                    </Segment>
                </div>
            </section>
        </React.Fragment>
    )
};

export default withApollo(Index);
