// select counter parent element
const counterParentEl = document.getElementById("counterParent");
//select add counter button element
const addCounterEl = document.getElementById("addCounter");
//select reset counter button element
const resetEl = document.getElementById("reset");

// counter element
const counterDiv = (counter) => {
    return `
            <div class="mx-auto max-w-md space-y-5">
                <div
                    class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
                >
                    <div id="counter${counter.id}" class="text-2xl font-semibold"></div>
                    <div class="flex space-x-3">
                        <button
                            id="increment${counter.id}"
                            class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
                        >
                            Increment
                        </button>
                        <button
                            class="bg-red-400 text-white px-3 py-2 rounded shadow"
                            id="decrement${counter.id}"
                        >
                            Decrement
                        </button>
                    </div>
                </div>
            </div>
`;
};

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADD_COUNTER = "addCounter";
const RESET = "reset";

// initial state
const initialState = [
    {
        id: 1, // counter id
        value: 0, // counter value
        differenceValue: 1, // counter increment or decrement value
    },
];

//action creators
const incrementDecrementAction = (type, id) => {
    return {
        type: type,
        payload: id,
    };
};
const counterAddAction = () => {
    return {
        type: ADD_COUNTER,
    };
};
const counterResetAction = (value) => {
    return {
        type: RESET,
        payload: value,
    };
};

// create reducer function
function counterReducer(state = initialState, action) {
    if (action.type === INCREMENT) {
        return state.map((c) => {
            if (c.id === action.payload) {
                return {
                    ...c,
                    value: c.value + c.differenceValue,
                };
            }
            return { ...c };
        });
    } else if (action.type === DECREMENT) {
        return state.map((c) => {
            if (c.id === action.payload) {
                return {
                    ...c,
                    value: c.value - c.differenceValue,
                };
            }
            return { ...c };
        });
    } else if (action.type === ADD_COUNTER) {
        let newState = [...state];
        newState.push({
            id: newState.length + 1,
            value: 0,
            differenceValue: Math.floor(Math.random() * 10 + 1),
        });
        return newState;
    } else if (action.type === RESET) {
        return state.map((c) => {
            return {
                ...c,
                value: action.payload,
            };
        });
    } else {
        return state;
    }
}

// create store
const store = Redux.createStore(counterReducer);

// UI render function
const render = () => {
    const state = store.getState();
    // append counters element into dom
    counterParentEl.innerHTML = state.map(counterDiv);
    state.map((s) => {
        const counterEl = document.getElementById("counter" + s.id);
        const incrementEl = document.getElementById("increment" + s.id);
        const decrementEl = document.getElementById("decrement" + s.id);

        // update counter count value
        counterEl.innerText = s.value.toString();

        // button increment click listeners
        incrementEl.addEventListener("click", () => {
            store.dispatch(incrementDecrementAction(INCREMENT, s.id));
        });

        // button decrement click listeners
        decrementEl.addEventListener("click", () => {
            store.dispatch(incrementDecrementAction(DECREMENT, s.id));
        });
    });
};

// update UI initially
render();

// call UI render function on state change
store.subscribe(render);

// button counter add click listeners
addCounterEl.addEventListener("click", () => {
    store.dispatch(counterAddAction());
});

// button counter reset click listeners
resetEl.addEventListener("click", () => {
    store.dispatch(counterResetAction(0));
});
