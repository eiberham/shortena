import Link from 'next/link';
import Head from 'next/head';
import '../styles.scss';
import React from "react";
import { Input } from 'semantic-ui-react';

const Index = () => (
    <div>
        <Head>
            <title>Shortena</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link href="https://fonts.googleapis.com/css?family=Dosis|Josefin+Sans&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        </Head>
        <section className="content">
            <div className="wrapper">
                <h1>Url Shortener</h1>
                <span>Please enter the url you want to shorten below</span>
                <form>
                    <Input action='Shorten' size='small' placeholder='Enter url...' />
                </form>
            </div>

        </section>
    </div>
);

export default Index;
