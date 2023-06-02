"use client";
import Modal from '@/components/modal';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface Props {
  children: any
};

interface itemProps {
  _id: string;
  title: string;
  description: string;
  position: number;
  done: boolean;
};

const items: any[] = [];



export default function Home({ children }: Props) {
  // States
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<any[]>([]);
  const [fetched, seFetched] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [requesting, setRequesting] = useState<boolean>(false);
  const [formState, setFormState] = useState<string>('');

  useEffect(() => {
    if (!fetched && !requesting) {
      fetchTodos();
    }
  }, [fetched])
  

  // Functions
  const handleCreate = () => {
    console.log('Create');
    if (title && !requesting) {
      setRequesting(true);
      createdTodo({ title, description })
    }
  };

  const setEdit = () => {
    setFormState('edit');
    handleUpdate(editId, {title, description});
  };

  const handleEdit = (data: any) => {
    console.log('Edited ', data);
    setTitle(data?.title);
    setDescription(data?.description);
    setEditId(data?._id);
    setOpen(true);
  };

  const handleUpdate = (id: string, payload: any) => {
    console.log('Updated!');
    if (title && !requesting) {
      setRequesting(true);
      editTodo(id, payload);
    } else if (payload?.done && !requesting) {
      setRequesting(true);
      editTodo(id, payload);
    }
  };

  const handleComplete = (id: string) => {
    console.log('Completed');
    handleUpdate(id, { done: true });
  };

  const handleDelete = (id: string) => {
    console.log('Deleted: ', id);
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
    setRequesting(false);
    if (data?.status === 200) {
      setItems(data?.todos);
    } else {
      //
    }
  };

  async function createdTodo(payload: any) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload })
    };
    const data: any = await (
      await fetch(
        'http://localhost:8000/api/v1/todos',
        requestOptions
      )
    ).json();

    setRequesting(false);
    if (data?.status === 201) {
      setTitle('');
      setDescription('');
      setEditId('');
      fetchTodos();
    } else {
      // Error
    };
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

    setRequesting(false);
    if (data?.status === 201) {
      setTitle('');
      setDescription('');
      setEditId('');
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

    setRequesting(false);
    if (data?.status === 200) {
      fetchTodos();
    } else {
      // Error
    };
  };

  // Component Blocks

  const form = (status: string) => {
    return (
      <div>
        <h3 className='text-2xl text-black capitalize my-4'>{status} Todo</h3>
        <div className="sm:col-span-4">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
            Title
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="title"
                id="title"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder=""
                value={title || ''}
                onChange={(e: any) => {
                  setTitle(e?.target?.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-span-full" style={{ marginTop: 32 }}>
          <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              name="description"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={''}
              placeholder=""
              value={description || ''}
              onChange={(e: any) => {
                setDescription(e?.target?.value);
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  const addTaskContainer = () => {
    return (
      <div
        className='rounded-lg'
        style={{
          marginBottom: 16,
          width: 384,
          height: 72,
          color: '#FFFFFF',
          border: '2px dashed rgba(255,255,255,0.5)',
          flexDirection: 'column',
          alignContent: 'center',
          cursor: 'pointer'
        }}
        onClick={() => {
          setFormState('add');
          setOpen(true);
        }}
      >
        <h5
          className="mb-2 text-2xl text-center my-4 font-bold tracking-tight text-white-900 dark:text-white"
          style={{
            cursor: 'pointer'
          }}
        >
          Add a new task
        </h5>
      </div>
    );
  };

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
            <p className='text-slate-700 text-xs'>{item._id}</p>  
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
                onClick={() => {
                  setFormState('edit');
                  handleEdit(item);
                }}
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
                        onClick={() => handleComplete(item?._id)}
                    >
                        Done
                    </button>
                )}
                <button
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4
                    focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600
                    dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => handleDelete(item?._id)}
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
      <Modal component={form(formState)} open={open} setOpen={setOpen} state={formState} create={handleCreate} edit={setEdit} />
    </main>
  )
}
