import { Fragment, ReactElement, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface Props {
  component: ReactElement;
  open: boolean;
  setOpen: (arg: boolean) => void;
  create?: () => void | undefined;
  state: string;
  edit?: () => void | undefined;
};

/**
 * A resuable modal which is currently used as a container for the Create
 * and Edit form.
 * 
 * @param component - Any react component like a form or dialog content.
 * @param open - a boolean flag to open the modal.
 * @param setOpen - a function to open/close the current modal.
 * @param create - a function to trigger Create if modal is used as Create Form.
 * @param edit - a function to trigger Edit / Update if modal is used as Edit Form.
 * @param state - a string flag used to handle if modal is for edit or create.
 * @returns 
 */
export default function Modal({ component, open, setOpen, create, state, edit }: Props) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="flex min-h-full items-end justify-center p-4
            text-center sm:items-center sm:p-0"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg bg-white
                text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                {/* The child component will be here. Eg. <Form />, etc. */}
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  {component}
                </div>
               
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {/* Create or Update button. */}
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3
                    py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500
                    sm:ml-3 sm:w-auto"
                    onClick={() => {
                      if (state === 'add') {
                        create && create();
                      } else {
                        edit && edit();
                      };
                      setOpen(false);
                    }}
                  >
                    {state === 'add' ? 'Create' : 'Update'}
                  </button>

                  {/* Cancel Button */}
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md
                    bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1
                    ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      setOpen(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
;}
