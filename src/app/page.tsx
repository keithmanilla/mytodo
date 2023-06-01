"use client";
import { addTaskContainer } from '@/components/addTaskContainer';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface Props {
  children: any
};

interface itemProps {
  id: string;
  title: string;
  description: string;
  position: number;
  done: boolean;
};

const items: any[] = [];



export default function Home({ children }: Props) {
  // States
  const [items, setItems] = useState<any[]>([]);
  const [fetched, seFetched] = useState<boolean>(false);

  useEffect(() => {
    if (!fetched) {
      fetchTodos();
    }
  }, [fetched])
  

  // Functions
  const handleEdit = (id: string) => {
    console.log('Edited');
  };

  const handleUpdate = (id: string, payload: any) => {
    console.log('Updated!');
    editTodo(id, payload);
  };

  const handleComplete = (id: string) => {
    console.log('Completed');
    handleUpdate(id, { done: true });
  };

  const handleDelete = (id: string) => {
    console.log('Deleted');
    deleteTodo(id);
  };

  async function fetchTodos() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    const data: any = await (
      await fetch(
        'http://localhost:8000/api/v1/todos',
        requestOptions
      )
    ).json();

    setItems(data?.todos);
  };

  async function editTodo(id: string, payload: any) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload })
    };
    const data: any = await (
      await fetch(
        `http://localhost:8000/api/v1/todos/${id}`,
        requestOptions
      )
    ).json();

    if (data?.status === 201) {
      fetchTodos();
    } else {
      // Error
    };
  };

  async function deleteTodo(id: string) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    const data: any = await (
      await fetch(
        `http://localhost:8000/api/v1/todos/${id}`,
        requestOptions
      )
    ).json();

    if (data?.status === 201) {
      fetchTodos();
    } else {
      // Error
    };
  };

  // Component Blocks
  const TaskCard = (
    index: number,
    item: any
  ) => {
    return (
        <div
            key={index}
            style={{ marginBottom: 16, opacity: item?.done ? 0.8 : 1 }}
        >
            <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            {item?.done ? (
            <span 
                className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 my-2
                text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
            >
                Done
            </span>
            ) : (
                <span
                className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 my-2
                text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                >
                Pending
                </span>
            )
            }
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {`${item?.title} `}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{item?.description}</p>

            <div style={{
                alignSelf: 'center',
                marginTop: 24,
            }}>
                <button
                disabled={item?.done}
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none
                    focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5
                    mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={() => handleEdit(item?.id)}
                >
                Edit
                </button>
                {item?.done ? (
                    <button
                        disabled
                        type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100
                        focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
                        dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600
                        dark:focus:ring-gray-700"
                    >
                        Done
                    </button>
                    ) : (
                    <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800
                        focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5
                        mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        onClick={() => handleComplete(item?.id)}
                    >
                        Done
                    </button>
                )}
                <button
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4
                    focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600
                    dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => handleDelete(item?.id)}
                >
                    Delete
                </button>
            </div>
            </a>
        </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div
        // className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"
        style={{
          width: '100%',
        }}
      >
        <h1 className='text-4xl '>MY TODOS</h1>
        <div
          style={{
            // width: 500,
            marginTop: 24,
            display: 'flex',
            flexDirection: 'column',
            padding: 24,
            // backgroundColor: 'rgba(255,255,255,0.08)',
            borderRadius: 16
          }}
        >
          {items?.map((item: any, index: any) => (
            TaskCard(index, item)
          ))}
          {addTaskContainer()}
        </div>
      </div>

    
    </main>
  )
}
