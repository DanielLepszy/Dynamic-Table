const parseData = (data) => {
    return data.map(dog => dog);
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
                <td>${'<button onclick = renderDogImage(this) class="btn btn-outline-light" >Show Image</button>'}</td>
            </tr>`, '')
    );
}
const hiddenLoader = (firstloader, secondloader) => {
    firstloader.style = '';
    secondloader.style = '';
}
const showLoader = (firstloader, secondloader) => {
    const style = 'background:transparent url("https://i.stack.imgur.com/naLBK.gif") center no-repeat;'
    firstloader.style = style;
    secondloader.style = style;
}
const renderDogImage = (element) => {
    const imageContainer = document.getElementsByClassName('dog-image-container')[0];
    const secondImageContainer = document.getElementsByClassName('dog-image-container')[1];
    const rowIndexButton = ((element.parentNode.parentNode.rowIndex) - 1);
    const imageOfDogs = Object.values(getDogList(state));

    if (imageOfDogs[rowIndexButton].image === undefined || imageOfDogs[rowIndexButton].image === null) {
        hiddenLoader(imageContainer, secondImageContainer)
        const paragraph = document.createElement("P")
        const contentOfParagraph = document.createTextNode("We don't have a image of this dog. Sorry :(")
        paragraph.appendChild(contentOfParagraph);
        renderHtml(
            imageContainer,
            paragraph.outerHTML
        )
        renderHtml(
            secondImageContainer,
            paragraph.outerHTML
        )
    } else {
        showLoader(imageContainer, secondImageContainer)
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
    const ageDogsInMonth = Math.floor((Math.random() * 150) + 1);
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
const showModalImageOfDogs = (modal, modalImg, captionText, imageOfDog) => {
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
    const firstImageOfDog = document.getElementById('currentImage')
    const secondImageOfDog = document.getElementsByTagName("img")[2];

    showModalImageOfDogs(modal, modalImg, captionText, firstImageOfDog);
    showModalImageOfDogs(modal, modalImg, captionText, secondImageOfDog);
    hideModalImageOfDog(modal);
}
const loader = (code) => {

    const css = document.createElement("style");
    // css.type = "text/css";
    css.innerHTML = "color:red";
    // // renderHtml(
    // //     document.getElementsByClassName('name')[0],
    // //     css.outerHTML
    // // )

    document.body.appendChild(css);
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

