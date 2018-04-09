const parseData = (data) => {
    return data.map(dog => dog);
}
renderAgeLabel = (age) => {
    if (age === null || age === undefined || age === "") {
        return " elo";
    }
    return age;
}
renderNameLabel = (dog) => {
    if (dogList.name === null || dogList.name === undefined || dogList.name === "") {

        return "";
    } else if (dogList.familyName === null || dogList.familyName === undefined || dogList.familyName === "") {
        return "dziala";
    }
    return dog;
}


const renderDogs = (dogList) => {
    isDataExist = (checkData) => {
        dogList.forEach(checkData)
    }
    renderHtml(
        document.getElementsByClassName('fixed-table_body')[0],
        dogList.reduce((html, dog) =>

            `${html}
            <tr>
                <td>${renderNameLabel(dog.name) +' '+ renderNameLabel(dog.familyName)}</td>
                <td>${renderAgeLabel(dog.age)}</td>
                <td>${(dog.age/12).toFixed(1)}</td>
                <td>${dog.race}</td>
            </tr>`, '')
    );
}

const renderDogImage = (dog) => {
    renderHtml(
        document.getElementsByClassName('dog-image-container')[0],
        'image to be rendered'
    );
}

const onAddDogButtonClick = (event) => {
    const currentDogList = getDogList(state);
    const dogList = concat(currentDogList, randomDog = {});
    //...
}

const sortAscedning = () => {

}

const sortDescending = () => {

}


//There shouldn't be a need to modifiy code below.
const run = () => {

    fetch()
        .then(
            compose(
                renderDogs, // render passed dogs
                getDogList, // read from state.dogList
                setDogList, // update state
                parseData, // map data, 
            )
        );
};

// this is example data received
const dogList = [{
        name: 'Fluffy',
        familyName: 'von Hohenshlosen',
        race: 'Pitbull',
        age: 23,
        image: 'https://loremflickr.com/320/240/dog',
    },
    {
        name: 'Zee dog',
        familyName: 'of the street',
        race: 'mongrel',
        age: 84,
        image: 'https://loremflickr.com/320/240/puppy',
    },
    {
        name: 'Hans',
        familyName: null,
        race: 'German Sheperd',
        age: 1,
        image: 'https://loremflickr.com/620/480/dog',
    },
    {
        name: 'Rita',
        familyName: null,
        race: 'Spanish',
        image: null,
    },
    {
        name: 'Azor',
        familyName: '',
        race: 'Ratler',
    },
]

// some domain simulation
const fetch = () =>
    new Promise(
        (resolve) => {
            setTimeout(() => {
                resolve(dogList)
            }, 1000);
        }
    );


// this object holds application state
let state = {
    dogList: [],
}


// compose f(g(x) => (f * g)(x)
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

// this just render stuff, very primitive implementation,
// f(Node, string) -> void
const renderHtml = (parentElement, html) => parentElement.innerHTML = html;

// utility function set vale on given path, curried, return new obj
// f(array) -> (object) -> any -> any
const set = (path) => (object) => (value) => {
    const result = { ...object
    };

    if (!path || !path.length) {
        return value;
    }

    const current = path.shift();

    if (path.length === 0) {
        result[current] = value;
    } else {
        result[current] = set(path)({ ...object[current]
        })(value);
    }

    return result;
}

// get data at given path from given data source
// f(array) -> (object) -> any
const get = (path) => (object) => {

    const data = { ...object
    };

    if (!path || !path.length) {
        return data;
    }

    return path.reduce((acc, prop) => {
        const branch = acc[prop];
        return branch ? branch : acc;
    }, data)
};
//concat array with any 
// f(l1: array, x: any) -> array
const concat = (l1, l2) => l1.concat(l2);

// update state with value, { level1 : { level2: 'value'}}
// will update from root, so merge value first
// f(any) -> any
const setState = (value) => {
    state = set()(state)(value);
    return state;
};

// just shortcut to get list of dogs from state
// f(object) -> array
const getDogList = get(['dogList']);

// just a shortcut to set a dogList prop on state
const setDogList =
    compose(
        setState, // update state with { dogList : any }
        set(['dogList'])({}), //wrap to { dogList : any }
    )