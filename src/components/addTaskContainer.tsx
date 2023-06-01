

export const addTaskContainer = () => {
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