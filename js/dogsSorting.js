const sortByAgeDescending = (a, b) => a.age < b.age
const filterWithAge = a => a.age != undefined && a.age != null
const filterWithoutAge = a => a.age === undefined || a.age === null
const sortByAgeAscending = (a, b) => a.age > b.age

const sortByNameAscending = (a, b) => a.name > b.name
const sortByNameDescending = (a, b) => b.name > a.name
const filterWithName = a => a.name != undefined && a.name != null
const filterWithoutName = a => a.name === undefined || a.name === null

const dogSorter = (sorter, filter, withoutFilter) => {
    let dogList = Object.values(getDogList(state));
    let dogsWithoutAge = dogList.filter(withoutFilter)
    dogList = dogList.filter(filter).sort(sorter)
    dogList = dogList.concat(dogsWithoutAge);
    renderDogs(dogList);
    setState(dogList);
}

const sortDescending = () => {
    dogSorter(sortByAgeDescending, filterWithAge, filterWithoutAge)
}
const sortAscedning = () => {
    dogSorter(sortByAgeAscending, filterWithAge, filterWithoutAge)
}
const sortByFullNameAlphabetically = () => {
    dogSorter(sortByNameAscending, filterWithName, filterWithoutName)
}
const sortByFullNameNonAlphabetically = () => {
    dogSorter(sortByNameDescending, filterWithName, filterWithoutName)
}