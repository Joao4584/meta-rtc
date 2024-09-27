"use client";

import { DivEffect } from "@/utils/motion/Effects";
import Link from "next/link";
import React from "react";



export default function NotFoundPage() {


    return( <main className="grid min-h-full  px-6 p-32 lg:px-8">
        <div className="text-center">
            <DivEffect>
                <React.Fragment>
                    <p className="text-base font-semibold text-indigo-600">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900  dark:text-gray-300 sm:text-5xl">Pagina não Encontrada</h1>
                </React.Fragment>
            </DivEffect>
            <DivEffect delay={.1}>
                <p className="mt-6 text-base leading-7 text-gray-600">Desculpe, essa pagina esta fora do ar ou não existe.</p>
            </DivEffect>
            <DivEffect delay={.2}>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href="/dashboard"  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Ir para o Dashboard</Link>
                    <a href="#" className="text-sm font-semibold text-gray-900 dark:text-gray-300">Ver documentação <span aria-hidden="true">&rarr;</span></a>
                </div>
            </DivEffect>
        </div>
    </main>)
}