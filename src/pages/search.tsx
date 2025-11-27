import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import SearchView from '../components/SearchView';

export default function SearchPage() {
  return (
    <>
      <Head>
        <title>Busca Avançada - ClinicFlow</title>
        <meta name="description" content="Sistema de busca avançada do ClinicFlow para encontrar pacientes, consultas, médicos e documentos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <SearchView />
        </div>
      </Layout>
    </>
  );
}