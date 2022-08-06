import { assign, createMachine } from "xstate";

type LibraryMachineContext = {
  location: 'right' | 'left'
}

type LibraryMachineEvent = {
  type: 'OPEN'
} | {
  type: 'CLOSE'
} | {
  type: 'TOGGLE'
} | {
  type: 'CHANGE.LOCATION',
  value: 'right' | 'left'
}

export var libraryMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBsCWAjATgQ0wTwDoBjZAe1jAGIB5ABQFEA5RUAB3NQBdVSA7FkAA9EAJgCsADgIBOAAwA2AMwBGACwiJ4kconyANCDyJlI1QWUB2WcsWyJq5TvXSAvi4NosuQiXJUAKtQA4kEAMvQC7LBcPPxIQqKqUhby0vKyFqq2qtLSOgZGCMp5BLKKYvJiYtIiihbl6m4eGDj4BKSsYLwEyGAAZpyUodQAwgCC-gCS1IwEAEqTQQAS-pEc3HwCwgg58ubSitJiqlby4ioFxiVlFeJiFso3qqpNIJ6thB1dBJioUAAWg2G4ymMwI4QAYqt4lEYpt4tsxI9zPUDsp5PVZEcTpcECJ5MpSiJcnkctIJBYJMpXu9vO1OrxKIEQuE1tENnFQNt8WYGuk1Cd6jjDKICUTchZ7gTno4aS06V9GSNhgBlCIw9axLbGFQEZxHeSVcQYtS4lTSAjEynqaoiSXol6vXikCBwAS0tq+ChsuGchJFJIEWyVCwaR46fEiXGPMSWpEYiSKeQ5EzWOVeNqKnr9Tg+jnanYKS2qWSljTHXTiaMSWOyfHHDJpSQaCTpj7076-AG5jXsrUIxCpWvlSxU6QnbTV2v1ksWJuaCSt9xveWZhl5-tcxCKTTF0t1mtJM5iaM2Uo7u1yCSyJGRtveDfwrdFDJ64kGo0VB6qM2KS1KHckQeNILAsNw3CAA */
  createMachine({
    id: "library",
    tsTypes: {} as import("./library-machine.typegen").Typegen0,
    schema: {
      context: {} as LibraryMachineContext,
      events: {} as LibraryMachineEvent
    },
    initial: "open",
    context: {
      location: 'left'
    },
    states: {
      close: {
        on: {
          OPEN: {
            target: "open",
          },
          TOGGLE: {
            target: "open",
          },
        },
      },
      open: {
        on: {
          "CHANGE.LOCATION": {
            actions: ['assignLocation']
          },
          TOGGLE: {
            target: "close",
          },
          CLOSE: {
            target: "close",
          },
        },
      },
    },
  }, {
    actions: {
      assignLocation: assign({
        location: (_, event) => event.value
      })
    }
  })