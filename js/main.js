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
    if (dog.name === undefined || dog.name === null) {
        return dog.familyName
    }
    if (dog.familyName === undefined || dog.familyName === null) {
        return dog.name
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
            <tr >
                <td >${renderNameLabel(dog)}</td>
                <td>${renderAgeLabel(dog.age)}</td>
                <td>${renderAgeInYearLabel(dog.age)}</td>
                <td>${dog.race}</td>
                <td>${'<button onclick = renderDogImage(this)>Show Image</button>'}</td>
            </tr>`, '')
    );
}

const renderDogImage = (element) => {
    const imageContainer = document.getElementsByClassName('dog-image-container')[0];
    const secondImageContainer = document.getElementsByClassName('dog-image-container')[1];
    const rowIndexButton = ((element.parentNode.parentNode.rowIndex) - 1);
    const imageOfDogs = Object.values(getDogList(state));

    if (imageOfDogs[rowIndexButton].image === undefined || imageOfDogs[rowIndexButton].image === null) {
        const paragraph = document.createElement("P")
        const contentOfParagraph = document.createTextNode("We don't have a image of this dog. Sorry :(")
        paragraph.appendChild(contentOfParagraph);
        renderHtml(
            imageContainer,
            paragraph.outerHTML
        )
    } else {

        const img = document.createElement("IMG");
        img.setAttribute("src", imageOfDogs[rowIndexButton].image);
        img.setAttribute("width", "340");
        img.setAttribute("height", "220");
        img.setAttribute("alt", imageOfDogs[rowIndexButton].race);
        img.setAttribute("id", "currentImage");
        renderHtml(
            imageContainer,
            img.outerHTML
        )
        renderHtml(
            secondImageContainer,
            img.outerHTML
        )
    }
}
const onAddDogButtonClick = (event) => {

    const currentDogList = Object.values(getDogList(state));
    const dogList = concat(currentDogList, randomDog());
    renderDogs(dogList);
    return setState(dogList);

}
const randomDog = () => {
    const arrayOfRandomDogsNames = ['Felix', 'Fennel', 'Stella', 'ChewChew', 'Slugger', 'Nymph', 'Baroque', 'Derby', 'CutiePie', 'Sauce'];
    const arrayOfFamilyDogNames = ['Sweet', 'von Haleson', 'of the city', 'Olive', 'Sprinkles', 'Kelby', 'Brandy', 'Sookie', 'Touchdown', 'Harley'];
    const arrayOfRaceDogs = ['Greyhound', 'Vizsla', 'Jack Russell Terrier', 'Borzoi', 'Weimaraner', 'Doberman', 'Dalmatian', 'Border Collie', 'Whippet', 'Saluki'];
    const ageDogsInMonth = Math.floor((Math.random() * 150) + 1);
    const imageOfDog = [
        'http://delivery.gettyimages.com/xr/838802064.jpg?v=1&c=IWSAsset&k=3&d=77BFBA49EF878921E86F5CE8BE5D78FBD55DF99FD9E8BD24276DC49E8C1FE6E7AE5C6B1A84356E05A55A1E4F32AD3138',
        'https://upload.wikimedia.org/wikipedia/commons/8/89/Vizsla_02.jpg',
        'https://i.woman-day.info/wp-content/uploads/shchenok1-340x220.jpg',
        'http://animals1.ru/photo/midi/b8h006zfs892.jpg',
        'https://viralchop.com/wp-content/uploads/2017/10/maxresdefault-1447-340x220.jpg',
        'https://itsadoggiething.com/wp-content/uploads/2017/12/doberman-3023037_640-340x220.jpg',
        'http://dalmatian-drug.narod.ru/images/fotos/Markiz/Markiz_1god_1copy2.jpg',
        'https://thelatest.co.uk/files/2016/07/4-4-340x220.jpg',
        'https://galtx-centex.org/img/lily2.jpg',
        'http://www.geocities.jp/cinccombinedfleet/File00801.jpg'
    ]
    const getRandomIndexFromArray = (selecetedArray) => {
        return Math.floor(Math.random() * (selecetedArray.length));
    }
    let getRandomIndexRaceAndImage = getRandomIndexFromArray(arrayOfRaceDogs); //It's provide race with properly image of dog

    let indexOfImageAndRaceOfDog = getRandomIndexFromArray(arrayOfRaceDogs);
    const randomNameDog = arrayOfRandomDogsNames[getRandomIndexFromArray(arrayOfRandomDogsNames)];
    const randomFamilyNameDog = arrayOfFamilyDogNames[getRandomIndexFromArray(arrayOfFamilyDogNames)];
    const randomAgeDogsInMonth = ageDogsInMonth;
    const randomraceDogs = arrayOfRaceDogs[getRandomIndexRaceAndImage];
    const randomImageOfDog = imageOfDog[getRandomIndexRaceAndImage];
    const data = [{
        name: randomNameDog,
        familyName: randomFamilyNameDog,
        race: randomraceDogs,
        age: randomAgeDogsInMonth,
        image: randomImageOfDog
    }, ];
    return data
}

const dogSorter = (sorter, filter, withoutFilter) => {
    let dogList = Object.values(getDogList(state));
    let dogsWithoutAge = dogList.filter(withoutFilter)
    dogList = dogList.filter(filter).sort(sorter)
    dogList = dogList.concat(dogsWithoutAge);
    renderDogs(dogList);
    setState(dogList);
}

const sortDescending = () => {
    dogSorter((a, b) => a.age < b.age, a => a.age != undefined && a.age != null, a => a.age === undefined || a.age === null)
}
const sortAscedning = () => {
    dogSorter((a, b) => a.age > b.age, a => a.age != undefined && a.age != null, a => a.age === undefined || a.age === null)
}
const sortByFullNameAlphabetically = () => {
    dogSorter((a, b) => a.name > b.name, a => a.name != undefined && a.name != null, a => a.name === undefined || a.name === null)
}
const sortByFullNameNonAlphabetically = () => {
    dogSorter((a, b) => b.name > a.name, a => a.name != undefined && a.name != null, a => a.name === undefined || a.name === null)
}

const showModalImageOfDogs=(modal,modalImg,captionText,imageOfDog) =>{
    imageOfDog.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}
}
const hideModalImageOfDog = (modal) => {
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }
}
const modalImageOfDog = () => {
    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById("biggerImage")
    var captionText = document.getElementById("caption");
    const imageOfDog = document.getElementById('currentImage')

    showModalImageOfDogs(modal,modalImg,captionText,imageOfDog);
    hideModalImageOfDog(modal);
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