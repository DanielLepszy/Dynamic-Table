const parseData = (data) => {
    return data.map(dog => dog);
}
const helloTest = () => {
    return "hello"
}
renderAgeLabel = (age) => {
    if (age === null || age === undefined || age === "" || age === NaN) {
        return "";
    }
    return age;
}
renderAgeInYearLabel = (age) => {
    if (age === null || age === undefined || age === "" || age === NaN) {
        return "";
    }
    return (age / 12).toFixed(1);
}
renderNameLabel = (dog) => {
    if (
        (dog === undefined) ||
        (dog === undefined || dog.name === undefined && dog.familyName === undefined) ||
        (dog.name === null && dog.familyName === null)
    ) {
        return ""
    }
    if (dog.name === undefined) {
        return dog.familyName
    }
    return dog.name + ' ' + dog.familyName
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
                <td>${renderNameLabel(dog)}</td>
                <td>${renderAgeLabel(dog.age)}</td>
                <td>${renderAgeInYearLabel(dog.age)}</td>
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
    const dogList = concat(currentDogList, randomDog());
    console.log(currentDogList);

}
const randomDog = () => {
    const newNameDog = ['Felix', 'Fennel', 'Stella', 'ChewChew', 'Slugger', 'Nymph', 'Baroque', 'Derby', 'CutiePie', 'Sauce'];
    const newFamilyNameDog = ['Sweet', 'von Haleson', 'of the city', 'Olive', 'Sprinkles', 'Kelby', 'Brandy', 'Sookie', 'Touchdown', 'Harley'];
    const raceDogs = ['Greyhound', 'Vizsla', 'Jack Russell Terrier', 'Borzoi', 'Weimaraner', 'Doberman', 'Dalmatian', 'Border Collie', 'Whippet', 'Saluki'];
    const ageDogsInMonth = [14, 55, 96, 120, 12, 18, 64, 23, 45, 6];

    const imageOfDog = [
        'https://upload.wikimedia.org/wikipedia/commons/3/38/Greyhound_Racing_2_amk.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/89/Vizsla_02.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/6/68/Szczenie_Jack_Russell_Terrier3.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/38/%C5%9Awierklaniec_wy%C5%9Bcigi_chart%C3%B3w_12.06.2010_borzoj_p4.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/b/ba/Wy%C5%BCe%C5%82_weimarski_profil_08.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/1/10/Dobermannhuendin.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/1/1c/Binka_10_06.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/b/be/Blue_merle_Border_Collie.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/5e/WhippetWhiteSaddled_wb.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/9/9a/Saluki_600.jpg'
    ]
    const indexOfArray = (selecetedArray) => {
        return Math.floor(Math.random() * (selecetedArray.length - 1));
    }
    let indexOfImageAndRaceOfDog = indexOfArray(raceDogs);

    const randomNameDog = newNameDog.splice(indexOfArray(newNameDog), 1);
    const randomFamilyNameDog = newFamilyNameDog.splice(indexOfArray(newFamilyNameDog), 1);
    const randomAgeDogsInMonth = ageDogsInMonth.splice(indexOfArray(ageDogsInMonth), 1);
    const randomraceDogs = raceDogs.splice(indexOfImageAndRaceOfDog, 1);
    const randomImageOfDog = imageOfDog.splice(indexOfImageAndRaceOfDog, 1);
    return [{
        name: randomNameDog,
        familyName: randomFamilyNameDog,
        race: randomraceDogs,
        age: randomAgeDogsInMonth,
        image: randomImageOfDog

    }];
}
console.log(randomDog());
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

// exports._test = {
//     helloTest: helloTest,
//     renderNameLabel: renderNameLabel
// }